import { Doctor } from "../models/doctor"

export const DOCTOR_RESPONSE: Doctor = {
    id: 3,
    name: {
        firstName: "Jan",
        lastName: "Pawel"
    },
    specialization: "Internista",
    hireDate: new Date(),
    email: "jan.pawel@clinic.com",
    phone: "611892343",
}

export const GET_ALL_DOCTORS_RESPONSE: Doctor[] = [
    DOCTOR_RESPONSE,
]