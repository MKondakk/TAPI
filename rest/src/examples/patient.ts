import { Patient, Species } from "../models/patient";

export const PATIENT_RESPONSE: Patient = {
    id: 10,
    ownerId: 1,
    name: "Lola",
    species: Species.Cat
}

export const GET_ALL_PATIENTS_RESPONSE: Patient[] = [
    PATIENT_RESPONSE,
]