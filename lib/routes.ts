import { createRouteMatcher } from "@clerk/nextjs/server";

// type RouteAccessPropes = {
//     [key: string]: string[]
// };

export const routeMatchers = {
    admin: createRouteMatcher([
        "/admin(.*)",
        "/patient(.*)",
        "/record/users",
        "/record/doctors(.*)",
        "/record/patients",
        "/record/doctors",
        "/record/staffs",
        "/record/patients",
    ]),
    patient: createRouteMatcher(["/patient(.*)", "/patient/registrations"]),

    doctor: createRouteMatcher([
        "/doctor(.*)",
        "/record/doctors(.*)",
        "/record/patients",
        "/patient(.*)",
        "/record/staffs",
        "/record/patients",
    ]),
};