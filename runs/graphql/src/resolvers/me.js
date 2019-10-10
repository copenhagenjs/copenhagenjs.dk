import { getUser } from "../firebase.js";

export const me = async (parent, args, context) => {
  const doc = await getUser(context.user.user_id);
  if (!doc.exists) {
    throw Error("No such user!");
  }
  return doc.data();
};
