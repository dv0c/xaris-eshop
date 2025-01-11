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
                  <DialogContent className="sm:max-w-[800px] h-[90vh]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Order Details</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="h-full pr-4">
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/2 space-y-4">
                            <div>
                              <h3 className="text-xl font-semibold">Order Information</h3>
                              <p className="text-lg">Order ID: {order.id}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge
                                  className="capitalize"
                                  variant={order.status === "waiting to be shipped" ? "destructive" :
                                    order.status === "Shipped" ? "secondary" : "outline"}
                                >
                                  {order.status}
                                </Badge>
                                <Badge variant={order.paid ? "default" : "destructive"}>
                                  {order.paid ? "Paid" : "Not Paid"}
                                </Badge>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">User Information</h3>
                              {/* <p>User ID: {order.User?.id}</p> */}
                              <p>Name: {order.User?.firstName}</p>
                              <p>Email: {order.User?.email}</p>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">Shipping Address</h3>
                              <p>{order.address}</p>
                              <p>{order.city}, {order.zip}</p>
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">Order Details</h3>
                              <p>Total Amount: {new Intl.NumberFormat("el-GR").format(order.amount / 100)}€</p>
                              <p>Order Date: {new Intl.DateTimeFormat("el-GR", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }).format(order.createdAt)}</p>
                              <p>Payment Method: STRIPE</p>
                              <p>Shipping Method: BOX</p>
                            </div>
                          </div>
                          <div className="w-full md:w-1/2">
                            <h3 className="text-xl font-semibold mb-4">Products List</h3>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Image</TableHead>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.productsList.map((product) => (
                                  <TableRow key={product.id}>
                                    <TableCell>
                                      <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        width={50}
                                        height={50}
                                        className="rounded-md object-cover"
                                      />
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{new Intl.NumberFormat("el-GR").format(product.price / 100)}€</TableCell>
                                    
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>

                      </div>
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

