jest.mock("../models/user.js");
import { users, user } from "./users.js";
import { getUsers, searchUser } from "../models/user.js";

test("users should be defined", () => {
  expect(users).toBeDefined();
});

test("users fails without being organizer", async () => {
  const data = await users({}, {}, { token: undefined, user: undefined });
  expect(data).toEqual([]);
});

test("users succeeds with being organizer", async () => {
  const user = { name: "Donald Duck" };
  getUsers.mockReturnValue(Promise.resolve([{ data: () => user }]));
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
  searchUser.mockReturnValue(
    Promise.resolve({
      docs: [{ data: () => fakeUser }],
      size: 1
    })
  );
  const data = await user(
    {},
    { username: "donald-duck" },
    { user: { level: ["organizer"] } }
  );
  expect(data).toEqual({
    name: "Donald Duck"
  });
});
