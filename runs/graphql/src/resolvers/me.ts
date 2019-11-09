import { getUser, User } from "../models/user";

export const me = async (parent, args, context) => {
  const doc = await getUser(context.token.user_id);
  if (!doc.exists) {
    throw Error("No such user!");
  }
  return doc.data();
};
