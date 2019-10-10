jest.mock("../firebase.js");
import { getUser } from "../firebase.js";
import { me } from "./me.js";

test("me to be defined", () => {
  expect(me).toBeDefined();
});

test("me to return", async () => {
  const fakeUser = {
    name: "Ada Lovelace",
    githubId: "adalovelace"
  };
  getUser.mockReturnValue(
    Promise.resolve({
      exists: true,
      data: () => fakeUser
    })
  );
  const user = await me({}, {}, { user: { user_id: "fake" } });
  expect(user).toEqual(fakeUser);
  expect(getUser).lastCalledWith("fake");
});
