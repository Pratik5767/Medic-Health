"use client"

import { useAuth, UserButton } from '@clerk/nextjs'
import { Bell } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const user = useAuth();

    function formatName(): string {
        const pathname = usePathname();

        if (!pathname) {
            return "Overview"
        }

        const spliteRoute = pathname.split("/");
        const lastIndex = spliteRoute.length - 1 > 2 ? 2 : spliteRoute.length - 1;
        const pathName = spliteRoute[lastIndex];
        const formatedPathName = pathName.replace(/-/g, "@");
        return formatedPathName;
    }

    const path = formatName();

    return (
        <div className='p-5 flex justify-between bg-white'>
            <h1 className='text-xl font-medium text-gray-500 capitalize'>
                {path || "Overview"}
            </h1>

            <div className='flex items-center gap-4'>
                <div className='relative'>
                    <Bell/>
                    <p className='absolute -top-3 right-1 size-4 bg-red-600 text-white rounded-full text-[10px] text-center'>2</p>
                </div>

                {
                    user?.userId && <UserButton/>
                }
            </div>
        </div>
    )
}

export default Navbar