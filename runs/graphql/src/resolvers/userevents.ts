import { getUserAttendanceRaw, Attendance } from "../models/attendance";
import { memGetSingleEvent } from "../models/events";

export const uniqueEventsFromAttendance = (
  attendances: Attendance[]
): Attendance[] => {
  const lastUnique = new Map();
  attendances.forEach(attendance => {
    lastUnique.set(attendance.eventSlug, attendance);
  });
  const events = Array.from(lastUnique.values());
  return events;
};

export const UserEvents = async (parent, args, context) => {
  const attendances = await getUserAttendanceRaw(context.token.user_id);

  return attendances.map(attendance => {
    if (attendance.eventSlug) {
      const event = memGetSingleEvent(attendance.eventSlug);
      return event;
    } else {
      return null;
    }
  });
};
