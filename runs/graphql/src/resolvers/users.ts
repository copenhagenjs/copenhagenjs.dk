import { getUsersFull, searchUser, User } from "../models/user.js";

export const users = async (root, args, context) => {
  if (
    context.user &&
    context.user.level &&
    context.user.level.includes("organizer")
  ) {
    return await getUsersFull();
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
    const userResult = users.docs[0];
    const user: User = userResult.data();
    return { id: userResult.id, ...user };
  } else {
    return null;
  }
};
