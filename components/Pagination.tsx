"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "./ui/button";

interface PaginationProps {
    totalRecord: number;
    currentPage: number;
    totalPages: number;
    limit: number;
}

const Pagination = ({ totalRecord, currentPage, totalPages, limit }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
        return params.toString();
    }, [searchParams]);

    const handlePrevious = () => {
        if (currentPage > 1) {
            router.push(pathname + "?" + createQueryString("p", (currentPage - 1).toString()));
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            router.push(pathname + "?" + createQueryString("p", (currentPage + 1).toString()));
        }
    }

    if (totalRecord === 0) return null;

    return (
        <div className="p-4 flex items-center justify-between text-gray-600 mt-5">
            <Button
                size={"sm"}
                variant={"outline"}
                disabled={currentPage === 1}
                onClick={handlePrevious}
                className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </Button>

            <div className="flex items-center gap-2 text-sm">
                <span className="text-xs lg:text-sm">
                    Showing {currentPage * limit - (limit - 1)} to{" "}
                    {currentPage * limit <= totalRecord ? currentPage * limit : totalRecord}{" "} of {totalRecord}
                </span>
            </div>

            <Button
                size={"sm"}
                variant={"outline"}
                disabled={currentPage === totalPages}
                onClick={handleNext}
                className="py-2 px-4 rounded-md bg-slate-200 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </Button>
        </div>
    )
}

export default Pagination