const { getEvents } = require("./events.js");
const { slugify } = require("../services/slug.js");

export const getSpeakers = () => {
  return getEvents()
    .map(e => {
      return e.presentations.map(p => {
        return { ...p, selfLink: e.selfLink, slug: slugify(p.name) };
      });
    })
    .flat();
};

export const getSpeakerProfiles = () => {};
