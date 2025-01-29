import { Body, Controller, Get, Path, Post, Route, Request, Response, Tags, SuccessResponse, Delete, Put, Example } from 'tsoa';
import * as express from 'express';
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } from '../services/doctorService';
import { Doctor, CreateDoctorRequest } from '../models/doctor';
import { ValidateErrorJSON } from '../models/validationError';
import { InternalError } from '../models/internalError';
import { NotFoundError } from '../models/notFoundError';
import { GET_ALL_DOCTORS_RESPONSE, DOCTOR_RESPONSE } from '../examples/doctor';

@Route('api/doctors')
@Tags("Doctor")
export class DoctorController extends Controller {
    @Get()
    @Response<NotFoundError>(404, "Not found")
    @SuccessResponse(200, "Fulfilled")
    @Response<InternalError>(500, 'Unexpected error')
    @Example<Doctor[]>(GET_ALL_DOCTORS_RESPONSE)
    public async getDoctors(@Request() req: express.Request): Promise<any> {
        const doctors = await getAllDoctors();
        const baseUrl = `${req.protocol}://${req.get('host')}/api/doctors`;

        const doctorsWithLinks = doctors.map((doctor) => ({
            ...doctor,
            _links: {
                self: { href: `${baseUrl}/${doctor.id}` },
                update: { href: `${baseUrl}/${doctor.id}`, method: 'PUT' },
                delete: { href: `${baseUrl}/${doctor.id}`, method: 'DELETE' },
            },
        }));

        return {
            data: doctorsWithLinks,
            _links: {
                self: { href: baseUrl },
                create: { href: baseUrl, method: 'POST' },
            },
        };
    }

    @Get('{id}')
    @SuccessResponse(200, "Fulfilled")
    @Response<NotFoundError>(404, "Not found")
    @Response<InternalError>(500, 'Unexpected error')
    @Example<Doctor>(DOCTOR_RESPONSE)
    public async getDoctorById(@Path() id: number, @Request() req: express.Request): Promise<any> {
        const doctor = await getDoctorById(id);
        const baseUrl = `${req.protocol}://${req.get('host')}/api/doctors`;

        return {
            ...doctor,
            _links: {
                self: { href: `${baseUrl}/${id}` },
                update: { href: `${baseUrl}/${id}`, method: 'PUT' },
                delete: { href: `${baseUrl}/${id}`, method: 'DELETE' },
                list: { href: baseUrl },
            },
        };
    }

    @Post()
    @SuccessResponse(201, "Created")
    @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
    @Response<InternalError>(500, 'Unexpected error')
    @Example<Doctor>(DOCTOR_RESPONSE)
    public async createDoctor(@Body() requestBody: CreateDoctorRequest, @Request() req: express.Request): Promise<any> {
        const doctor = await createDoctor(requestBody);
        const baseUrl = `${req.protocol}://${req.get('host')}/api/doctors`;

        return {
            ...doctor,
            _links: {
                self: { href: `${baseUrl}/${doctor.id}` },
                update: { href: `${baseUrl}/${doctor.id}`, method: 'PUT' },
                delete: { href: `${baseUrl}/${doctor.id}`, method: 'DELETE' },
                list: { href: baseUrl },
            },
        };
    }

    @Put('{id}')
    @SuccessResponse(200, "Updated")
    @Response<NotFoundError>(404, "Not found")
    @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
    @Response<InternalError>(500, 'Unexpected error')
    @Example<Doctor>(DOCTOR_RESPONSE)
    public async updateDoctor(@Path() id: number, @Body() requestBody: CreateDoctorRequest, @Request() req: express.Request): Promise<any> {
        const updatedDoctor = await updateDoctor(id, requestBody);
        const baseUrl = `${req.protocol}://${req.get('host')}/api/doctors`;

        return {
            ...updatedDoctor,
            _links: {
                self: { href: `${baseUrl}/${id}` },
                delete: { href: `${baseUrl}/${id}`, method: 'DELETE' },
                list: { href: baseUrl },
            },
        };
    }

    @Delete('{id}')
    @SuccessResponse(200, "Deleted")
    @Response<NotFoundError>(404, "Not found")
    @Response<InternalError>(500, 'Unexpected error')
    @Example<void>(undefined)
    public async deleteDoctor(@Path() id: number, @Request() req: express.Request): Promise<any> {
        await deleteDoctor(id);
        const baseUrl = `${req.protocol}://${req.get('host')}/api/doctors`;

        return {
            message: `Doctor with ID ${id} has been deleted.`,
            _links: {
                create: { href: baseUrl, method: 'POST' },
                list: { href: baseUrl },
            },
        };
    }
}
