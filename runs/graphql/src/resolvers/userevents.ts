import { getUserAttendanceRaw } from "../models/attendance";
import { memGetSingleEvent } from "../models/events";

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
