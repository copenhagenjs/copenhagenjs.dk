const { graphql } = require("graphql");
const { gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { videos } = require("../data/videos.js");
const { getEvents, memGetEvents } = require("./events.js");
const { getSpeakers } = require("./speakers.js");
const { me } = require("./resolvers/me.js");
const { updateProfile } = require("./resolvers/updateprofile.js");

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
    location: String
    presentations: [Presentation]
  }
  type Speaker {
    title: String
    name: String
    slug: String
    event: Event
  }
  type User {
    id: String
    email: String
    name: String
    image: String
    githubId: String
    twitterId: String
    website: String
  }
  input ProfileInput {
    name: String
    image: String
    githubId: String
    twitterId: String
    website: String
  }
  type Query {
    hello: String
    events(first: Int, last: Int): [Event]
    videos: [Videos]
    searchEvents(query: String): [Event]
    speakers: [Speaker]
    speaker(slug: String!): [Speaker]
    searchSpeakers(name: String!): [Speaker]
    me: User
  }
  type Mutation {
    updateProfile(input: ProfileInput): User
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    events: (parent, { first, last }) => {
      const events = getEvents();
      if (first) {
        return events.slice(0, first);
      }
      if (last) {
        return events.slice(events.length - last, events.length);
      }
      return events;
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
    },
    speakers: () => {
      return getSpeakers();
    },
    searchSpeakers: (parent, { name }) => {
      return getSpeakers().filter(s =>
        s.name.toLowerCase().includes(name.toLowerCase())
      );
    },
    speaker: (parent, { slug }) => {
      return getSpeakers().filter(s =>
        s.slug.toLowerCase().includes(slug.toLowerCase())
      );
    },
    me
  },
  Speaker: {
    event: async (parent, arg) => {
      const event = memGetEvents().find(e => e.link === parent.link);
      return event;
    }
  },
  Mutation: {
    updateProfile
  }
};

export { typeDefs, resolvers };

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
