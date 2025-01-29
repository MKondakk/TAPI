import { Name } from "./name";

export interface Doctor {
    id: number;
    name: Name;
    specialization: string;
    email?: string;
    phone?: string;
    hireDate: Date;
}

export type CreateDoctorRequest = Omit<Doctor, "id" | "hireDate">;