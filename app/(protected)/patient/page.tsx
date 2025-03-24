import { Button } from '@/components/ui/button';
import { getPatientDashboardStatistics } from '@/utils/services/patient';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const PatientDashboard = async () => {
    const user = await currentUser();
    const { 
        data, 
        appointmentsCounts, 
        Last5Records, 
        totalAppointments, 
        availableDoctor, 
        monthlyData 
    } = await getPatientDashboardStatistics(user?.id!);

    if (user && !data) {
        redirect("/patient/registration");
    }

    if (!data) {
        return null;
    }

    return (
        <div className='py-6 px-3 flex flex-col rounded-xl xl:flex-row gap-6'>
            {/* LEFT */}
            <div className='w-full xl:w-[69%]'>
                <div className='bg-white rounded-xl p-4 mb-8'>
                    <div className='flex items-center justify-between mb-4'>
                        <h1 className='text-lg xl:text-2xl font-semibold'>
                            Welcome {data?.first_name || user?.firstName}
                        </h1>

                        <div className='space-x-2'>
                            <Button size={"sm"}>{new Date().getFullYear()}</Button>

                            <Button size={"sm"}  variant={"outline"} className='hover:underline'>
                                <Link href={"/patient/self"}>View Profile</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* RIGHT */}
            <div className='w-full xl:w-[30%]'>

            </div>
        </div>
    )
}

export default PatientDashboard;