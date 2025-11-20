import NewPatient from '@/components/NewPatient';
import { getPatientDataById } from '@/utils/services/patient';
import { auth } from '@clerk/nextjs/server';

const Registration = async () => {
    const { userId } = await auth();
    const { data } = await getPatientDataById(userId!);

    return (
        <div className='w-full h-full flex justify-center'>
            <div className='max-w-6xl w-full relative pb-10'>
                <NewPatient data={data!} type={!data ? "create" : "update"} />
            </div>
        </div>
    );
}

export default Registration;