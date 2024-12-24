'use client'
import { Search } from "lucide-react";


import { Button } from "@/components/ui/button";
import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Form from 'next/form';
import Link from "next/link";
import { Input } from "./input";


const Header = () => {
  const { user } = useUser()

  return (
    <div>
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-50 px-4 py-2" >
        <div className="flex items-center gap-2">
          <Form action={'/search'} className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="text"
              name="query"
              placeholder="Αναζήτηση"
              className="pl-9 pr-9 w-full bg-gray-100 rounded-full"
            />
          </Form>
          <ClerkLoaded>
            {user ? <UserButton /> : <SignInButton mode="modal" />}
          </ClerkLoaded>
        </div>
      </div>

      <header className="hidden lg:block bg-white border-b sticky top-0 z-50" >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href={'/'} className="text-2xl font-bold">Xaris Concept Store</Link>
              <Form action={'/search'} className="relative w-96">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="query"
                  placeholder="Αναζήτηση"
                  className="pl-9 w-full bg-gray-100 rounded-full"
                />
              </Form>
            </div>
            <div className="flex items-center gap-4">
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
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
