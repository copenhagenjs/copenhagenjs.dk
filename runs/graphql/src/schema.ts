const { graphql } = require("graphql");
const { gql } = require("apollo-server-express");
import { makeExecutableSchema } from "graphql-tools";
const { getEvents, memGetEvents } = require("./models/events.js");
const { getSpeakers } = require("./models/speakers.js");
const { me } = require("./resolvers/me.js");
const { updateProfile } = require("./resolvers/updateprofile.js");
const { video, videos, VideoSpeakerProfile } = require("./resolvers/videos.js");
const { events, event, searchEvents } = require("./resolvers/events.js");
const {
  speakers,
  searchSpeakers,
  speaker
} = require("./resolvers/speakers.js");
const {
  speakerProfile,
  speakerProfiles,
  SpeakerPresentationEvent,
  SpeakerProfileUser,
  SpeakerProfileGhostUser,
  SpeakerProfileVideos
} = require("./resolvers/speakerprofile.js");
const { SpeakerEvent } = require("./resolvers/speaker.js");
const { users } = require("./resolvers/users.js");
import {
  attendEvent,
  EventAttendance,
  EventAttendees,
  AttendeeUser
} from "./resolvers/attendEvent";

const typeDefs = gql`
  type Video {
    youtubeId: String
    title: String
    name: String
    slug: String
    speakerProfile: SpeakerProfile
  }
  type Presentation {
    title: String
    name: String
  }
  enum EventStatus {
    UPCOMING
    PAST
  }
  type Attendee {
    status: AttendanceStatus
    user: User
  }
  type Event {
    title: String
    slug: String
    markdown: String
    content: String
    selfLink: String
    link: String
    date: String
    type: String
    location: String
    presentations: [Presentation]
    attendance: Attendance
    attendees: [Attendee]
  }
  type SpeakerPresentation {
    title: String
    event: Event
  }
  type SpeakerProfile {
    name: String
    slug: String
    presentations: [SpeakerPresentation]
    user: User
    ghostUser: User
    videos: [Video]
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
  enum AttendanceStatus {
    GOING
    NOTGOING
    WAITLIST
  }
  input AttendEventInput {
    eventSlug: String
    status: AttendanceStatus
  }
  type Attendance {
    status: AttendanceStatus
    event: Event
  }
  type Query {
    hello: String
    events(first: Int, last: Int, status: EventStatus): [Event]
    event(slug: String!): Event
    videos: [Video]
    video(slug: String!): Video
    searchEvents(query: String): [Event]
    speakers: [Speaker]
    speaker(slug: String!): [Speaker]
    speakerProfiles: [SpeakerProfile]
    speakerProfile(slug: String!): SpeakerProfile
    searchSpeakers(name: String!): [Speaker]
    users: [User]
    me: User
  }
  type Mutation {
    updateProfile(input: ProfileInput): User
    attendEvent(input: AttendEventInput!): Attendance
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    events,
    event,
    videos,
    video,
    searchEvents,
    speakers,
    searchSpeakers,
    speaker,
    speakerProfile,
    speakerProfiles,
    users,
    me
  },
  Event: {
    attendance: EventAttendance,
    attendees: EventAttendees
  },
  Attendee: {
    user: AttendeeUser
  },
  Speaker: {
    event: SpeakerEvent
  },
  SpeakerProfile: {
    user: SpeakerProfileUser,
    ghostUser: SpeakerProfileGhostUser,
    videos: SpeakerProfileVideos
  },
  SpeakerPresentation: {
    event: SpeakerPresentationEvent
  },
  Video: {
    speakerProfile: VideoSpeakerProfile
  },
  Mutation: {
    updateProfile,
    attendEvent
  }
};

export { typeDefs, resolvers };

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
