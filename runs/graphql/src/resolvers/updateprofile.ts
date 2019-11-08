import { updateUser } from "../models/user";

export const updateProfile = async (parent, arg, context) => {
  if (!context.token) {
    throw new Error("Can't update with no user");
  }
  const data = await updateUser(context.token.user_id, arg.input);
  return arg.input;
};
