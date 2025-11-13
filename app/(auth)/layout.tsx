import Image from 'next/image';
import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 h-full flex items-center justify-center">{children}</div>

            <div className="hidden md:flex w-1/2 h-full relative">
                <Image
                    src="https://images.pexels.com/photos/6129437/pexels-photo-6129437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center top"
                    alt="Doctor"
                />

                <div className="absolute inset-0 bg-black opacity-40 z-10 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white mt-[20%]">Medic Health</h1>

                    <p className="text-lg lg:text-xl text-blue-300 font-bold mt-2">You're Welcome</p>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;