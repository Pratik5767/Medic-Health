import NewPatient from '@/components/NewPatient';
import { getPatientDataById } from '@/utils/services/patient';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const Registration = async () => {
    const { userId } = await auth();
    const { data } = await getPatientDataById(userId!);

    return (
        <div className='py-6 px-3 min-h-full flex justify-center'>
            <NewPatient data={data!} type={!data ? "create" : "update"} />
        </div>
    );
}

export default Registration;