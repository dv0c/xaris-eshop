'use client'

import { updateOrderStatus } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Order, Product } from "@prisma/client";
import Image from "next/image";
import { useState } from 'react';

interface OrderProps {
    order: Order
}

export function OrderDialog({ order }: any) {
    const [currentStatus, setCurrentStatus] = useState(order.status);

    const handleStatusUpdate = async (formData: FormData) => {
        const newStatus = formData.get('status') as string;
        const result = await updateOrderStatus(order.id, newStatus);
        if (result.success) {
            setCurrentStatus(newStatus);
        }
    };

    return (
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
                                        variant={currentStatus === "waiting to be shipped" ? "destructive" :
                                            currentStatus === "shipped" ? "secondary" : "outline"}
                                    >
                                        {currentStatus}
                                    </Badge>
                                    <Badge variant={order.paid ? "default" : "destructive"}>
                                        {order.paid ? "Paid" : "Not Paid"}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">User Information</h3>
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
                                    {order.productsList.map((product: Product) => (
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
            <DialogFooter className="border-t pt-5">
                <form action={handleStatusUpdate} className="flex gap-3">
                    <Select name="status" defaultValue={currentStatus}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Change status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="waiting to be shipped">Waiting to be shipped</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit">
                        Update Status
                    </Button>
                </form>
            </DialogFooter>
        </DialogContent>
    );
}

