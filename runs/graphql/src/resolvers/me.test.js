import { me } from "./me.js";

test("me to be defined", () => {
  expect(me).toBeDefined();
});

test("me to return", async () => {
  const user = await me();
  expect(user).toEqual({
    name: "Ada Lovelace",
    githubId: "adalovelace"
  });
});
