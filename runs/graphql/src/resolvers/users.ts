import { getUsers, getUser } from "../models/user.js";

export const users = async (root, args, context) => {
  if (
    context.user &&
    context.user.level &&
    context.user.level.includes("organizer")
  ) {
    const users = await getUsers();
    return users.map(user => user.data());
  } else {
    return [];
  }
};

export const user = async (root, args, context) => {
  if (
    context.user &&
    context.user.level &&
    context.user.level.includes("organizer")
  ) {
    const userData = await getUser(args.username);
    if (userData.exists) {
      return userData.data();
    } else {
      return null;
    }
  } else {
    return null;
  }
};
