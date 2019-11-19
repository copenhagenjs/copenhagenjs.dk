import { updateUser, searchUser } from "../models/user";
import { slugify } from "../services/slug";
import { Context } from "../services/context";

export const updateProfile = async (parent, arg, context: Context) => {
  if (!context.token) {
    throw new Error("Can't update with no user");
  }
  const userInput = arg.input;
  if (userInput.username) {
    const foundUsername = await searchUser("username", userInput.username);
    if (foundUsername.size > 0) {
      throw new Error("Username already exists!");
    }
    userInput.username = slugify(userInput.username);
    if (userInput.username.length < 8) {
      throw new Error(
        "Username already exists, it has to be min. 8 characters!"
      );
    }
  }
  const data = await updateUser(context.token.user_id, userInput);
  return arg.input;
};
