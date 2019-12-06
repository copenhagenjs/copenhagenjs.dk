jest.mock("../models/user.js");
import { getUser, getUserEmail } from "../models/user.js";
import { me } from "./me.js";

test("me to be defined", () => {
  expect(me).toBeDefined();
});

test("me to return", async () => {
  const fakeUser = {
    name: "Ada Lovelace",
    githubId: "adalovelace"
  };
  const email = "ada@example.com";
  getUser.mockResolvedValue({
    exists: true,
    data: () => fakeUser
  });
  getUserEmail.mockResolvedValue(email);
  const user = await me({}, {}, { token: { user_id: "fake" } });
  expect(getUser).lastCalledWith("fake");
  expect(getUserEmail).toBeCalled();
  expect(user).toEqual({ email, ...fakeUser });
});
