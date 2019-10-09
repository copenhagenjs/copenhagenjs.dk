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

export { admin, db, getUser };
