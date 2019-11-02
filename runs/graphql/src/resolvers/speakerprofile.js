import { getSpeakers } from "../models/speakers.js";
import { slugify } from "../services/slug.js";

export const speakerProfile = (parent, { slug }) => {
  const parsedPresentations = getSpeakers().filter(s =>
    s.slug.toLowerCase().includes(slug.toLowerCase())
  );
  return {
    name: parsedPresentations[0].name,
    presentations: parsedPresentations.map(i => i.title),
    slug: slugify(parsedPresentations[0].name)
  };
};
