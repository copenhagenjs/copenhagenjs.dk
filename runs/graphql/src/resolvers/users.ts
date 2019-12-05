import { getUsers, searchUser, User } from "../models/user.js";

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

export const user = async (root, args, context): Promise<User | null> => {
  if (
    context.user &&
    context.user.level &&
    context.user.level.includes("organizer")
  ) {
    const users = await searchUser("username", args.username);
    if (users.size === 0) return null;
    const user: User = users.docs[0].data();
    return user;
  } else {
    return null;
  }
};
