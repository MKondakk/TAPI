import { GraphQLScalarType, Kind, GraphQLError } from "graphql";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailScalar = new GraphQLScalarType({
  name: "Email",
  description: "Custom scalar type for validating email addresses",
  serialize(value) {
    if (typeof value !== "string") {
      throw new GraphQLError("Email must be a string");
    }
    if (!EMAIL_REGEX.test(value)) {
      throw new GraphQLError("Invalid email format");
    }
    return value;
  },
  parseValue(value) {
    if (typeof value !== "string") {
      throw new GraphQLError("Email must be a string");
    }
    if (!EMAIL_REGEX.test(value)) {
      throw new GraphQLError("Invalid email format");
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError("Email must be a string");
    }
    if (!EMAIL_REGEX.test(ast.value)) {
      throw new GraphQLError("Invalid email format");
    }
    return ast.value;
  },
});
