import jwt from "jsonwebtoken";
import { context } from "./server.js";
jest.mock("./firebase.js");
const { decodeJWT } = require("./firebase.js");

test("context defined", () => {
  expect(context).toBeDefined();
});

test("context", async () => {
  const officialPayload = {
    iss: "https://securetoken.google.com/copenhagenjsdk",
    aud: "copenhagenjsdk",
    auth_time: 1570668072,
    user_id: "NRlxCTdQIkRMyzVzFygfTQik01i1",
    sub: "NRlxCTdQIkRMyzVzFygfTQik01i1",
    iat: 1570668073,
    exp: 1570671673,
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
  decodeJWT.mockReturnValue(Promise.resolve(jwt.verify(testToken, "test")));
  const value = await context({
    req: {
      headers: {
        authorization: "bearer " + testToken
      }
    }
  });
  expect(value).toEqual({
    user: officialPayload
  });
});
