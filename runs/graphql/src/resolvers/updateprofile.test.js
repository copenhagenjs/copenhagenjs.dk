jest.mock("../services/firebase.js");
import { updateUser } from "../services/firebase.js";
import { updateProfile } from "./updateprofile.js";

test("updateProfile defined", () => {
  expect(updateProfile).toBeDefined();
});

test("updateProfile with user", async () => {
  const userInput = {
    name: "Donald Duck",
    githubId: "donald09"
  };
  updateUser.mockReturnValue(Promise.resolve({}));
  const profile = await updateProfile(
    null,
    { input: userInput },
    { token: { user_id: "donald" } }
  );
  expect(profile).toEqual(userInput);
  expect(updateUser).lastCalledWith("donald", {
    githubId: "donald09",
    name: "Donald Duck"
  });
});

test("reject profileupdate when no user", async () => {
  const userInput = {
    name: "Donald Duck",
    githubId: "donald09"
  };
  await expect(updateProfile(null, { input: userInput }, {})).rejects.toThrow(
    "Can't update with no user"
  );
});
