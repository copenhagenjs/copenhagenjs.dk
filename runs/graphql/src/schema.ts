import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import {
  attendEvent,
  EventAttendance,
  EventAttendees,
  AttendeeUser
} from "./resolvers/attendEvent";
import { events, event, searchEvents } from "./resolvers/events.js";
import { me } from "./resolvers/me.js";
import {
  speakerProfile,
  speakerProfiles,
  SpeakerPresentationEvent,
  SpeakerProfileUser,
  SpeakerProfileGhostUser,
  SpeakerProfileVideos
} from "./resolvers/speakerprofile.js";
import { updateProfile } from "./resolvers/updateprofile.js";
import { users, user } from "./resolvers/users.js";
import { video, videos, VideoSpeakerProfile } from "./resolvers/videos.js";

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
  type User {
    id: String
    email: String
    username: String
    name: String
    image: String
    githubId: String
    twitterId: String
    instagramId: String
    website: String
  }
  input ProfileInput {
    username: String
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
    speakerProfiles: [SpeakerProfile]
    speakerProfile(slug: String!): SpeakerProfile
    users: [User]
    user(username: String): User
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
    speakerProfile,
    speakerProfiles,
    users,
    user,
    me
  },
  Event: {
    attendance: EventAttendance,
    attendees: EventAttendees
  },
  Attendee: {
    user: AttendeeUser
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
