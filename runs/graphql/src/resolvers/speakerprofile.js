const { memGetEvents } = require("../models/events.js");
import { getSpeakerProfiles } from "../models/speakers.js";
import { slugify } from "../services/slug.js";
import { searchUser, searchGhostUser } from "../services/firebase.js";
import { prepareVideos } from "./videos.js";

export const speakerProfiles = (parent, args) => {
  const parsedPresentations = getSpeakerProfiles();
  return parsedPresentations;
};

export const speakerProfile = (parent, { slug }) => {
  const parsedPresentations = getSpeakerProfiles().find(
    speakerProfile => speakerProfile.slug === slug
  );
  return parsedPresentations;
};

export const SpeakerPresentationEvent = (parent, args) => {
  const event = memGetEvents().find(
    event => event.selfLink === parent.selfLink
  );
  return event;
};

export const SpeakerProfileUser = async (parent, args) => {
  const users = await searchUser("speakerProfile", parent.slug);
  if (users.size === 0) return null;
  return users.docs[0].data();
};

export const SpeakerProfileGhostUser = async (parent, args) => {
  const users = await searchGhostUser("speakerProfile", parent.slug);
  if (users.size === 0) return null;
  return users.docs[0].data();
};

export const SpeakerProfileVideos = async (parent, args) => {
  const slug = parent.slug;
  return prepareVideos().filter(video => video.speakerSlug === slug);
};
