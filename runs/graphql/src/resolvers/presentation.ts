import { getSpeakerProfile } from "../models/speakers";
import { memGetSingleEvent } from "../models/events";
import { slugify } from "../services/slug";

export const presentation = (parent, { eventslug, titleslug }) => {
  const event = memGetSingleEvent(eventslug);
  if (!event) {
    throw new Error("Could not find event!");
  }
  const presentation = event.presentations.find(
    i => slugify(i.title) === titleslug
  );
  if (!presentation) {
    throw new Error("Did not find presentation!");
  }
  const speakerProfile = getSpeakerProfile(slugify(presentation.name));
  if (!speakerProfile) {
    return null;
  }
  const speakerPresentation = speakerProfile.presentations.find(
    i => slugify(i.title) === titleslug
  );
  if (!speakerPresentation) {
    throw new Error("Did not find any presentation!");
  }
  return {
    title: speakerPresentation.title
  };
};
