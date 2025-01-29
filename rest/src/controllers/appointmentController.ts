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
  createAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  updateAppointment,
} from "../services/appointmentService";
import { Appointment, CreateAppointmentRequest } from "../models/appointment";
import { ValidateErrorJSON } from "../models/validationError";
import { InternalError } from "../models/internalError";
import { NotFoundError } from "../models/notFoundError";
import {
  APPOINTMENT_RESPONSE,
  GET_ALL_APPOINTMENTS_RESPONSE,
} from "../examples/appointment";

@Route("api/appointments")
@Tags("Appointment")
export class AppointmentController extends Controller {
  /**
   * @summary Retrieve a list of appointments
   */
  @Get()
  @Response<NotFoundError>(404, "Not found")
  @SuccessResponse(200, "Fulfilled")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Appointment[]>(GET_ALL_APPOINTMENTS_RESPONSE)
  public async getAppointments(
    @Request() req: express.Request,
    @Query() doctorId?: number,
    @Query() patientId?: number
  ): Promise<any> {
    const baseUrl = `${req.protocol}://${req.get("host")}/api/appointments`;
    let appointments: Appointment[];

    if (doctorId) {
      appointments = await getAppointmentsByDoctorId(doctorId);
    } else if (patientId) {
      appointments = await getAppointmentsByPatientId(patientId);
    } else {
      appointments = await getAllAppointments();
    }

    const appointmentsWithLinks = appointments.map((appointment) => ({
      ...appointment,
      _links: {
        self: { href: `${baseUrl}/${appointment.id}` },
        update: { href: `${baseUrl}/${appointment.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${appointment.id}`, method: "DELETE" },
      },
    }));

    return {
      data: appointmentsWithLinks,
      _links: {
        self: { href: baseUrl },
        create: { href: baseUrl, method: "POST" },
      },
    };
  }
  /**
   * @summary Retrieve a specific appointment by ID
   */
  @Get("{id}")
  @SuccessResponse(200, "Fulfilled")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Appointment>(APPOINTMENT_RESPONSE)
  public async getAppoinmentById(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    const appointment = await getAppointmentById(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/appointments`;

    return {
      ...appointment,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        update: { href: `${baseUrl}/${id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }

  /**
   * @summary Create a new appointment
   */
  @Post()
  @SuccessResponse(201, "Created")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Appointment>(APPOINTMENT_RESPONSE)
  public async createAppointment(
    @Body() requestBody: CreateAppointmentRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const appointment = await createAppointment(requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/appointments`;

    return {
      ...appointment,
      _links: {
        self: { href: `${baseUrl}/${appointment.id}` },
        update: { href: `${baseUrl}/${appointment.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${appointment.id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }

  /**
   * @summary  Update an existing appointment by ID
   */
  @Put("{id}")
  @SuccessResponse(200, "Updated")
  @Response<NotFoundError>(404, "Not found")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Appointment>(APPOINTMENT_RESPONSE)
  public async updateAppointment(
    @Path() id: number,
    @Body() requestBody: CreateAppointmentRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const updatedAppointment = await updateAppointment(id, requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/appointments`;

    return {
      ...updatedAppointment,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }

  /**
   * @summary Delete an appointment by ID
   */
  @Delete("{id}")
  @SuccessResponse(200, "Deleted")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<void>(undefined)
  public async deleteAppointment(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    await deleteAppointment(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/appointments`;

    return {
      message: `Appointment with ID ${id} has been deleted.`,
      _links: {
        create: { href: baseUrl, method: "POST" },
        list: { href: baseUrl },
      },
    };
  }
}
