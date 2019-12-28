import { updateUser, searchUser, User, getUserEmail } from "../models/user";
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
    const foundUsers = await searchUser("username", userInput.username);
    // if there is users already with that username
    if (foundUsers.size > 0) {
      // check if we found the authenticated user
      // if not throw an error
      if (foundUsers.docs[0].id !== context.token.user_id) {
        throw new Error("Username already exists!");
      }
    } else {
      // ensure the username is proper
      userInput.username = slugify(userInput.username);
      if (userInput.username.length < 8) {
        throw new Error(
          "Username already exists, it has to be min. 8 characters!"
        );
      }
    }
  }
  const data = await updateUser(context.token.user_id, userInput);

  const email = await getUserEmail(context.token.user_id);
  const user: User = {
    ...arg.input,
    email
  };
  return user;
};
