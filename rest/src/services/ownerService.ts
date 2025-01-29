import { DB } from "./dbService";
import { CreateOwnerRequest, Owner } from "../models/owner";

const getAllOwners = (): Promise<Owner[]> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(`SELECT * FROM Owner`);
            const owners = stmt.all() as Owner[];
            resolve(owners);
        } catch (error) {
            reject(error);
        }
    });
};

const getOwnerById = (id: number): Promise<Owner> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(`SELECT * FROM Owner WHERE id = ?`);
            const owner = stmt.get(id) as Owner;
            if (!owner) {
                reject(new Error(`Owner with ID ${id} not found`));
            } else {
                resolve(owner);
            }
        } catch (error) {
            reject(error);
        }
    });
};

const createOwner = (request: CreateOwnerRequest): Promise<Owner> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(
                `INSERT INTO Owner (firstName, middleName, lastName, contactNumber, address) VALUES (?, ?, ?, ?, ?)`
            );
            const result = stmt.run(
                request.name.firstName,
                request.name.middleName || null,
                request.name.lastName,
                request.contactNumber,
                request.address || null
            );

            resolve(getOwnerById(result.lastInsertRowid as number));
        } catch (error) {
            reject(error);
        }
    });
};

const updateOwner = (id: number, request: CreateOwnerRequest): Promise<Owner> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(
                `UPDATE Owner SET firstName = ?, middleName = ?, lastName = ?, contactNumber = ?, address = ? WHERE id = ?`
            );
            const result = stmt.run(
                request.name.firstName,
                request.name.middleName || null,
                request.name.lastName,
                request.contactNumber,
                request.address || null,
                id
            );
            if (result.changes === 0) {
                reject(new Error(`Owner with ID ${id} not found`));
            } else {
                resolve(getOwnerById(id));
            }
        } catch (error) {
            reject(error);
        }
    });
};

const deleteOwner = (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        try {
            const stmt = DB.prepare(`DELETE FROM Owner WHERE id = ?`);
            const result = stmt.run(id);
            if (result.changes === 0) {
                reject(new Error(`Owner with ID ${id} not found`));
            } else {
                resolve();
            }
        } catch (error) {
            reject(error);
        }
    });
};

export {
    getAllOwners,
    getOwnerById,
    createOwner,
    deleteOwner,
    updateOwner,
};
