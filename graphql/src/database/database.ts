import DatabaseConstructor, { Database } from "better-sqlite3";

export const DB: Database = new DatabaseConstructor('db.db');