import { GraphQLScalarType, Kind, GraphQLError } from "graphql";

export const DateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Custom scalar for JavaScript Date objects",

    serialize(value) {
        if (typeof value === "string") {
            return new Date(value).toString();
        }
        if (value instanceof Date) {
            return value.toString();
        }
        throw new GraphQLError("Date must be a valid JavaScript Date object or a string in a recognized date format.");
    },

    parseValue(value) {
        if (typeof value !== "string") {
            throw new GraphQLError("Date must be a string.");
        }
        const parsedDate = new Date(value);
        if (isNaN(parsedDate.getTime())) {
            throw new GraphQLError("Invalid date format. Use ISO 8601 or a valid date string.");
        }
        return parsedDate;
    },

    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new GraphQLError("Date must be a string.");
        }
        const parsedDate = new Date(ast.value);
        if (isNaN(parsedDate.getTime())) {
            throw new GraphQLError("Invalid date format. Use ISO 8601 or a valid date string.");
        }
        return parsedDate;
    },
});
