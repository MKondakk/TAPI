import { DB } from "./dbService";
import { Patient, CreatePatientRequest } from "../models/patient";

const getAllPatients = (): Promise<Patient[]> => {
    return new Promise((resolve, reject) => {
        try {

            const stmt = DB.prepare(`SELECT * FROM Patient`);
            const patients = stmt.all() as Patient[];
            resolve(patients);
        } catch (error) {
            reject(error);
        }
    });
};

const getPatientsByOwnerId = (ownerId: number): Promise<Patient[]> => {
    return new Promise((resolve, reject) => {
        try {

            const stmt = DB.prepare(`SELECT * FROM Patient WHERE ownerId = ?`);
            const patients = stmt.all(ownerId) as Patient[];
            resolve(patients);
        } catch (error) {
            reject(error);
        }
    });
};

const getPatientById = (id: number): Promise<Patient> => {
    return new Promise((resolve, reject) => {
        try {

            const stmt = DB.prepare(`SELECT * FROM Patient WHERE id = ?`);
            const patient = stmt.get(id) as Patient;
            if (!patient) {
                reject(new Error(`Patient with ID ${id} not found`));
            } else {
                resolve(patient);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const createPatient = (request: CreatePatientRequest): Promise<Patient> => {
    return new Promise((resolve, reject) => {
        try {

            const stmt = DB.prepare(
                `INSERT INTO Patient (ownerId, name, species, breed, age) VALUES (?, ?, ?, ?, ?)`
            );
            const result = stmt.run(request.ownerId, request.name, request.species, request.breed, request.age);

            resolve(getPatientById(result.lastInsertRowid as number));
        } catch (error) {
            reject(error);
        }
    });
};

const updatePatient = (id: number, request: CreatePatientRequest): Promise<Patient> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(
                `UPDATE Patient SET ownerId = ?, name = ?, species = ?, breed = ?, age = ? WHERE id = ?`
            );
            const result = stmt.run(request.ownerId, request.name, request.species, request.breed, request.age, id);
            if (result.changes === 0) {
                reject(new Error(`Patient with ID ${id} not found`));
            } else {
                resolve(getPatientById(id));
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deletePatient = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(`DELETE FROM Patient WHERE id = ?`);
            const result = stmt.run(id);
            if (result.changes === 0) {
                reject(new Error(`Patient with ID ${id} not found`));
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

export {
    getAllPatients,
    getPatientsByOwnerId,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
};
