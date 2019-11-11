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
  userId?: String;
  status?: AttendanceStatus;
  timestamp?: String;
  eventSlug?: String;
};

const collection = "attendance";

export async function getUserAttendance(
  userId: string
): Promise<admin.firestore.QuerySnapshot> {
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
