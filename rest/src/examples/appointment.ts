import { Appointment, Status } from "../models/appointment"


export const APPOINTMENT_RESPONSE: Appointment = {
    id: 123,
    patientId: 10,
    doctorId: 3,
    date: new Date(),
    status: Status.Scheduled
}

export const GET_ALL_APPOINTMENTS_RESPONSE: Appointment[] = [
    APPOINTMENT_RESPONSE,
]