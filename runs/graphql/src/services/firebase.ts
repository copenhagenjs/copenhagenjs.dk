const admin = require("firebase-admin");

const credential = process.env.FIREBASE_SVC_ACC
  ? admin.credential.cert(JSON.parse(process.env.FIREBASE_SVC_ACC))
  : admin.credential.applicationDefault();

admin.initializeApp({
  credential,
  projectId: "copenhagenjsdk",
  databaseURL: "https://copenhagenjs.firebaseio.com"
});
export { admin };

export let db = admin.firestore();

export interface FirebaseResult<T> {
  size: number;
  docs: FirebaseResultItem<T>[];
}

export interface FirebaseResultItem<T> {
  exists: boolean;
  data: () => T;
}

export interface FirebaseDocumentRef {}

export async function decodeJWT(token) {
  return await admin.auth().verifyIdToken(token);
}
