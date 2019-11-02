const { getSpeakers } = require("../models/speakers.js");

export const speakers = () => {
  return getSpeakers();
};

export const searchSpeakers = (parent, { name }) => {
  return getSpeakers().filter(s =>
    s.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const speaker = (parent, { slug }) => {
  return getSpeakers().filter(s =>
    s.slug.toLowerCase().includes(slug.toLowerCase())
  );
};
