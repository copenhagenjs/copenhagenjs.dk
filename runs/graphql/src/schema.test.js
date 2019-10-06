import { resolvers } from "./schema.js";

test("resolvers to be defined", () => {
  expect(resolvers).toBeDefined();
});

test("resolvers to be defined", () => {
  expect(resolvers.Query.hello()).toBe("Hello world!");
});
