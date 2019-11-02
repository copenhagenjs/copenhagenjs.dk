const admin = require("firebase-admin");

const credential = process.env.FIREBASE_SVC_ACC
  ? admin.credential.cert(JSON.parse(process.env.FIREBASE_SVC_ACC))
  : admin.credential.applicationDefault();

admin.initializeApp({
  credential,
  projectId: "copenhagenjsdk",
  databaseURL: "https://copenhagenjs.firebaseio.com"
});
let db = admin.firestore();

async function getUser(userId) {
  const doc = await db
    .collection("users")
    .doc(userId)
    .get();
  return doc;
}

export async function searchUser(key, value) {
  const usersCol = db.collection("users");
  const results = await usersCol.where(key, "==", value).get();
  return results;
}

async function updateUser(userId, data) {
  const doc = db.collection("users").doc(userId);
  const update = await doc.set(data);
  return update;
}

export async function decodeJWT(token) {
  return await admin.auth().verifyIdToken(token);
}

export { admin, db, getUser, updateUser };
