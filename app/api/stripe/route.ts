import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { stripe } from "@/app/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    );
  } catch (error: unknown) {
    return new Response("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      // Retrieve session with expanded line items
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );

      const items = sessionWithLineItems.line_items?.data.map((item) => ({
        productId: (item.price?.product as Stripe.Product)?.metadata.productId,
        quantity: item.quantity as number,
      }));

      // Validate userId
      const userId = session.metadata?.userId;
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        console.error(`User with id ${userId} not found.`);
        return new Response("User not found", { status: 400 });
      }

      // Create order
      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          paid: session.payment_status === "paid",
          userId,
          address: session.customer_details?.address?.line1 as string,
          city: session.customer_details?.address?.city,
          zip: session.customer_details?.address?.postal_code,
          products: items?.map((item) =>
            JSON.stringify({ id: item.productId, quantity: item.quantity })
          ) as any,
          productsList: {
            connect: items?.map((item) => ({ id: item.productId })),
          },
        },
      });

      console.log(items);

      await redis.del(`cart-${userId}`);
      break;
    }
    default: {
      console.log("Unhandled event");
    }
  }

  return new Response(null, { status: 200 });
}
