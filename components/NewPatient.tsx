"use client";

import { useUser } from '@clerk/nextjs';
import { Patient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Form } from './ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { PatientFormSchema } from '@/lib/schema';
import { z } from "zod"; 

interface DataProps {
    data?: Patient;
    type?: "create" | "update";
}

const NewPatient = ({ data, type }: DataProps) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState<any>();
    const router = useRouter();

    const userDate = {
        first_name: user?.firstName || "",
        last_name: user?.lastName || "",
        email: user?.emailAddresses[0].emailAddress || "",
        phoneNo: user?.phoneNumbers?.toString() || "",
    }

    const form = useForm<z.infer<typeof PatientFormSchema>>({
        resolver: zodResolver(PatientFormSchema),
        defaultValues: {
            ...userDate
        }
    })

    return (
        <Card className='max-w-6xl w-full p-4'>
            <CardHeader>
                <CardTitle>Patient Registration</CardTitle>

                <CardDescription>
                    Please provide all the information below to help us understand better
                    and provide good and quality service to you.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={() => {}}>

                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default NewPatient;