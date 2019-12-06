import {
  FirebaseResult,
  FirebaseResultItem,
  FirebaseDocumentRef,
  db
} from "../services/firebase";
import admin from "firebase-admin";

export enum AttendanceStatus {
  GOING = "GOING",
  NOTGOING = "NOTGOING",
  WAITLIST = "WAITLIST"
}

export type Attendance = {
  userId?: string;
  status?: AttendanceStatus;
  timestamp?: string;
  eventSlug?: string;
};

const collection = "attendance";

export async function getUserAttendance(
  userId: string
): Promise<FirebaseResult<Attendance> & admin.firestore.QuerySnapshot> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl.where("userId", "==", userId).get();
  return results;
}

export async function getUserAttendanceRaw(
  userId: string
): Promise<Attendance[]> {
  const result = await getUserAttendance(userId);
  if (result.size > 0) {
    return result.docs
      .map(d => d.data())
      .filter((x): x is Attendance => x !== undefined);
  } else {
    return [];
  }
}

export async function getUserEventAttendance(
  userId: string,
  eventSlug: string
): Promise<FirebaseResult<Attendance>> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl
    .where("userId", "==", userId)
    .where("eventSlug", "==", eventSlug)
    .orderBy("timestamp")
    .get();
  return results;
}

export async function getAttendees(): Promise<
  admin.firestore.QueryDocumentSnapshot[]
> {
  const doc = await db.collection(collection).get();
  return doc.docs;
}

export async function getEventAttendees(
  eventSlug: string
): Promise<FirebaseResult<Attendance> & admin.firestore.QuerySnapshot> {
  const attendanceColl = db.collection(collection);
  const results = await attendanceColl
    .where("eventSlug", "==", eventSlug)
    .orderBy("timestamp")
    .get();
  return results;
}

export async function updateAttendance(
  input: Attendance
): Promise<FirebaseDocumentRef> {
  const coll = db.collection(collection);
  const update = await coll.add(input);
  return update;
}
