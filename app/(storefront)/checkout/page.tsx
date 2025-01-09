
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, ShoppingBag } from 'lucide-react'
import Image from "next/image"

import { Cart } from "@/app/lib/interfaces"
import { redis } from "@/app/lib/redis"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { unstable_noStore as noStore } from "next/cache"
import { redirect } from "next/navigation"
import { ChceckoutButton } from "@/app/components/SubmitButtons"
import { checkOut } from "@/app/actions"


const greekRegions = [
    { value: "ATT", label: "Αττική" },
    { value: "CEN", label: "Στερεά Ελλάδα" },
    { value: "CEP", label: "Κεντρική Μακεδονία" },
    { value: "CRE", label: "Κρήτη" },
    { value: "EGE", label: "Ανατολική Μακεδονία και Θράκη" },
    { value: "ION", label: "Ιόνια Νησιά" },
    { value: "NOR", label: "Βόρειο Αιγαίο" },
    { value: "PEP", label: "Πελοπόννησος" },
    { value: "SOU", label: "Νότιο Αιγαίο" },
    { value: "THE", label: "Θεσσαλία" },
    { value: "EPI", label: "Ήπειρος" },
    { value: "WES", label: "Δυτική Ελλάδα" },
    { value: "MAC", label: "Δυτική Μακεδονία" },
    { value: "AEG", label: "Αιγαίο" }
];



export default async function CheckoutForm() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    let totalPrice = 0;

    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });

    if (!cart || cart.items.length === 0 || !cart.items) {
        redirect('/bag')
    }

    return (
        <div className="min-h-screen rounded-lg bg-gradient-to-br  to-white">
            <div className="container mx-auto p-6">
                <div className="mb-8 text-center">
                    <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent">
                        Complete Your Purchase
                    </h1>
                    <p className="mt-2 text-muted-foreground">You're just a few steps away from your amazing items</p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
                    {/* Left Column - Form */}
                    <div className="space-y-12">
                        {/* Contact Section */}
                        {/* <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Contact</h2>
                <Button variant="ghost" className="text-primary hover:text-primary/80">
                  Log in
                </Button>
              </div>
              <div className="group relative">
                <Input 
                  type="email" 
                  placeholder="Email or mobile phone number"
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20" 
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                <Label htmlFor="newsletter" className="text-sm">Email me with news and offers</Label>
              </div>
            </section> */}

                        <Separator />

                        {/* Delivery Section */}
                        <section className="space-y-6">
                            <h2 className="text-2xl font-semibold">Delivery</h2>
                            <Select defaultValue="US">
                                <SelectTrigger className="transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20">
                                    <SelectValue placeholder="Country/Region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="US">Greece</SelectItem>
                                    {/* <SelectItem value="CA">Canada</SelectItem> */}
                                    {/* <SelectItem value="UK">United Kingdom</SelectItem> */}
                                </SelectContent>
                            </Select>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input
                                    placeholder="First name (optional)"
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                />
                                <Input
                                    placeholder="Last name"
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                            <Input
                                placeholder="Address"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                            <Input
                                placeholder="Apartment, suite, etc. (optional)"
                                className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                            />
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Input
                                    placeholder="City"
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                />
                                <Select>
                                    <SelectTrigger className="transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20">
                                        <SelectValue placeholder="State" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {greekRegions.map((region) => (
                                            <SelectItem key={region.value} value={region.value}>
                                                {region.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    placeholder="ZIP code"
                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            {/* <div className="space-y-2 rounded-lg bg-zinc-50 p-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="save-info" className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                    <Label htmlFor="save-info" className="text-sm">Save this information for next time</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="sms-updates" className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                    <Label htmlFor="sms-updates" className="text-sm">Text me with news and offers</Label>
                                </div>
                            </div> */}
                        </section>

                        <Separator />

                        {/* Shipping Method Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Shipping method</h2>
                            <div className="space-y-4">
                                <div className="rounded-md border p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 border-primary/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="stripe-payment" defaultChecked />
                                            <Label htmlFor="stripe-payment" className="text-sm font-medium cursor-pointer">Shipping with BOX</Label>
                                        </div>
                                        <Image src="/box-logo.png" alt="BOX logo" width={60} height={30} />
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground"></p>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Payment Section */}
                        <section className="space-y-4">
                            <h2 className="text-2xl font-semibold">Payment</h2>
                            <p className="text-sm text-muted-foreground">
                                All transactions are secure and encrypted.
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-md border p-4 transition-all duration-300 focus-within:ring-2 focus-within:ring-primary/20 border-primary/50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="stripe-payment" defaultChecked />
                                            <Label htmlFor="stripe-payment" className="text-sm font-medium cursor-pointer">Pay with Stripe</Label>
                                        </div>
                                        <Image src="/stripe-logo.png" alt="Stripe logo" width={60} height={30} />
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground">Safe and secure payments processed by Stripe</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Cart Summary */}
                    <div className="lg:sticky lg:top-6 space-y-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                                {/* Cart Item */}
                                {cart?.items.map((item) => (
                                    <div key={item.id} className="group relative flex items-center gap-4 rounded-lg border p-4 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                                        <div className="relative">
                                            <div className="h-16 w-16 overflow-hidden rounded-lg border bg-muted">
                                                <Image
                                                    src={item.imageString}
                                                    alt={item.name}
                                                    width={64}
                                                    height={64}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{item.name}</h4>
                                            {/* <p className="text-sm text-muted-foreground">S / Pigeon post</p> */}
                                        </div>
                                        <div className="font-medium">{item.price}€</div>
                                    </div>
                                ))}
                                <Separator className="my-6" />

                                {/* Discount Code */}
                                {/* <div className="flex gap-2 mb-6">
                                    <Input
                                        placeholder="Discount code"
                                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                                    />
                                    <Button variant="outline" className="shrink-0 hover:bg-primary hover:text-primary-foreground">
                                        Apply
                                    </Button>
                                </div> */}

                                {/* Subtotal */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base">Subtotal</span>
                                        <span className="font-medium">{new Intl.NumberFormat("el-GR").format(totalPrice)}€</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-base">Shipping</span>
                                        <span className="text-sm">Enter shipping address</span>
                                    </div>
                                </div>

                                <Separator className="my-6" />

                                {/* Total */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <span className="text-base font-medium">Total</span>
                                            <span className="text-sm text-muted-foreground">EUR</span>
                                        </div>
                                        <span className="text-2xl font-bold">{new Intl.NumberFormat("el-GR").format(totalPrice)}€</span>
                                    </div>

                                    <form action={checkOut}>
                                        <ChceckoutButton />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

