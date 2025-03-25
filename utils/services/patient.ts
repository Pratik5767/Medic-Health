import db from "@/lib/db";

export async function getPatientDashboardStatistics(id: string) {
    try {
        if (!id) {
            return {
                success: false,
                message: "No data found",
                data: null
            };
        }

        const data = await db.patient.findUnique({
            where: { id },
            select: {
                id: true,
                first_name: true,
                last_name: true,
                gender: true,
                img: true,
            }
        });

        if (!data) {
            return { success: false, message: "Patient data not found", status: 200, data: null };
        }

        const appointments = await db.appointment.findMany({
            where: { patient_id: data?.id },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        img: true,
                        specialization: true
                    }
                }
            },

            orderBy: {appointment_date: "desc"},
        });

        return {
            success: true,
            data,
            appointmentCounts: {CANCELLED: 0, PENDING: 0, SCHEDULED: 0, COMPLETED: 0},
            Last5Records: null,
            totalAppointments: appointments.length,
            availableDoctor: null,
            monthlyData: null,
            status: 200
        };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Internal Server Error", status: 500 };
    }
}

export async function getPatientDataById(id: string) {
    try {
        const patient = await db.patient.findUnique({
            where: { id },
        });

        if (!patient) {
            return {
                success: false,
                message: "Patient data not found",
                status: 200,
                data: null,
            };
        }

        return {
            success: true,
            data: patient,
            status: 200
        };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Internal Server Error", status: 500 };
    }
}