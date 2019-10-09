jest.mock("./resolvers/me.js");
import { me } from "./resolvers/me.js";
import { resolvers, schema } from "./schema.js";
import { graphql } from "graphql";

test("resolvers to be defined", () => {
  expect(resolvers).toBeDefined();
});

test("resolvers to be defined", () => {
  expect(resolvers.Query.hello()).toBe("Hello world!");
});

test("me query", async () => {
  const user = {
    name: "Ada Lovelace"
  };
  me.mockReturnValue(user);
  const result = await graphql(
    schema,
    `
      {
        me {
          name
        }
      }
    `
  );
  expect(result.data.me).toEqual(user);
});

test("updateProfile mutation", async () => {
  const user = {
    name: "Ada Lovelace codes"
  };
  const result = await graphql(
    schema,
    `
      mutation {
        updateProfile(input: {
          name: "${user.name}"
        }) {
          name
        }
      }
    `
  );
  expect(result.data.updateProfile).toEqual(user);
});
