'use client'
import { List, Menu, Search, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "./input";
import Form from 'next/form'


const Header = () => {
  const { user } = useUser()

  return (
    <section className="py-4 border-b">
      <div className="container mx-auto">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={'/'}>
              <div className="flex items-center gap-2">
                <img src="/logo.png" className="w-8" alt="logo" />
                <span className="text-xl font-bold">Xaris Concepts</span>
              </div>
            </Link>

            <Form action={'/search'} className="relative flex items-center gap-2">
              <Search className="absolute left-2.5" size={15} />
              <Input
                type="text"
                name="query"
                className="pl-8"
                placeholder="Search for products"
              />
            </Form>
          </div>
          <div className="flex items-center gap-5">
            <ClerkLoaded>
              {user && <Link href={'/orders'}>
                <div className="items-center flex">
                  <Button variant={'ghost'} size={'icon'}>
                    <List />
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <ShoppingBag />
                  </Button>
                </div>
              </Link>}

              {user ? <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.fullName}!</p>

                </div>
              </div> : <div className={buttonVariants({ variant: 'outline' })}>
                <SignInButton mode="modal" />
              </div>}
            </ClerkLoaded>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="w-8" alt="logo" />
              <span className="text-xl font-bold">Shadcn Blocks</span>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <img
                        src="/logo.png"
                        className="w-8"
                        alt="logo"
                      />
                      <span className="text-xl font-bold">Shadcn Blocks</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="mb-8 mt-8 flex flex-col gap-4">
                  <a href="#" className="font-semibold">
                    Home
                  </a>
                  <a href="#" className="font-semibold">
                    Pricing
                  </a>
                  <a href="#" className="font-semibold">
                    Blog
                  </a>
                </div>
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 justify-start">
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Press
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Contact
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Imprint
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Sitemap
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Legal
                    </a>
                    <a
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "justify-start text-muted-foreground",
                      )}
                      href="#"
                    >
                      Cookie Settings
                    </a>
                  </div>
                  <ClerkLoaded>
                    {user && <Link href={'/orders'}>
                      <Button>My orders</Button>
                    </Link>}

                    {user ? <div className="flex items-center space-x-2">
                      <UserButton />
                      <div className="hidden sm:block text-xs">
                        <p className="text-gray-400">Welcome back</p>
                        <p className="font-bold">{user.fullName}!</p>

                      </div>
                    </div> : <div>
                      <SignInButton mode="modal" />
                    </div>}
                  </ClerkLoaded>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Header;
