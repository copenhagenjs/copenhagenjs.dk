const { memGetEvents } = require("../models/events.js");
import { getSpeakerProfiles } from "../models/speakers.js";
import { slugify } from "../services/slug.js";

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
