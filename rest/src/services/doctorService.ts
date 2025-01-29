import { DB } from "./dbService";
import { Doctor, CreateDoctorRequest } from "../models/doctor";

const getAllDoctors = (): Promise<Doctor[]> => {
    return new Promise((resolve, reject) => {
        try {
            const doctors = DB.prepare("SELECT * FROM Doctor").all() as Doctor[];

            resolve(doctors);
        } catch (error) {
            reject(error);
        }
    });
};

const getDoctorById = (id: number): Promise<Doctor> => {
    return new Promise((resolve, reject) => {
        try {
            const doctor = DB.prepare("SELECT * FROM Doctor WHERE id = ?").get(id) as Doctor;

            if (!doctor) {
                return reject(new Error(`Doctor with ID ${id} not found`));
            }

            resolve(doctor);
        } catch (error) {
            reject(error);
        }
    });
};

const createDoctor = (request: CreateDoctorRequest): Promise<Doctor> => {
    return new Promise((resolve, reject) => {
        try {
            const result = DB.prepare(
                `INSERT INTO Doctor (firstName, middleName, lastName, specialization, email, phone, hireDate)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`
            ).run(
                request.name.firstName,
                request.name.middleName || null,
                request.name.lastName,
                request.specialization,
                request.email || null,
                request.phone || null,
                new Date().toISOString()
            );

            resolve(getDoctorById(result.lastInsertRowid as number));
        } catch (error) {
            reject(error);
        }
    });
};

const updateDoctor = (id: number, request: CreateDoctorRequest): Promise<Doctor> => {
    return new Promise((resolve, reject) => {
        try {
            const result = DB.prepare(
                `UPDATE Doctor
                 SET firstName = ?, middleName = ?, lastName = ?, specialization = ?, email = ?, phone = ?
                 WHERE id = ?`
            ).run(
                request.name.firstName,
                request.name.middleName || null,
                request.name.lastName,
                request.specialization,
                request.email || null,
                request.phone || null,
                id
            );

            if (result.changes === 0) {
                reject(new Error(`Patient with ID ${id} not found`));
            } else {
                resolve(getDoctorById(id));
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteDoctor = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const result = DB.prepare("DELETE FROM Doctor WHERE id = ?").run(id);
            if (result.changes === 0) {
                return reject(new Error(`Doctor with ID ${id} not found`));
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

export {
    getAllDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor,
};
