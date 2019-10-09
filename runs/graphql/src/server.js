const express = require("express");
const { graphql } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { typeDefs, resolvers } = require("./schema.js");

console.log("CopenhagenJS GraphQL server - " + process.env.FOO);

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 9000;
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
