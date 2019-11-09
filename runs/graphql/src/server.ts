const express = require("express");
const { graphql } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { typeDefs, resolvers } = require("./schema.js");
const http = require("http");
const admin = require("firebase-admin");
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
