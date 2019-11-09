import admin from "firebase-admin";
import { FirebaseResult, FirebaseResultItem, db } from "../services/firebase";

export type User = {
  id?: string;
  email?: string;
  name?: string;
  image?: string;
  githubId?: string;
  twitterId?: string;
  instagramId?: string;
  website?: string;
};

export async function getUser(
  userId
): Promise<FirebaseResultItem<User> & admin.firestore.DocumentSnapshot> {
  const doc = await db
    .collection("users")
    .doc(userId)
    .get();
  return doc;
}

export async function getUsers(): Promise<
  admin.firestore.QueryDocumentSnapshot[]
> {
  const doc = await db.collection("users").get();
  return doc.docs;
}

export async function searchUser(
  key,
  value
): Promise<admin.firestore.QuerySnapshot> {
  const usersCol = db.collection("users");
  const results = await usersCol.where(key, "==", value).get();
  return results;
}

export async function searchGhostUser(
  key,
  value
): Promise<admin.firestore.QuerySnapshot> {
  const usersCol = db.collection("ghostusers");
  const results = await usersCol.where(key, "==", value).get();
  return results;
}

export async function updateUser(userId, data) {
  const doc = db.collection("users").doc(userId);
  const update = await doc.set(data, { merge: true });
  return update;
}
