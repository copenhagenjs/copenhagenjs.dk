const { getEvents } = require('./events.js')

const getSpeakers = () => {
  return getEvents()
    .map(e => {
      return e.presentations.map(p => {
        return { ...p, link: e.link, slug: slugify(p.name) };
      });
    })
    .flat();
};

exports.getSpeakers = getSpeakers
