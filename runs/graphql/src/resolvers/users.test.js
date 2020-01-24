jest.mock("../models/user.js");
import { users, user } from "./users.js";
import { getUsersFull, getUserFull } from "../models/user.js";

test("users should be defined", () => {
  expect(users).toBeDefined();
});

test("users fails without being organizer", async () => {
  const data = await users({}, {}, { token: undefined, user: undefined });
  expect(data).toEqual([]);
});

test("users succeeds with being organizer", async () => {
  const user = { name: "Donald Duck" };
  getUsersFull.mockReturnValue(Promise.resolve([user]));
  const data = await users(
    {},
    {},
    { token: undefined, user: { level: ["organizer"] } }
  );
  expect(data).toEqual([user]);
});

test("user should return one user", async () => {
  const fakeUser = {
    name: "Donald Duck"
  };
  getUserFull.mockReturnValue(Promise.resolve(fakeUser));
  const data = await user(
    {},
    { username: "donald-duck" },
    { user: { level: ["organizer"] } }
  );
  expect(data).toEqual({
    name: "Donald Duck"
  });
});
