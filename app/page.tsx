import { Button } from "@/components/ui/button";
import { getRole } from "@/utils/roles";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
    const { userId } = await auth();
    const role = await getRole();

    if (userId && role) {
        redirect(`/${role}`);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-100 via-white to-blue-50">
            <div className="flex flex-1 flex-col items-center justify-center text-center space-y-8">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                    Welcome to <br />
                    <span className="text-blue-700 text-6xl md:text-7xl drop-shadow-md">
                        Medic Health
                    </span>
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl">
                    Your trusted healthcare companion. Find expert care, book appointments,
                    and manage your health with ease.
                </p>

                <div className="flex gap-6">
                    {
                        userId ? (
                            <>
                                <Link href={`/${role}`}>
                                    <Button>View Dashboard</Button>
                                </Link>
                                
                                <UserButton />
                            </>
                        ) : (
                            <>
                                <Link href="/sign-up">
                                    <Button className="px-6 py-3 text-lg font-semibold rounded-lg shadow-md bg-blue-700 text-white hover:bg-blue-800 transition-all cursor-pointer">
                                        New Patient
                                    </Button>
                                </Link>

                                <Link href="/sign-in">
                                    <Button variant="outline" className="px-6 py-3 text-lg border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all rounded-lg cursor-pointer">
                                        Login to Account
                                    </Button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>

            <footer className="mt-12 text-center text-gray-500 text-sm">
                &copy; 2025 Medic Health. All Rights Reserved.
            </footer>
        </div>
    );
}