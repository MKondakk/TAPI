import {
  Controller,
  Get,
  Post,
  Route,
  Body,
  Request,
  Path,
  Response,
  Tags,
  SuccessResponse,
  Delete,
  Put,
  Example,
} from "tsoa";
import * as express from "express";
import { CreateOwnerRequest, Owner } from "../models/owner";
import { ValidateErrorJSON } from "../models/validationError";
import { InternalError } from "../models/internalError";
import { NotFoundError } from "../models/notFoundError";
import {
  createOwner,
  deleteOwner,
  getAllOwners,
  getOwnerById,
  updateOwner,
} from "../services/ownerService";
import { GET_ALL_OWNERS_RESPONSE, OWNER_RESPONSE } from "../examples/owners";

@Route("api/owners")
@Tags("Owner")
export class OwnerController extends Controller {
  /**
   * @summary Retrieve a list of owners
   */
  @Get()
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @SuccessResponse(200, "Fulfilled")
  @Example<Owner[]>(GET_ALL_OWNERS_RESPONSE)
  public async getOwners(@Request() req: express.Request): Promise<any> {
    const owners = await getAllOwners();
    const baseUrl = `${req.protocol}://${req.get("host")}/api/owners`;

    const ownersWithLinks = owners.map((owner) => ({
      ...owner,
      _links: {
        self: { href: `${baseUrl}/${owner.id}` },
        update: { href: `${baseUrl}/${owner.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${owner.id}`, method: "DELETE" },
      },
    }));

    return {
      data: ownersWithLinks,
      _links: {
        self: { href: baseUrl },
        create: { href: baseUrl, method: "POST" },
      },
    };
  }
  /**
   * @summary Retrieve a specific owner by ID
   */
  @Get("{id}")
  @SuccessResponse(200, "Fulfilled")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Owner>(OWNER_RESPONSE)
  public async getOwnerById(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    const owner = await getOwnerById(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/owners`;

    return {
      ...owner,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        update: { href: `${baseUrl}/${id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Create a new owner
   */
  @Post()
  @SuccessResponse(201, "Created")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Owner>(OWNER_RESPONSE)
  public async createOwner(
    @Body() requestBody: CreateOwnerRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const owner = await createOwner(requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/owners`;

    return {
      ...owner,
      _links: {
        self: { href: `${baseUrl}/${owner.id}` },
        update: { href: `${baseUrl}/${owner.id}`, method: "PUT" },
        delete: { href: `${baseUrl}/${owner.id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Update an existing owner by ID
   */
  @Put("{id}")
  @SuccessResponse(200, "Updated")
  @Response<NotFoundError>(404, "Not found")
  @Response<Response, ValidateErrorJSON>(422, "Validation Failed")
  @Response<InternalError>(500, "Unexpected error")
  @Example<Owner>(OWNER_RESPONSE)
  public async updateOwner(
    @Path() id: number,
    @Body() requestBody: CreateOwnerRequest,
    @Request() req: express.Request
  ): Promise<any> {
    const updatedOwner = await updateOwner(id, requestBody);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/owners`;

    return {
      ...updatedOwner,
      _links: {
        self: { href: `${baseUrl}/${id}` },
        delete: { href: `${baseUrl}/${id}`, method: "DELETE" },
        list: { href: baseUrl },
      },
    };
  }
  /**
   * @summary Delete an owner by ID
   */
  @Delete("{id}")
  @SuccessResponse(200, "Deleted")
  @Response<NotFoundError>(404, "Not found")
  @Response<InternalError>(500, "Unexpected error")
  @Example<void>(undefined)
  public async deleteOwner(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<any> {
    await deleteOwner(id);
    const baseUrl = `${req.protocol}://${req.get("host")}/api/owners`;

    return {
      message: `Owner with ID ${id} has been deleted.`,
      _links: {
        create: { href: baseUrl, method: "POST" },
        list: { href: baseUrl },
      },
    };
  }
}
