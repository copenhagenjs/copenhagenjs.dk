import { updateUser, searchUser, User, getUser } from "../models/user";
import { slugify } from "../services/slug";
import { Context } from "../services/context";

type ProfileInput = {
  username?: String;
  name?: String;
  image?: String;
  githubId?: String;
  twitterId?: String;
  instagramId?: String;
  website?: String;
  favorites?: [String];
};

export const updateProfile = async (
  parent,
  arg,
  context: Context
): Promise<User> => {
  if (!context.token) {
    throw new Error("Can't update with no user");
  }
  const userInput: ProfileInput = arg.input;
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

  const email = await getUser(context.token.user_id);
  const user: User = {
    ...arg.input,
    email
  };
  return user;
};
