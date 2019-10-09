import { getUser } from "../firebase.js";

export const me = async (userId = "alovelace") => {
  const doc = await getUser(userId);
  if (!doc.exists) {
    throw Error("No such user!");
  }
  return doc.data();
};
