import express from "express";
import { graphql } from "graphql";
import { ApolloServer, gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs, resolvers } from "./schema.js";
import http from "http";
import admin from "firebase-admin";
import { contextHandler } from "./services/context";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextHandler
});

const app = express();
server.applyMiddleware({ app });

if (require.main === module) {
  const PORT = process.env.PORT || 9000;
  app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
}
