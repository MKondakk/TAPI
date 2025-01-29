export interface Appointment {
    id: number;
    patientId: number;
    doctorId: number;
    date: Date;
    reason?: string;
    status: Status;
}

export enum Status {
    Scheduled = 'scheduled',
    Completed = 'completed'
}

export type CreateAppointmentRequest = Omit<Appointment, "id">;