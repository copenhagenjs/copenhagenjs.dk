import { decodeJWT } from "./firebase.js";
import { getUser, User } from "../models/user";

type Token = {
  user_id: string;
};

export type Context = {
  user: User | undefined;
  token: Token | undefined;
};

export const contextHandler = async ({ req }): Promise<Context> => {
  const token = (req.headers.authorization || "").replace("bearer ", "");

  try {
    const decodedToken = await decodeJWT(token);
    if (decodedToken) {
      const user = await getUser(decodedToken.user_id);
      const token = { user_id: decodedToken.user_id };
      const result: Context = { token, user: user.data() };
      return result;
    } else {
      const emptyContext: Context = {
        token: undefined,
        user: undefined
      };
      return emptyContext;
    }
  } catch (e) {
    if (e.code === "auth/argument-error") {
      const emptyContext: Context = {
        token: undefined,
        user: undefined
      };
      return emptyContext;
    }
    console.log(e);
    throw new Error("Could not verify token!");
  }
};
