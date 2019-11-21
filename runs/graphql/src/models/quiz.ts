import admin from "firebase-admin";
import { FirebaseResult, FirebaseResultItem, db } from "../services/firebase";

export type Quiz = {
  answer?: string;
};

const collection = "users";

export async function getQuizAttendees(): Promise<
  admin.firestore.QueryDocumentSnapshot[]
> {
  const doc = await db.collection(collection).get();
  return doc.docs;
}

export async function updateQuiz(userId, data: Quiz) {
  const doc = db.collection(collection).doc(userId);
  const update = await doc.set(data, { merge: true });
  return update;
}
