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

export const getSpeakerProfiles = () => {
  const events = getEvents();
  return events
    .map(event => {
      const { presentations, selfLink } = event;
      const profiles = presentations.map(presentation => {
        return {
          name: presentation.name,
          presentations: [{ title: presentation.title, selfLink }]
        };
      });
      return profiles;
    })
    .flat();
};
