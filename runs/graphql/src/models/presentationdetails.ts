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
  eventslug?: string;
  titleslug?: string;
  text?: string;
  link?: string;
};

export type PresentationDetailsInput = {
  userId: string;
  eventslug: string;
  titleslug: string;
  text: string;
  link: string;
};

const collection = "presentationdetails";

export async function addPresentationDetail(
  input: PresentationDetailsInput
): Promise<FirebaseDocumentRef> {
  const coll = db.collection(collection);
  const doc: PresentationDetails = {
    timestamp: Date.now(),
    ...input
  };
  const update = await coll.add(doc);
  return update;
}

export async function getPresentationDetails(
  eventslug: string,
  titleslug: string
) {
  const pdCol = db.collection(collection);
  const results = await pdCol
    .where("eventslug", "==", eventslug)
    .where("titleslug", "==", titleslug)
    .get();
  const docs: PresentationDetails[] = results.docs.map(i => i.data());
  return docs;
}

if (require.main === module) {
  async function main() {
    try {
      await addPresentationDetail({
        userId: "123abc",
        eventslug: "kevin",
        titleslug: "tech",
        text: "github",
        link: "http"
      });
      const result = await getPresentationDetails("kevin", "tech");
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  main();
}
