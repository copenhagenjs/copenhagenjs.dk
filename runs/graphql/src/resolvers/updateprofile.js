import { updateUser } from "../firebase.js";

export const updateProfile = async (parent, arg) => {
  const data = await updateUser("alovelace", arg.input);
  return arg.input;
};
