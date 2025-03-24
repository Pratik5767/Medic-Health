import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react"

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen bg-gray-200 flex">
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]">
                <Sidebar/>
            </div>

            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
                <Navbar/>
                <div className="h-full w-full p-2 overflow-y-scroll">{children}</div>
            </div>
        </div>
    )
}

export default ProtectedLayout;