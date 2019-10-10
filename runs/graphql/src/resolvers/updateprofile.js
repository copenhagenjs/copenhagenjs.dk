import { updateUser } from "../firebase.js";

export const updateProfile = async (parent, arg, context) => {
  if (!context.user) {
    throw new Error("Can't update with no user");
  }
  const data = await updateUser(context.user.user_id, arg.input);
  return arg.input;
};
