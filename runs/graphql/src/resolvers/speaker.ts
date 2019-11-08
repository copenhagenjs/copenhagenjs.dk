const { memGetEvents } = require("../models/events.js");

export const SpeakerEvent = async (parent, arg) => {
  const event = memGetEvents().find(e => e.selfLink === parent.selfLink);
  return event;
};
