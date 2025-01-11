import prisma from "@/app/lib/db";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";
import { OrderDialog } from "./_comps/order-dialog";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
      paid: true,
      id: true,
      address: true,
      city: true,
      zip: true,
      User: {
        select: {
          firstName: true,
          email: true,
          profileImage: true,
          id: true,
        },
      },
      productsList: {
        select: {
          id: true,
          images: true,
          description: true,
          name: true,
          status: true,
          price: true,
        },
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export default async function OrdersPage() {
  noStore();
  const data = await getData();

  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Recent orders from your store!</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Zip</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <Dialog key={order.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer">
                      <TableCell>
                        <p className="font-medium">{order.User?.firstName}</p>
                        <p className="hidden md:flex text-sm text-muted-foreground">
                          {order.User?.email}
                        </p>
                      </TableCell>
                      <TableCell>{order.address}</TableCell>
                      <TableCell>{order.city}</TableCell>
                      <TableCell>{order.zip}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("el-GR").format(order.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${new Intl.NumberFormat("el-GR").format(order.amount / 100)}
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <OrderDialog order={order} />
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

