import {
  Attendance,
  AttendanceStatus,
  updateAttendance,
  getUserEventAttendance,
  getEventAttendees
} from "../models/attendance";
import { EventDetails, memGetEvents } from "../models/events";
import { Context } from "../services/context";
import { User, getUser } from "../models/user";
import { FirebaseResult } from "../services/firebase";

type AttendEventInput = {
  eventSlug: string;
  status: AttendanceStatus;
};

type UserAttendance = {
  status: AttendanceStatus;
  event: EventDetails;
};

export const attendEvent = async (
  parent: {},
  { input }: { input: AttendEventInput },
  context: Context
): Promise<UserAttendance> => {
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
      const data = attendance.docs[attendance.docs.length - 1].data();
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

type Attendee = {
  status: AttendanceStatus;
  userId: string;
};

export const EventAttendees = async (
  parent: EventDetails
): Promise<Attendance[]> => {
  const firebaseResult = await getEventAttendees(parent.slug);
  const attendees = firebaseResult.docs
    .map(a => a.data())
    .filter((x): x is Attendance => x !== undefined);

  // a user can change their status many times
  // we only want to show their latest status
  const onlyLast = attendees
    .reduce((accumulator, current) => {
      return accumulator.set(current.userId, current);
    }, new Map())
    .values();

  return Array.from(onlyLast).filter(
    attendee => attendee.status === AttendanceStatus.GOING
  );
};

export async function AttendeeUser(parent: Attendee): Promise<User | null> {
  const firebaseResult = await getUser(parent.userId);
  if (firebaseResult && firebaseResult.exists) {
    const user = firebaseResult.data();
    return user ? user : null;
  } else {
    return null;
  }
}
