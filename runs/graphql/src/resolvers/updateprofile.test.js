jest.mock("../firebase.js");
import { updateUser } from "../firebase.js";
import { updateProfile } from "./updateprofile.js";

test("updateProfile defined", () => {
  expect(updateProfile).toBeDefined();
});

test("updateProfile to return", async () => {
  const userInput = {
    name: "Donald Duck",
    githubId: "donald09"
  };
  updateUser.mockReturnValue(Promise.resolve({}));
  const profile = await updateProfile(null, { input: userInput });
  expect(profile).toEqual(userInput);
});
