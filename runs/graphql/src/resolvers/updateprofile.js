import { updateUser } from "../firebase.js";

export const updateProfile = async (parent, arg, context) => {
  const data = await updateUser(context.user.user_id, arg.input);
  return arg.input;
};
