import { GraphQLError } from "graphql";
import { DB } from "../../database/database";

export const EntityResolvers = {
    Owner: {
        patients: (owner: any) => {
            const patients = DB.prepare("SELECT * FROM Patient WHERE ownerId = ?").all(owner.id);
            return patients || [];
        },
    },

    Patient: {
        owner: (patient: any) => {
            const owner = DB.prepare("SELECT * FROM Owner WHERE id = ?").get(patient.ownerId);
            if (!owner) {
                throw new GraphQLError(`Owner for patient ID ${patient.id} not found`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return owner;
        },
    },
    Doctor: {
        appointments: (doctor: any) => {
            const appointments = DB.prepare("SELECT * FROM Appointment WHERE doctorId = ?").all(doctor.id);
            return appointments || [];
        },
    },

    Appointment: {
        doctor: (appointment: any) => {
            const doctor = DB.prepare("SELECT * FROM Doctor WHERE id = ?").get(appointment.doctorId);
            if (!doctor) {
                throw new GraphQLError(`Doctor for appointment ID ${appointment.id} not found`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return doctor;
        },
        patient: (appointment: any) => {
            const patient = DB.prepare("SELECT * FROM Patient WHERE id = ?").get(appointment.patientId);
            if (!patient) {
                throw new GraphQLError(`Patient for appointment ID ${appointment.id} not found`, {
                    extensions: { code: "NOT_FOUND" },
                });
            }
            return patient;
        },
    },
}