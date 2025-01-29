import { DB } from "./dbService";
import { Appointment, CreateAppointmentRequest, Status } from "../models/appointment";

const getAllAppointments = (): Promise<Appointment[]> => {
    return new Promise((resolve, reject) => {
        try {
            const appointments = DB.prepare("SELECT * FROM Appointment").all() as Appointment[];

            resolve(appointments);
        } catch (error) {
            reject(error);
        }
    });
};

const getAppointmentById = (id: number): Promise<Appointment> => {
    return new Promise((resolve, reject) => {
        try {
            const appointment = DB.prepare("SELECT * FROM Appointment WHERE id = ?").get(id) as Appointment;
            if (!appointment) {
                return reject(new Error(`Appointment with ID ${id} not found`));
            }

            resolve(appointment);
        } catch (error) {
            reject(error);
        }
    });
};

const getAppointmentsByDoctorId = (doctorId: number): Promise<Appointment[]> => {
    return new Promise((resolve, reject) => {
        try {
            const appointments = DB.prepare("SELECT * FROM Appointment WHERE doctorId = ?").all(doctorId) as Appointment[];
            resolve(appointments);
        } catch (error) {
            reject(error);
        }
    });
};

const getAppointmentsByPatientId = (patientId: number): Promise<Appointment[]> => {
    return new Promise((resolve, reject) => {
        try {
            const appointments = DB.prepare("SELECT * FROM Appointment WHERE patientId = ?").all(patientId) as Appointment[];
            resolve(appointments);
        } catch (error) {
            reject(error);
        }
    });
};

const createAppointment = (request: CreateAppointmentRequest): Promise<Appointment> => {
    return new Promise((resolve, reject) => {
        try {
            const result = DB.prepare(
                `INSERT INTO Appointment (patientId, doctorId, date, reason, status)
                 VALUES (?, ?, ?, ?, ?)`
            ).run(
                request.patientId,
                request.doctorId,
                request.date.toISOString(),
                request.reason || null,
                Status.Scheduled
            );

            resolve(getAppointmentById(result.lastInsertRowid as number));
        } catch (error) {
            reject(error);
        }
    });
};

const updateAppointment = (id: number, request: CreateAppointmentRequest): Promise<Appointment> => {
    return new Promise((resolve, reject) => {
        try {
            const existing = DB.prepare("SELECT * FROM Appointment WHERE id = ?").get(id);
            if (!existing) {
                return reject(new Error(`Appointment with ID ${id} not found`));
            }

            DB.prepare(
                `UPDATE Appointment
                 SET patientId = ?, doctorId = ?, date = ?, reason = ?
                 WHERE id = ?`
            ).run(
                request.patientId,
                request.doctorId,
                request.date.toISOString(),
                request.reason || null,
                id
            );

            resolve(getAppointmentById(id));
        } catch (error) {
            reject(error);
        }
    });
};

const deleteAppointment = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const result = DB.prepare("DELETE FROM Appointment WHERE id = ?").run(id);
            if (result.changes === 0) {
                return reject(new Error(`Appointment with ID ${id} not found`));
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export {
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDoctorId,
    getAppointmentsByPatientId,
    createAppointment,
    updateAppointment,
    deleteAppointment,
};
