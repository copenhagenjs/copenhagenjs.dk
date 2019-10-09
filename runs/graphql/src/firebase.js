const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
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
