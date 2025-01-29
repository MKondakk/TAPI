import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolvers";

const typeDefs = readFileSync("src/graphql/schema.graphql", "utf-8");

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Apollo Server ready at ${url}`);
}

startServer().catch((err) => {
  console.error("Error starting Apollo Server:", err);
});
