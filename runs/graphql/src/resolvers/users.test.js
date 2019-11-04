jest.mock("../services/firebase.js");
import { users } from "./users.js";
import { getUsers } from "../services/firebase.js";

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
