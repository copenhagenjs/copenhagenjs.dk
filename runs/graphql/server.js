const express = require("express");
const { graphql } = require("graphql");
const { ApolloServer, gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const data = require("../../_posts/_data.json");
const { videos } = require("../../data/videos.js");
const { readFileSync } = require("fs");
const fm = require("front-matter");
const marked = require("marked");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Videos {
    youtubeId: String
    title: String
    name: String
  }
  type Presentation {
    title: String
    name: String
  }
  type Event {
    title: String
    markdown: String
    content: String
    link: String
    date: String
    type: String
    presentations: [Presentation]
  }
  type Query {
    hello: String
    events: [Event]
    videos: [Videos]
    searchEvents(query: String): [Event]
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
    events: () => {
      return data.posts.map(post => {
        const markdown = readFileSync("../../_posts/" + post, "utf8");
        const parsed = fm(markdown);
        const date = parsed.attributes.date
          ? new Date(parsed.attributes.date + " GMT+0200")
          : new Date(
              post
                .split("-")
                .slice(0, 2)
                .join("-") + " GMT+0200"
            );

        return {
          title: parsed.attributes.title || post.replace(".md", ""),
          link: `https://copenhagenjs.dk/archive/${post.replace(".md", "")}/`,
          markdown: parsed.body,
          content: marked(parsed.body),
          date,
          type: parsed.attributes.type || "",
          presentations: parsed.attributes.speakers || []
        };
      });
    },
    videos: () => {
      return videos.map(v => ({
        youtubeId: v[0],
        title: v[1],
        name: v[2]
      }));
    },
    searchEvents: async (parent, { query }) => {
      const data = await graphql(
        schema,
        `
          {
            events {
              title
              markdown
              content
              link
              date
              type
            }
          }
        `
      );
      return data.data.events.filter(e => {
        if (e.title.toLowerCase().includes(query.toLowerCase())) return true;
        if (e.markdown.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
      });
    }
  }
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 9000;
app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
