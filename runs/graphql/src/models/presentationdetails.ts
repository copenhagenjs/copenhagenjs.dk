import {
  FirebaseResult,
  FirebaseResultItem,
  FirebaseDocumentRef,
  db
} from "../services/firebase";
import admin from "firebase-admin";

export type PresentationDetails = {
  timestamp?: string;
  userId?: string;
  name?: string;
  title?: string;
  text?: string;
  link?: string;
};

export type PresentationDetailsInput = {
  userId: string;
  name: string;
  title: string;
  text: string;
  link: string;
};

const collection = 'presentationdetails'

export async function addPresentationDetail(
  input: PresentationDetailsInput
): Promise<FirebaseDocumentRef> {
  const coll = db.collection(collection);
  const update = await coll.add({
    timestamp: Date.now().toString(),
    ...input
  });
  return update;
}

if(require.main === module) {
  addPresentationDetail({
    userId: '123abc',
    name: 'kevin',
    title: 'tech',
    text: 'github',
    link: 'http'
  })
}
