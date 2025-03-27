import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import Table from './Table';
import { Appointment } from '@/types/data.types';
import ProfileImage from '../ProfileImage';
import { format } from 'date-fns';

interface DataProps {
    data: any[];
}

const columns = [
    { header: "Info", key: "name" },
    {
        header: "Date",
        key: "appointment_date",
        className: "hidden md:table-cell",
    },
    {
        header: "Time",
        key: "time",
        className: "hidden md:table-cell",
    },
    {
        header: "Doctor",
        key: "doctor",
        className: "hidden md:table-cell",
    },
    {
        header: "Status",
        key: "status",
        className: "hidden xl:table-cell",
    },
    {
        header: "Actions",
        key: "action",
    },
]

const RecentAppointments = ({ data }: DataProps) => {
    const renderRow = (item: Appointment) => {
        const name = item?.patient?.first_name + " " + item?.patient?.last_name;

        return (
            <tr key={item?.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-slate-50'>
                <td className='flex items-center gap-2 2xl:gap-4 py-2 xl:py-4'>
                    <ProfileImage 
                        url={item?.patient?.img!} 
                        name={name} 
                        className='bg-violet-600 items-center'
                    />

                    <div>
                        <h3 className='text-sm md:text-base md:font-medium uppercase'>{name}</h3>

                        <span className='text-xs capitalize'>
                            {item?.patient?.gender?.toLowerCase()}
                        </span>
                    </div>
                </td>

                <td className='hidden md:table-cell'>
                    {format(item.appointment_date, "yyyy-MM-dd")}
                </td>

                <td className='hidden md:table-cell'>
                    {item?.time}
                </td>

                <td className='hidden md:table-cell items-center py-2'>
                    <div className=''>
                        <ProfileImage
                            url={item?.doctor?.img!}
                            name={item?.doctor?.name}
                            className='bg-blue-600 items-center'
                        />

                        <div>
                            <h3 className='font-medium'>{item?.doctor?.name}</h3>
                            <span className='text-xs capitalize'>{item?.doctor?.specialization}</span>
                        </div>
                    </div>
                </td>
            </tr>
        )
    };

    return (
        <div className='bg-white rounded-xl p-2 2xl:p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Recent Appointments</h1>

                <Button asChild variant={'outline'}>
                    <Link href={"/record/appointments"}>View All</Link>
                </Button>
            </div>

            <Table columns={columns} renderRow={renderRow} data={data} />
        </div>
    )
}

export default RecentAppointments;