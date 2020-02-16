import {
  FirebaseResult,
  FirebaseResultItem,
  FirebaseDocumentRef,
  db
} from "../services/firebase";
import admin from "firebase-admin";

export type PresentationDetails = {
  timestamp?: number;
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
  const doc: PresentationDetails = {
    timestamp: Date.now(),
    ...input
  }
  const update = await coll.add(doc);
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
