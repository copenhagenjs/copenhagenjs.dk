import { EventDetails, memGetEvents } from "../models/events";

enum AttendanceStatus {
  GOING,
  NOTGOING,
  WAITLIST
}

type AttendEventInput = {
  eventSlug: string;
  status: AttendanceStatus;
};

type Attendance = {
  status: AttendanceStatus;
  event: EventDetails;
};

export const attendEvent = (
  parent,
  { input }: { input: AttendEventInput }
): Attendance => {
  const event = memGetEvents().find(event => event.slug === input.eventSlug);
  if (event === undefined) {
    throw new Error("Could not find event!");
  }
  return { status: AttendanceStatus.GOING, event };
};
