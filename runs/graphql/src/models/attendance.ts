import { FirebaseResult, FirebaseResultItem, db } from "../services/firebase";

export enum AttendanceStatus {
  GOING = "GOING",
  NOTGOING = "NOTGOING",
  WAITLIST = "WAITLIST"
}

type Attendance = {
  userId: String;
  status: AttendanceStatus;
  timestamp: String;
  eventSlug: String;
};

const collection = "attendance";

export async function getUserAttendance(
  userId: string
): Promise<FirebaseResult<Attendance>> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl.where("userId", "==", userId).get();
  return results;
}

export async function getUserEventAttendance(
  userId: string,
  eventSlug: string
): Promise<FirebaseResult<Attendance>> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl
    .where("userId", "==", userId)
    .where("eventSlug", "==", eventSlug)
    .get();
  return results;
}

export async function getAttendees(): Promise<
  FirebaseResultItem<Attendance>[]
> {
  const doc = await db.collection(collection).get();
  return doc.docs;
}

export async function getEventAttendees(
  eventSlug: string
): Promise<FirebaseResult<Attendance>[]> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl
    .where("eventSlug", "==", eventSlug)
    .get();
  return results;
}
