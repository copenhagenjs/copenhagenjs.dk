const express = require("express");
const { graphql } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { typeDefs, resolvers } = require("./schema.js");
const http = require("http");
const admin = require("firebase-admin");
const { decodeJWT } = require("./firebase.js");

export const context = async ({ req }) => {
  const token = (req.headers.authorization || "").replace("bearer ", "");

  try {
    const decodedToken = await decodeJWT(token);
    return { user: decodedToken };
  } catch (e) {
    console.log(e);
    throw new Error("Could not verify token!");
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
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
