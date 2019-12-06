import { Attendance } from "../models/attendance";
import { memGetSingleEvent } from "../models/events";

export const AttendanceEvent = (parent: Attendance, args, context) => {
  if (parent.eventSlug) {
    const event = memGetSingleEvent(parent.eventSlug);
    return event;
  } else {
    return null;
  }
};
