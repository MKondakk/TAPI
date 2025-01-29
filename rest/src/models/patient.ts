export interface Patient {
    id: number;
    ownerId: number;
    name: string;
    species: Species;
    breed?: string;
    age?: number;
}

export enum Species {
    Cat = 'cat',
    Dog = 'dog',
    Rabbit = 'rabbit',
    GuineaPig = 'guineapig',
    Parrot = 'parrot'
}

export type CreatePatientRequest = Omit<Patient, "id">;