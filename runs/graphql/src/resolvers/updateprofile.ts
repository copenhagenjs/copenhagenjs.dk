import { updateUser, searchUser } from "../models/user";

export const updateProfile = async (parent, arg, context) => {
  if (!context.token) {
    throw new Error("Can't update with no user");
  }
  const userInput = arg.input;
  if (userInput.username) {
    const foundUsername = await searchUser("username", userInput.username);
    if (foundUsername.size > 0) {
      throw new Error("Username already exists!");
    }
    if (userInput.username.length < 8) {
      throw new Error(
        "Username already exists, it has to be min. 8 characters!"
      );
    }
  }
  const data = await updateUser(context.token.user_id, userInput);
  return arg.input;
};
