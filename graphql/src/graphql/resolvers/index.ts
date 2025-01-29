import { QueryResolvers } from "./queries";
import { MutationResolvers } from "./mutations";
import { EntityResolvers } from "./entities";
import { EmailScalar } from "../scalars/emailScalar";
import { DateScalar } from "../scalars/dateScalar";

export const resolvers = {
    Date: DateScalar,
    Email: EmailScalar,
    Query: QueryResolvers,
    Mutation: MutationResolvers,
    ...EntityResolvers,
};