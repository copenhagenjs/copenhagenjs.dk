import { EventDetails } from "../models/events";

enum AttendanceStatus {
  GOING,
  NOTGOING,
  WAITLISTED
}

type AttendEventInput = {
  eventSlug: string;
  status: AttendanceStatus;
};

type Attendance = {
  status: AttendanceStatus;
  // event: EventDetails;
};

export const attendEvent = (
  parent,
  { input: AttendEventInput }
): Attendance => {
  return { status: AttendanceStatus.GOING };
};
