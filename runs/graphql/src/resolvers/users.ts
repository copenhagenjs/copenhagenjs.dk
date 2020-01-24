import { getUsersFull, searchUser, User, getUserFull } from "../models/user.js";

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
    return await getUserFull(args.username);
  } else {
    return null;
  }
};
