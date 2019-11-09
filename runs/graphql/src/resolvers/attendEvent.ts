import { AttendanceStatus, updateAttendance } from "../models/attendance";
import { EventDetails, memGetEvents } from "../models/events";

type AttendEventInput = {
  eventSlug: string;
  status: AttendanceStatus;
};

type Attendance = {
  status: AttendanceStatus;
  event: EventDetails;
};

export const attendEvent = async (
  parent: {},
  { input }: { input: AttendEventInput }
): Promise<Attendance> => {
  const event = memGetEvents().find(event => event.slug === input.eventSlug);
  if (event === undefined) {
    throw new Error("Could not find event!");
  }
  const doc = await updateAttendance({
    userId: "123",
    timestamp: Date.now().toString(),
    status: input.status,
    eventSlug: input.eventSlug
  });
  return { status: AttendanceStatus.GOING, event };
};
