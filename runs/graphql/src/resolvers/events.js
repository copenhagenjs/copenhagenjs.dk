const { graphql } = require("graphql");
const { getEvents, memGetEvents } = require("../events.js");

export const filterEventStatus = (eventStatus, events) => {
  const now = Date.now();
  return events;
};

export const events = (parent, { first, last, status }) => {
  const events = status ? filterEventStatus(status, getEvents()) : getEvents();

  if (first) {
    return events.slice(0, first);
  }
  if (last) {
    return events.slice(events.length - last, events.length);
  }
  return events;
};

export const searchEvents = async (parent, { query }) => {
  const { schema } = require("../schema.js");
  const data = await graphql(
    schema,
    `
      {
        events {
          title
          markdown
          content
          link
          date
          type
        }
      }
    `
  );
  return data.data.events.filter(e => {
    if (e.title.toLowerCase().includes(query.toLowerCase())) return true;
    if (e.markdown.toLowerCase().includes(query.toLowerCase())) return true;
    return false;
  });
};
