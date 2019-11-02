import { getSpeakerProfiles } from "../models/speakers.js";
import { slugify } from "../services/slug.js";

export const speakerProfile = (parent, { slug }) => {
  const parsedPresentations = getSpeakerProfiles().find(
    speakerProfile => speakerProfile.slug === slug
  );
  return parsedPresentations;
};
