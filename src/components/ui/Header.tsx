'use client'

import { ClerkLoaded, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Form from 'next/form'
import Link from "next/link"
import { Button } from "./button"

const Header = () => {
    const { user } = useUser()

    return <header className="flex flex-wrap justify-between items-center px-4 py-2">
        <Link href={'/'} className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
            Xaris Concepts
        </Link>
        <Form action={'/search'} className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
            <input
                type="text"
                name="query"
                placeholder="Search for products"
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:otline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl" />
        </Form>
        <div className="space-x-3 flex items-center">
            <Link href={'/basket'}>
                <Button>
                    My Basket
                </Button>
            </Link>

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
    </header>
}

export default Header