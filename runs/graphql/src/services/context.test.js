jest.mock(
  "../../data/videos.js",
  () => {
    return {
      videos: []
    };
  },
  { virtual: true }
);

import jwt from "jsonwebtoken";
import { contextHandler } from "./context.js";
jest.mock("./firebase.js");
jest.mock("../models/user.js");
const { decodeJWT } = require("./firebase.js");
const { getUser } = require("../models/user.js");

test("contextHandler defined", () => {
  expect(contextHandler).toBeDefined();
});

test("contextHandler - good token", async () => {
  const officialPayload = {
    iss: "https://securetoken.google.com/copenhagenjsdk",
    aud: "copenhagenjsdk",
    auth_time: 1570668072,
    user_id: "NRlxCTdQIkRMyzVzFygfTQik01i1",
    sub: "NRlxCTdQIkRMyzVzFygfTQik01i1",
    iat: 1570668073,
    exp: Date.now() / 1000 + 120,
    email: "kevin.simper@gmail.com",
    email_verified: true,
    firebase: {
      identities: {
        email: ["kevin.simper@gmail.com"]
      },
      sign_in_provider: "password"
    }
  };

  const testToken = jwt.sign(officialPayload, "test");
  decodeJWT.mockReturnValueOnce(Promise.resolve(jwt.verify(testToken, "test")));

  const user = {
    name: "Donald Duck"
  };
  getUser.mockReturnValueOnce({
    data: () => user
  });

  const value = await contextHandler({
    req: {
      headers: {
        authorization: "bearer " + testToken
      }
    }
  });

  expect(getUser).toHaveBeenCalledWith(officialPayload.user_id);
  expect(value).toEqual({
    token: { user_id: officialPayload.user_id },
    user
  });
});

test("contextHandler - no token", async () => {
  const value = await contextHandler({
    req: {
      headers: {}
    }
  });
  expect(value).toEqual({
    user: undefined
  });
});
