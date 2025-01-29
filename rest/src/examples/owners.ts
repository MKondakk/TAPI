import { Owner } from "../models/owner";

export const OWNER_RESPONSE: Owner = {
    id: 10,
    name: {
        firstName: "John",
        middleName: "One",
        lastName: "Doe"
    },
    contactNumber: "+48777999000"
}

export const GET_ALL_OWNERS_RESPONSE: Owner[] = [
    OWNER_RESPONSE,
]