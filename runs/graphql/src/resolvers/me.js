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

export const me = async (userId = "alovelace") => {
  const doc = await getUser(userId);
  if (!doc.exists) {
    throw Error("No such user!");
  }
  return doc.data();
};
