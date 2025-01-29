# GraphQL server for veterinarian clinic

## Used technologies
- Apollo Server for GraphQL
- Apollo Playground
- Typescript
- SQlite
- better-sqlite3 for data access

## Getting started
```sh
npm run build

npm start

Navigate to http://localhost:4000/ to open Playground
```

---

## Available Entities
- Owner (Pet owner)
- Patient (Pet)
- Doctor
- Appointment (One-time event representing a meeting between Doctor, Patient, and Owner)

---

## Owner

### Fetch All Owners with Filters
```graphql
query {
  getOwners(filter: { contactNumber: { contains: "123" } }) {
    id
    firstName
    middleName
    lastName
    contactNumber
    address
  }
}
```

### Fetch Owner by ID
```graphql
query {
  getOwner(id: "1") {
    id
    firstName
    lastName
    contactNumber
  }
}
```

### Create Owner
```graphql
mutation {
  createOwner(input: {
    firstName: "John",
    middleName: "A",
    lastName: "Doe",
    contactNumber: "555-1234",
    address: "123 Main St"
  }) {
    id
    firstName
    lastName
  }
}
```

### Update Owner
```graphql
mutation {
  updateOwner(id: "1", input: {
    firstName: "Jane",
    contactNumber: "555-5678"
  }) {
    id
    firstName
    contactNumber
  }
}
```

### Delete Owner
```graphql
mutation {
  deleteOwner(id: "1")
}
```

---

## Patient

### Fetch All Patients with Filters and Sorting
```graphql
query {
  getPatients(filter: { species: { equal: dog }, age: { greaterThan: 2 } }, limit: 10, offset: 0, orderBy: "name_ASC") {
    id
    name
    species
    owner {
      firstName
      lastName
    }
  }
}
```

### Fetch Patient by ID
```graphql
query {
  getPatient(id: "5") {
    id
    name
    species
    breed
  }
}
```

### Create Patient
```graphql
mutation {
  createPatient(input: {
    ownerId: "1",
    name: "Buddy",
    species: dog,
    breed: "Golden Retriever",
    age: 5
  }) {
    id
    name
    species
  }
}
```

### Update Patient
```graphql
mutation {
  updatePatient(id: "6", input: {
    ownerId: 4,
    species: dog,
    name: "Max",
    age: 7
  }) {
    id
    name
    age
  }
}
```

### Delete Patient
```graphql
mutation {
  deletePatient(id: "5")
}
```

---

## Doctor

### Fetch All Doctors with Filters
```graphql
query {
  getDoctors(
    filter: {
      firstName: { contains: "Alice" }
      specialization: { contains : "Surgeon" }
      hireDate: { greaterThan: "2019-01-01" }
    }
    orderBy: "hireDate_DESC"
    limit: 5
    offset: 0
  ) {
    id
    firstName
    lastName
    specialization
    hireDate
  }
}
```

### Fetch Doctor by ID
```graphql
query {
  getDoctor(id: "3") {
    id
    firstName
    lastName
    specialization
  }
}
```

### Create Doctor
```graphql
mutation {
  createDoctor(input: {
    firstName: "Alice",
    lastName: "Smith",
    specialization: "Surgery",
    email: "alice@example.com",
    phone: "555-8888",
    hireDate: "2022-01-01"
  }) {
    id
    firstName
    specialization
  }
}
```

### Update Doctor
```graphql
mutation {
  updateDoctor(id: "5", input: {
    firstName: "Alice",
    lastName: "Smith",
    specialization: "Cardiology",
    hireDate: "2022-01-01"
  }) {
    id
    specialization
  }
}
```

### Delete Doctor
```graphql
mutation {
  deleteDoctor(id: "3")
}
```

---

## Appointment

### Fetch All Appointments with Filters and Sorting
```graphql
query {
  getAppointments(filter:  {
     status:  { equal: scheduled },
     date: { greaterThan: "2023-01-01" }
  }, orderBy: "date_DESC", limit: 10) {
    id
    date
    reason
    status
    doctor {
      id
      firstName
      lastName
      specialization
    }
    patient {
      id
      name
      species
      owner {
        id
        firstName
        lastName
      }
    }
  }
}
```

### Fetch Appointment by ID
```graphql
query {
  getAppointment(id: "10") {
    id
    date
    reason
    status
  }
}
```

### Create Appointment
```graphql
mutation {
  createAppointment(input: {
    patientId: "5",
    doctorId: "3",
    date: "2023-05-10",
    reason: "Routine checkup",
    status: scheduled
  }) {
    id
    date
    status
  }
}
```

### Update Appointment
```graphql
mutation {
  updateAppointment(id: "5", input: {
    patientId: "5",
    doctorId: "2",
        date: "2023-05-10",
    status: completed
  }) {
    id
    status
  }
}
```

### Delete Appointment
```graphql
mutation {
  deleteAppointment(id: "10")
}
```

---

