import {
  FirebaseResult,
  FirebaseResultItem,
  FirebaseDocumentRef,
  db
} from "../services/firebase";
import admin from "firebase-admin";

export type PresentationDetails = {
  name?: string;
  title?: string;
  timestamp?: string;
  text?: string;
  link?: string;
};

export type PresentationDetailsInput = {
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
    name: 'kevin',
    title: 'tech',
    text: 'github',
    link: 'http'
  })
}
