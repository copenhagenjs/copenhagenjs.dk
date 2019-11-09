import {
  AttendanceStatus,
  updateAttendance,
  getUserEventAttendance
} from "../models/attendance";
import { EventDetails, memGetEvents } from "../models/events";
import { Context } from "../services/context";

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
  { input }: { input: AttendEventInput },
  context: Context
): Promise<Attendance> => {
  const event = memGetEvents().find(event => event.slug === input.eventSlug);
  if (event === undefined) {
    throw new Error("Could not find event!");
  }
  if (context.token) {
    const doc = await updateAttendance({
      userId: context.token.user_id,
      timestamp: Date.now().toString(),
      status: input.status,
      eventSlug: input.eventSlug
    });
    return { status: input.status, event };
  } else {
    throw new Error("User is not authenticated");
  }
};

export const EventAttendance = async (
  parent: EventDetails,
  args,
  context: Context
): Promise<{ status: AttendanceStatus } | null> => {
  const eventSlug = parent.slug;
  if (context.token) {
    const attendance = await getUserEventAttendance(
      context.token.user_id,
      eventSlug
    );
    if (attendance.size === 0) {
      return null;
    } else {
      const data = attendance.docs[0].data();
      if (data && data.status) {
        return { status: data.status };
      } else {
        return null;
      }
    }
  } else {
    throw new Error("User is not authenticated");
  }
};
