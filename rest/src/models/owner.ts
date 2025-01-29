import { Name } from "./name";

export interface Owner {
    id: number;
    name: Name;
    contactNumber: string;
    address?: string;
}

export type CreateOwnerRequest = Omit<Owner, "id">;