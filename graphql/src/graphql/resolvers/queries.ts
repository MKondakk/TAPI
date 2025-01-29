import { GraphQLError } from "graphql";
import { DB } from "../../database/database";

const validateOrderBy = (orderBy: string, allowedFields: string[]) => {
    if (!orderBy) return "";
    const [field, direction] = orderBy.split("_");
    if (!allowedFields.includes(field) || !["ASC", "DESC"].includes(direction.toUpperCase())) {
        throw new GraphQLError(`Invalid orderBy field: ${orderBy}`, { extensions: { code: "BAD_REQUEST" } });
    }
    return ` ORDER BY ${field} ${direction.toUpperCase()}`;
};

export const QueryResolvers = {
    getOwners: (_: any, { filter, limit, offset, orderBy }: { filter?: any, limit?: number, offset?: number, orderBy?: string }) => {
        let query = "SELECT * FROM Owner WHERE 1=1";
        const params: any[] = [];

        if (filter?.contactNumber) {
            if (filter.contactNumber.equal) {
                query += " AND contactNumber = ?";
                params.push(filter.contactNumber.equal);
            }
            if (filter.contactNumber.notEqual) {
                query += " AND contactNumber != ?";
                params.push(filter.contactNumber.notEqual);
            }
            if (filter.contactNumber.contains) {
                query += " AND contactNumber LIKE ?";
                params.push(`%${filter.contactNumber.contains}%`);
            }
            if (filter.contactNumber.notContains) {
                query += " AND contactNumber NOT LIKE ?";
                params.push(`%${filter.contactNumber.notContains}%`);
            }
        }

        query += validateOrderBy(orderBy, ["id", "firstName", "lastName", "contactNumber"]);
        if (limit) {
            query += " LIMIT ?";
            params.push(limit);
        }
        if (offset) {
            query += " OFFSET ?";
            params.push(offset);
        }

        return DB.prepare(query).all(params);
    },

    getOwner: (_: any, { id }: { id: string }) => {
        const owner = DB.prepare("SELECT * FROM Owner WHERE id = ?").get(id);
        if (!owner) throw new GraphQLError(`Owner with ID ${id} not found`, { extensions: { code: "NOT_FOUND" } });
        return owner;
    },

    getPatients: (_: any, { filter, limit, offset, orderBy }: { filter?: any, limit?: number, offset?: number, orderBy?: string }) => {
        let query = "SELECT * FROM Patient WHERE 1=1";
        const params: any[] = [];

        if (filter?.ownerId?.equal) {
            query += " AND ownerId = ?";
            params.push(filter.ownerId.equal);
        }
        if (filter?.ownerId?.notEqual) {
            query += " AND ownerId != ?";
            params.push(filter.ownerId.notEqual);
        }

        if (filter?.species?.equal) {
            query += " AND species = ?";
            params.push(filter.species.equal);
        }
        if (filter?.species?.notEqual) {
            query += " AND species != ?";
            params.push(filter.species.notEqual);
        }

        if (filter?.age?.equal) {
            query += " AND age = ?";
            params.push(filter.age.equal);
        }
        if (filter?.age?.greaterThan) {
            query += " AND age > ?";
            params.push(filter.age.greaterThan);
        }
        if (filter?.age?.lessThan) {
            query += " AND age < ?";
            params.push(filter.age.lessThan);
        }
        if (filter?.age?.greaterOrEqual) {
            query += " AND age >= ?";
            params.push(filter.age.greaterOrEqual);
        }
        if (filter?.age?.lessOrEqual) {
            query += " AND age <= ?";
            params.push(filter.age.lessOrEqual);
        }

        if (filter?.name?.contains) {
            query += " AND name LIKE ?";
            params.push(`%${filter.name.contains}%`);
        }
        if (filter?.name?.notContains) {
            query += " AND name NOT LIKE ?";
            params.push(`%${filter.name.notContains}%`);
        }

        query += validateOrderBy(orderBy, ["id", "name", "age", "species"]);
        if (limit) {
            query += " LIMIT ?";
            params.push(limit);
        }
        if (offset) {
            query += " OFFSET ?";
            params.push(offset);
        }

        return DB.prepare(query).all(params);
    },

    getPatient: (_: any, { id }: { id: string }) => {
        const patient = DB.prepare("SELECT * FROM Patient WHERE id = ?").get(id);
        if (!patient) throw new GraphQLError(`Patient with ID ${id} not found`, { extensions: { code: "NOT_FOUND" } });
        return patient;
    },

    getDoctors: (_: any, { filter, limit, offset, orderBy }: { filter?: any, limit?: number, offset?: number, orderBy?: string }) => {
        let query = "SELECT * FROM Doctor WHERE 1=1";
        const params: any[] = [];

        if (filter?.firstName) {
            if (filter.firstName.equal) {
                query += " AND firstName = ?";
                params.push(filter.firstName.equal);
            }
            if (filter.firstName.notEqual) {
                query += " AND firstName != ?";
                params.push(filter.firstName.notEqual);
            }
            if (filter.firstName.contains) {
                query += " AND firstName LIKE ?";
                params.push(`%${filter.firstName.contains}%`);
            }
            if (filter.firstName.notContains) {
                query += " AND firstName NOT LIKE ?";
                params.push(`%${filter.firstName.notContains}%`);
            }
        }

        if (filter?.lastName) {
            if (filter.lastName.equal) {
                query += " AND lastName = ?";
                params.push(filter.lastName.equal);
            }
            if (filter.lastName.notEqual) {
                query += " AND lastName != ?";
                params.push(filter.lastName.notEqual);
            }
            if (filter.lastName.contains) {
                query += " AND lastName LIKE ?";
                params.push(`%${filter.lastName.contains}%`);
            }
            if (filter.lastName.notContains) {
                query += " AND lastName NOT LIKE ?";
                params.push(`%${filter.lastName.notContains}%`);
            }
        }

        if (filter?.specialization) {
            if (filter.specialization.equal) {
                query += " AND specialization = ?";
                params.push(filter.specialization.equal);
            }
            if (filter.specialization.notEqual) {
                query += " AND specialization != ?";
                params.push(filter.specialization.notEqual);
            }
            if (filter.specialization.contains) {
                query += " AND specialization LIKE ?";
                params.push(`%${filter.specialization.contains}%`);
            }
            if (filter.specialization.notContains) {
                query += " AND specialization NOT LIKE ?";
                params.push(`%${filter.specialization.notContains}%`);
            }
        }

        if (filter?.hireDate?.equal) {
            query += " AND hireDate = ?";
            params.push(new Date(filter.hireDate.equal).toISOString());
        }
        if (filter?.hireDate?.greaterThan) {
            query += " AND hireDate > ?";
            params.push(new Date(filter.hireDate.greaterThan).toISOString());
        }
        if (filter?.hireDate?.lessThan) {
            query += " AND hireDate < ?";
            params.push(new Date(filter.hireDate.lessThan).toISOString());
        }

        query += validateOrderBy(orderBy, ["id", "firstName", "lastName", "specialization", "hireDate"]);

        if (limit) {
            query += " LIMIT ?";
            params.push(limit);
        }
        if (offset) {
            query += " OFFSET ?";
            params.push(offset);
        }

        return DB.prepare(query).all(params);
    },

    getDoctor: (_: any, { id }: { id: string }) => {
        const doctor = DB.prepare("SELECT * FROM Doctor WHERE id = ?").get(id);
        if (!doctor) throw new GraphQLError(`Doctor with ID ${id} not found`, { extensions: { code: "NOT_FOUND" } });
        return doctor;
    },


    getAppointments: (_: any, { filter, limit, offset, orderBy }: { filter?: any, limit?: number, offset?: number, orderBy?: string }) => {
        let query = "SELECT * FROM Appointment WHERE 1=1";
        const params: any[] = [];

        if (filter?.doctorId?.equal) {
            query += " AND doctorId = ?";
            params.push(filter.doctorId.equal);
        }
        if (filter?.doctorId?.notEqual) {
            query += " AND doctorId != ?";
            params.push(filter.doctorId.notEqual);
        }

        if (filter?.patientId?.equal) {
            query += " AND patientId = ?";
            params.push(filter.patientId.equal);
        }
        if (filter?.patientId?.notEqual) {
            query += " AND patientId != ?";
            params.push(filter.patientId.notEqual);
        }

        if (filter?.status?.equal) {
            query += " AND status = ?";
            params.push(filter.status.equal);
        }
        if (filter?.status?.notEqual) {
            query += " AND status != ?";
            params.push(filter.status.notEqual);
        }

        if (filter?.date?.equal) {
            query += " AND date = ?";
            params.push(new Date(filter.date.equal).toISOString());
        }
        if (filter?.date?.greaterThan) {
            query += " AND date > ?";
            params.push(new Date(filter.date.greaterThan).toISOString());
        }
        if (filter?.date?.lessThan) {
            query += " AND date < ?";
            params.push(new Date(filter.date.lessThan).toISOString());
        }

        query += validateOrderBy(orderBy, ["id", "date", "status", "doctorId", "patientId"]);
        if (limit) {
            query += " LIMIT ?";
            params.push(limit);
        }
        if (offset) {
            query += " OFFSET ?";
            params.push(offset);
        }

        return DB.prepare(query).all(params);
    },

    getAppointment: (_: any, { id }: { id: string }) => {
        const appointment = DB.prepare("SELECT * FROM Appointment WHERE id = ?").get(id);
        if (!appointment) throw new GraphQLError(`Appointment with ID ${id} not found`, { extensions: { code: "NOT_FOUND" } });
        return appointment;
    },
};
