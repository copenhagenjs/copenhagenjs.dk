import { getSpeakerProfile } from "../models/speakers";
import { slugify } from "../services/slug";

export const presentation = (parent, { nameslug, titleslug }) => {
  const speakerProfile = getSpeakerProfile(nameslug);
  if (!speakerProfile) {
    return null;
  }
  const presentation = speakerProfile.presentations.find(
    i => slugify(i.title) === titleslug
  );
  if (!presentation) {
    throw new Error("Did not find any presentation!");
  }
  return {
    title: presentation.title
  };
};
