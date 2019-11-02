const { graphql } = require("graphql");
const { gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { getEvents, memGetEvents } = require("./models/events.js");
const { getSpeakers } = require("./models/speakers.js");
const { me } = require("./resolvers/me.js");
const { updateProfile } = require("./resolvers/updateprofile.js");
const { video, videos } = require("./resolvers/videos.js");
const { events, searchEvents } = require("./resolvers/events.js");
const {
  speakers,
  searchSpeakers,
  speaker
} = require("./resolvers/speakers.js");
const { speakerProfile } = require("./resolvers/speakerprofile.js");
const { SpeakerEvent } = require("./resolvers/speaker.js");

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
  enum EventStatus {
    UPCOMING
    PAST
  }
  type Event {
    title: String
    markdown: String
    content: String
    selfLink: String
    link: String
    date: String
    type: String
    location: String
    presentations: [Presentation]
  }
  type SpeakerPresentation {
    title: String
    event: Event
  }
  type SpeakerProfile {
    name: String
    slug: String
    presentations: [SpeakerPresentation]
  }
  type Speaker {
    name: String
    slug: String
    title: String
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
    events(first: Int, last: Int, status: EventStatus): [Event]
    videos: [Video]
    video(slug: String!): Video
    searchEvents(query: String): [Event]
    speakers: [Speaker]
    speaker(slug: String!): [Speaker]
    speakerProfile(slug: String!): SpeakerProfile
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
    speakers,
    searchSpeakers,
    speaker,
    speakerProfile,
    me
  },
  Speaker: {
    event: SpeakerEvent
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
