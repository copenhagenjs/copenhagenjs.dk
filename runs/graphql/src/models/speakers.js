const { getEvents } = require("./events.js");
const { slugify } = require("./slug.js");

const getSpeakers = () => {
  return getEvents()
    .map(e => {
      return e.presentations.map(p => {
        return { ...p, selfLink: e.selfLink, slug: slugify(p.name) };
      });
    })
    .flat();
};

exports.getSpeakers = getSpeakers;
