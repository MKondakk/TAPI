/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { PatientController } from './../src/controllers/patientController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OwnerController } from './../src/controllers/ownerController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DoctorController } from './../src/controllers/doctorController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppointmentController } from './../src/controllers/appointmentController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "NotFoundError": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Not found"],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InternalError": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Internal Server Error"],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Response": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ValidateErrorJSON": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"enum","enums":["Validation failed"],"required":true},
            "details": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Species": {
        "dataType": "refEnum",
        "enums": ["cat","dog","rabbit","guineapig","parrot"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Patient.Exclude_keyofPatient.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"ownerId":{"dataType":"double","required":true},"name":{"dataType":"string","required":true},"species":{"ref":"Species","required":true},"breed":{"dataType":"string"},"age":{"dataType":"double"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Patient.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Patient.Exclude_keyofPatient.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreatePatientRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Patient.id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Name": {
        "dataType": "refObject",
        "properties": {
            "firstName": {"dataType":"string","required":true},
            "middleName": {"dataType":"string"},
            "lastName": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Owner.Exclude_keyofOwner.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"ref":"Name","required":true},"contactNumber":{"dataType":"string","required":true},"address":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Owner.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Owner.Exclude_keyofOwner.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOwnerRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Owner.id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Doctor.Exclude_keyofDoctor.id-or-hireDate__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"ref":"Name","required":true},"specialization":{"dataType":"string","required":true},"email":{"dataType":"string"},"phone":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Doctor.id-or-hireDate_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Doctor.Exclude_keyofDoctor.id-or-hireDate__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateDoctorRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Doctor.id-or-hireDate_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refEnum",
        "enums": ["scheduled","completed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_Appointment.Exclude_keyofAppointment.id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"patientId":{"dataType":"double","required":true},"doctorId":{"dataType":"double","required":true},"date":{"dataType":"datetime","required":true},"reason":{"dataType":"string"},"status":{"ref":"Status","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_Appointment.id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_Appointment.Exclude_keyofAppointment.id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAppointmentRequest": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_Appointment.id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsPatientController_getPatients: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                ownerId: {"in":"query","name":"ownerId","dataType":"double"},
        };
        app.get('/api/patients',
            ...(fetchMiddlewares<RequestHandler>(PatientController)),
            ...(fetchMiddlewares<RequestHandler>(PatientController.prototype.getPatients)),

            async function PatientController_getPatients(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPatientController_getPatients, request, response });

                const controller = new PatientController();

              await templateService.apiHandler({
                methodName: 'getPatients',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPatientController_getPatientById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/patients/:id',
            ...(fetchMiddlewares<RequestHandler>(PatientController)),
            ...(fetchMiddlewares<RequestHandler>(PatientController.prototype.getPatientById)),

            async function PatientController_getPatientById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPatientController_getPatientById, request, response });

                const controller = new PatientController();

              await templateService.apiHandler({
                methodName: 'getPatientById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPatientController_createPatient: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreatePatientRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/patients',
            ...(fetchMiddlewares<RequestHandler>(PatientController)),
            ...(fetchMiddlewares<RequestHandler>(PatientController.prototype.createPatient)),

            async function PatientController_createPatient(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPatientController_createPatient, request, response });

                const controller = new PatientController();

              await templateService.apiHandler({
                methodName: 'createPatient',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPatientController_updatePatient: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreatePatientRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/patients/:id',
            ...(fetchMiddlewares<RequestHandler>(PatientController)),
            ...(fetchMiddlewares<RequestHandler>(PatientController.prototype.updatePatient)),

            async function PatientController_updatePatient(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPatientController_updatePatient, request, response });

                const controller = new PatientController();

              await templateService.apiHandler({
                methodName: 'updatePatient',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsPatientController_deletePatient: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/patients/:id',
            ...(fetchMiddlewares<RequestHandler>(PatientController)),
            ...(fetchMiddlewares<RequestHandler>(PatientController.prototype.deletePatient)),

            async function PatientController_deletePatient(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsPatientController_deletePatient, request, response });

                const controller = new PatientController();

              await templateService.apiHandler({
                methodName: 'deletePatient',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOwnerController_getOwners: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/owners',
            ...(fetchMiddlewares<RequestHandler>(OwnerController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerController.prototype.getOwners)),

            async function OwnerController_getOwners(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOwnerController_getOwners, request, response });

                const controller = new OwnerController();

              await templateService.apiHandler({
                methodName: 'getOwners',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOwnerController_getOwnerById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/owners/:id',
            ...(fetchMiddlewares<RequestHandler>(OwnerController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerController.prototype.getOwnerById)),

            async function OwnerController_getOwnerById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOwnerController_getOwnerById, request, response });

                const controller = new OwnerController();

              await templateService.apiHandler({
                methodName: 'getOwnerById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOwnerController_createOwner: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateOwnerRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/owners',
            ...(fetchMiddlewares<RequestHandler>(OwnerController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerController.prototype.createOwner)),

            async function OwnerController_createOwner(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOwnerController_createOwner, request, response });

                const controller = new OwnerController();

              await templateService.apiHandler({
                methodName: 'createOwner',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOwnerController_updateOwner: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateOwnerRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/owners/:id',
            ...(fetchMiddlewares<RequestHandler>(OwnerController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerController.prototype.updateOwner)),

            async function OwnerController_updateOwner(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOwnerController_updateOwner, request, response });

                const controller = new OwnerController();

              await templateService.apiHandler({
                methodName: 'updateOwner',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsOwnerController_deleteOwner: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/owners/:id',
            ...(fetchMiddlewares<RequestHandler>(OwnerController)),
            ...(fetchMiddlewares<RequestHandler>(OwnerController.prototype.deleteOwner)),

            async function OwnerController_deleteOwner(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsOwnerController_deleteOwner, request, response });

                const controller = new OwnerController();

              await templateService.apiHandler({
                methodName: 'deleteOwner',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDoctorController_getDoctors: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/doctors',
            ...(fetchMiddlewares<RequestHandler>(DoctorController)),
            ...(fetchMiddlewares<RequestHandler>(DoctorController.prototype.getDoctors)),

            async function DoctorController_getDoctors(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDoctorController_getDoctors, request, response });

                const controller = new DoctorController();

              await templateService.apiHandler({
                methodName: 'getDoctors',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDoctorController_getDoctorById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/doctors/:id',
            ...(fetchMiddlewares<RequestHandler>(DoctorController)),
            ...(fetchMiddlewares<RequestHandler>(DoctorController.prototype.getDoctorById)),

            async function DoctorController_getDoctorById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDoctorController_getDoctorById, request, response });

                const controller = new DoctorController();

              await templateService.apiHandler({
                methodName: 'getDoctorById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDoctorController_createDoctor: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateDoctorRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/doctors',
            ...(fetchMiddlewares<RequestHandler>(DoctorController)),
            ...(fetchMiddlewares<RequestHandler>(DoctorController.prototype.createDoctor)),

            async function DoctorController_createDoctor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDoctorController_createDoctor, request, response });

                const controller = new DoctorController();

              await templateService.apiHandler({
                methodName: 'createDoctor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDoctorController_updateDoctor: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateDoctorRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/doctors/:id',
            ...(fetchMiddlewares<RequestHandler>(DoctorController)),
            ...(fetchMiddlewares<RequestHandler>(DoctorController.prototype.updateDoctor)),

            async function DoctorController_updateDoctor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDoctorController_updateDoctor, request, response });

                const controller = new DoctorController();

              await templateService.apiHandler({
                methodName: 'updateDoctor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDoctorController_deleteDoctor: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/doctors/:id',
            ...(fetchMiddlewares<RequestHandler>(DoctorController)),
            ...(fetchMiddlewares<RequestHandler>(DoctorController.prototype.deleteDoctor)),

            async function DoctorController_deleteDoctor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDoctorController_deleteDoctor, request, response });

                const controller = new DoctorController();

              await templateService.apiHandler({
                methodName: 'deleteDoctor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAppointmentController_getAppointments: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                doctorId: {"in":"query","name":"doctorId","dataType":"double"},
                patientId: {"in":"query","name":"patientId","dataType":"double"},
        };
        app.get('/api/appointments',
            ...(fetchMiddlewares<RequestHandler>(AppointmentController)),
            ...(fetchMiddlewares<RequestHandler>(AppointmentController.prototype.getAppointments)),

            async function AppointmentController_getAppointments(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_getAppointments, request, response });

                const controller = new AppointmentController();

              await templateService.apiHandler({
                methodName: 'getAppointments',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAppointmentController_getAppoinmentById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/api/appointments/:id',
            ...(fetchMiddlewares<RequestHandler>(AppointmentController)),
            ...(fetchMiddlewares<RequestHandler>(AppointmentController.prototype.getAppoinmentById)),

            async function AppointmentController_getAppoinmentById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_getAppoinmentById, request, response });

                const controller = new AppointmentController();

              await templateService.apiHandler({
                methodName: 'getAppoinmentById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAppointmentController_createAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAppointmentRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.post('/api/appointments',
            ...(fetchMiddlewares<RequestHandler>(AppointmentController)),
            ...(fetchMiddlewares<RequestHandler>(AppointmentController.prototype.createAppointment)),

            async function AppointmentController_createAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_createAppointment, request, response });

                const controller = new AppointmentController();

              await templateService.apiHandler({
                methodName: 'createAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAppointmentController_updateAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateAppointmentRequest"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.put('/api/appointments/:id',
            ...(fetchMiddlewares<RequestHandler>(AppointmentController)),
            ...(fetchMiddlewares<RequestHandler>(AppointmentController.prototype.updateAppointment)),

            async function AppointmentController_updateAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_updateAppointment, request, response });

                const controller = new AppointmentController();

              await templateService.apiHandler({
                methodName: 'updateAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAppointmentController_deleteAppointment: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.delete('/api/appointments/:id',
            ...(fetchMiddlewares<RequestHandler>(AppointmentController)),
            ...(fetchMiddlewares<RequestHandler>(AppointmentController.prototype.deleteAppointment)),

            async function AppointmentController_deleteAppointment(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAppointmentController_deleteAppointment, request, response });

                const controller = new AppointmentController();

              await templateService.apiHandler({
                methodName: 'deleteAppointment',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
