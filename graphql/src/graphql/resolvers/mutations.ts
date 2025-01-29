import { GraphQLError } from "graphql";
import { DB } from "../../database/database";

export const MutationResolvers = {
    createOwner: (_: any, { input }: { input: any }) => {
        const stmt = DB.prepare(
            "INSERT INTO Owner (firstName, middleName, lastName, contactNumber, address) VALUES (?, ?, ?, ?, ?)"
        ).run(input.firstName, input.middleName || null, input.lastName, input.contactNumber, input.address || null);
        return DB.prepare("SELECT * FROM Owner WHERE id = ?").get(stmt.lastInsertRowid);
    },

    updateOwner: (_: any, { id, input }: { id: string; input: any }) => {
        const stmt = DB.prepare(
            "UPDATE Owner SET firstName = ?, middleName = ?, lastName = ?, contactNumber = ?, address = ? WHERE id = ?"
        ).run(input.firstName, input.middleName || null, input.lastName, input.contactNumber, input.address || null, id);
        if (stmt.changes === 0) throw new GraphQLError(`Owner with ID ${id} not found`);
        return DB.prepare("SELECT * FROM Owner WHERE id = ?").get(id);
    },

    deleteOwner: (_: any, { id }: { id: string }) => {
        const stmt = DB.prepare("DELETE FROM Owner WHERE id = ?").run(id);
        return stmt.changes > 0;
    },

    createPatient: (_: any, { input }: { input: any }) => {
        const stmt = DB.prepare(
            "INSERT INTO Patient (ownerId, name, species, breed, age) VALUES (?, ?, ?, ?, ?)"
        ).run(input.ownerId, input.name, input.species, input.breed || null, input.age || null);
        return DB.prepare("SELECT * FROM Patient WHERE id = ?").get(stmt.lastInsertRowid);
    },

    updatePatient: (_: any, { id, input }: { id: string; input: any }) => {
        const stmt = DB.prepare(
            "UPDATE Patient SET ownerId = ?, name = ?, species = ?, breed = ?, age = ? WHERE id = ?"
        ).run(input.ownerId, input.name, input.species, input.breed || null, input.age || null, id);
        if (stmt.changes === 0) throw new GraphQLError(`Patient with ID ${id} not found`);
        return DB.prepare("SELECT * FROM Patient WHERE id = ?").get(id);
    },

    deletePatient: (_: any, { id }: { id: string }) => {
        const stmt = DB.prepare("DELETE FROM Patient WHERE id = ?").run(id);
        return stmt.changes > 0;
    },

    createDoctor: (_: any, { input }: { input: any }) => {
        const stmt = DB.prepare(
            "INSERT INTO Doctor (firstName, middleName, lastName, specialization, email, phone, hireDate) VALUES (?, ?, ?, ?, ?, ?, ?)"
        ).run(
            input.firstName, input.middleName || null, input.lastName, input.specialization,
            input.email || null, input.phone || null, new Date(input.hireDate).toISOString()
        );
        return DB.prepare("SELECT * FROM Doctor WHERE id = ?").get(stmt.lastInsertRowid);
    },

    updateDoctor: (_: any, { id, input }: { id: string; input: any }) => {
        const stmt = DB.prepare(
            "UPDATE Doctor SET firstName = ?, middleName = ?, lastName = ?, specialization = ?, email = ?, phone = ?, hireDate = ? WHERE id = ?"
        ).run(
            input.firstName, input.middleName || null, input.lastName, input.specialization,
            input.email || null, input.phone || null, new Date(input.hireDate).toISOString(), id
        );
        if (stmt.changes === 0) throw new GraphQLError(`Doctor with ID ${id} not found`);
        return DB.prepare("SELECT * FROM Doctor WHERE id = ?").get(id);
    },

    deleteDoctor: (_: any, { id }: { id: string }) => {
        const stmt = DB.prepare("DELETE FROM Doctor WHERE id = ?").run(id);
        return stmt.changes > 0;
    },

    createAppointment: (_: any, { input }: { input: any }) => {
        const stmt = DB.prepare(
            "INSERT INTO Appointment (patientId, doctorId, date, reason, status) VALUES (?, ?, ?, ?, ?)"
        ).run(input.patientId, input.doctorId, new Date(input.date).toISOString(), input.reason || null, input.status);
        return DB.prepare("SELECT * FROM Appointment WHERE id = ?").get(stmt.lastInsertRowid);
    },

    updateAppointment: (_: any, { id, input }: { id: string; input: any }) => {
        const stmt = DB.prepare(
            "UPDATE Appointment SET patientId = ?, doctorId = ?, date = ?, reason = ?, status = ? WHERE id = ?"
        ).run(input.patientId, input.doctorId, new Date(input.date).toISOString(), input.reason || null, input.status, id);
        if (stmt.changes === 0) throw new GraphQLError(`Appointment with ID ${id} not found`);
        return DB.prepare("SELECT * FROM Appointment WHERE id = ?").get(id);
    },

    deleteAppointment: (_: any, { id }: { id: string }) => {
        const stmt = DB.prepare("DELETE FROM Appointment WHERE id = ?").run(id);
        return stmt.changes > 0;
    },
}