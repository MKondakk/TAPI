import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Request,
  Response,
  Tags,
  SuccessResponse,
  Delete,
  Put,
  Example,
} from "tsoa";
import * as express from "express";
import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  getPatientsByOwnerId,
  updatePatient,
} from "../services/patientService";
import { Patient, CreatePatientRequest } from "../models/patient";
import { ValidateErrorJSON } from "../models/validationError";
import { InternalError } from "../models/internalError";
import { NotFoundError } from "../models/notFoundError";
import {
  GET_ALL_PATIENTS_RESPONSE,
  PATIENT_RESPONSE,
} from "../examples/patient";

@Route("api/patients")
@Tags("Patient")
export class PatientController extends Controller {
  /**
   * @summary Retrieve a list of patients
   */
  @Get()
  @Response<NotFoundError>(404, "Not found")
  @SuccessResponse(200, "Fulfilled")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Patient[]>(GET_ALL_PATIENTS_RESPONSE)
  public async getPatients(
    @Request() req: express.Request,
    @Query() ownerId?: number
  ): Promise<any> {
    const baseUrl = `${req.protocol}://${req.get("host")}/api/patients`;
    let patients: Patient[];

    if (ownerId) {
      patients = await getPatientsByOwnerId(ownerId);
    } else {
      patients = await getAllPatients();
    }

    const patientsWithLinks = patients.map((patient) => ({
      ...patient,
      _links: {
        self: { href: `${baseUrl}/${patient.id}` },
        update: { href: `${baseUrl}/${patient.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${patient.id}`, method: "DELETE" },
      },
    }));

    return {
      data: patientsWithLinks,
      _links: {
        self: { href: baseUrl },
        create: { href: baseUrl, method: "POST" },
      },
    };
  }
  /**
   * @summary Retrieve a specific patient by ID
   */
  @Get("{id}")
  @SuccessResponse(200, "Fulfilled")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Patient>(PATIENT_RESPONSE)
  public async getPatientById(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    const patient = await getPatientById(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/patients`;

    return {
      ...patient,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        update: { href: `${baseUrl}/${id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Create a new patient
   */
  @Post()
  @SuccessResponse(201, "Created")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Patient>(PATIENT_RESPONSE)
  public async createPatient(
    @Body() requestBody: CreatePatientRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const patient = await createPatient(requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/patients`;

    return {
      ...patient,
      _links: {
        self: { href: `${baseUrl}/${patient.id}` },
        update: { href: `${baseUrl}/${patient.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${patient.id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Update an existing patient by ID
   */
  @Put("{id}")
  @SuccessResponse(200, "Updated")
  @Response<NotFoundError>(404, "Not found")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Patient>(PATIENT_RESPONSE)
  public async updatePatient(
    @Path() id: number,
    @Body() requestBody: CreatePatientRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const updatedPatient = await updatePatient(id, requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/patients`;

    return {
      ...updatedPatient,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Delete a patient by ID
   */
  @Delete("{id}")
  @SuccessResponse(200, "Deleted")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<void>(undefined)
  public async deletePatient(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    await deletePatient(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/patients`;

    return {
      message: `Patient with ID ${id} has been deleted.`,
      _links: {
        create: { href: baseUrl, method: "POST" },
        list: { href: baseUrl },
      },
    };
  }
}
