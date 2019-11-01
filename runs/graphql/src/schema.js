const { graphql } = require("graphql");
const { gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { getEvents, memGetEvents } = require("./events.js");
const { getSpeakers } = require("./speakers.js");
const { me } = require("./resolvers/me.js");
const { updateProfile } = require("./resolvers/updateprofile.js");
const { video, videos } = require("./resolvers/videos.js");
const { events, searchEvents } = require("./resolvers/events.js");

const typeDefs = gql`
  type Video {
    youtubeId: String
    title: String
    name: String
    slug: String
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
    instagramId: String
    website: String
  }
  input ProfileInput {
    name: String
    image: String
    githubId: String
    twitterId: String
    instagramId: String
    website: String
  }
  type Query {
    hello: String
    events(first: Int, last: Int): [Event]
    videos: [Video]
    video(slug: String!): Video
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
    events,
    videos,
    video,
    searchEvents,
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
