"use server"

import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";

export async function updatePatient(data: any, pid: string) {
    try {
        const validateDate = PatientFormSchema.safeParse(data);

        if (!validateDate.success) {
            return {
                success: false,
                error: true,
                msg: "Provide required all fields"
            };
        }

        const patientData = validateDate.data;

        const client = await clerkClient();

        await client.users.updateUser(pid, {
            firstName: patientData.first_name,
            lastName: patientData.last_name,
            publicMetadata: { role: "patient" }
        });

        await db.patient.update({
            data: {
                ...patientData
            },
            where: { id: pid }
        });

        return { success: true, error: false, msg: "Patient info updated successfully" };
    } catch (error: any) {
        console.log(error);
        return { success: false, error: true, msg: error?.message };
    }
}

export async function createNewPatient(data: any, pid: string) {
    try {
        const validateDate = PatientFormSchema.safeParse(data);

        if (!validateDate.success) {
            return {
                success: false,
                error: true,
                msg: "Provide required all fields"
            };
        }

        const patientData = validateDate.data;
        let patient_id = pid;

        const client = await clerkClient();
        if (pid === "new-patient") {

            const user = await client.users.createUser({
                emailAddress: [patientData.email],
                password: patientData.phone,
                firstName: patientData.first_name,
                lastName: patientData.last_name,
                publicMetadata: { role: "patient" }
            });

            patient_id = user?.id;
        } else {
            await client.users.updateUser(pid, {
                publicMetadata: { role: "patient" }
            });
        }

        await db.patient.create({
            data: {
                ...patientData,
                id: patient_id
            },
        });

        return { success: true, error: false, msg: "Patient created successfully" };
    } catch (error: any) {
        console.log(error);
        return { success: false, error: true, msg: error?.message };
    }
}