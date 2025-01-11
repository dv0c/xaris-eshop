import prisma from "@/app/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";

async function getData() {
  const data = await prisma.order.findMany({
    select: {
      amount: true,
      createdAt: true,
      status: true,
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
              {data.map((item) => (
                <Dialog key={item.id}>
                  <DialogTrigger asChild>
                    <TableRow className="cursor-pointer">
                      <TableCell>
                        <p className="font-medium">{item.User?.firstName}</p>
                        <p className="hidden md:flex text-sm text-muted-foreground">
                          {item.User?.email}
                        </p>
                      </TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.city}</TableCell>
                      <TableCell>{item.zip}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("el-GR").format(item.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${new Intl.NumberFormat("el-GR").format(item.amount / 100)}
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] h-[90vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Order Details</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full pr-4">
                      {item.productsList.map((product, index) => (
                        <div key={index} className="space-y-6 mt-5 pt-5 border-t">
                          <div className="flex flex-col md:flex-row gap-6">
                            <Image
                              src={product.images[0]}
                              alt={product.images[0]}
                              width={400}
                              height={400}
                              className="rounded-lg object-cover w-full md:w-1/2"
                            />
                            <div className="w-full md:w-1/2 space-y-4">
                              <div>
                                <h3 className="text-xl font-semibold">Order Information</h3>
                                <p className="text-lg">Order ID: {item.id}</p>
                                <Badge
                                  variant={product.status === "published" ? "default" :
                                    item.status === "Shipped" ? "secondary" : "outline"}
                                >
                                  {product.status}
                                </Badge>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold">User Information</h3>
                                <p>User ID: {item.User?.email}</p>
                                <p>Name: {item.User?.firstName}</p>
                                <p>Email: {item.User?.email}</p>
                                {/* {orderDetails.userPhone && <p>Phone: {orderDetails.userPhone}</p>} */}
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold">Shipping Address</h3>
                                <p>{item.address}</p>
                                <p>{item.city}, {item.zip}</p>
                              </div>
                              <div>
                                <h3 className="text-xl font-semibold">Order Details</h3>
                                <p>Price: {new Intl.NumberFormat("el-GR").format(item.amount / 100)}€</p>
                                <p>Payment Method: STRIPE</p>
                                <p>Shipping Method: BOX</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">Product Details</h3>
                            Name: <p className="text-lg font-medium">{product.name}</p>
                            Description: <p className="text-muted-foreground">{product.description}</p>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
