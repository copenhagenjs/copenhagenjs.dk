import { getUser, getUserEmail, User } from "../models/user";

export const me = async (parent, args, context): Promise<User> => {
  const doc = await getUser(context.token.user_id);
  const data = doc.data();
  const email = await getUserEmail(doc.id);
  return {
    id: doc.id,
    email,
    ...data
  };
};
