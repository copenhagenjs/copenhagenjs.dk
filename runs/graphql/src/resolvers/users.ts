import { getUsers } from "../models/user.js";

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
