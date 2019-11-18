jest.mock("../models/user.js");
import { updateUser, searchUser } from "../models/user.js";
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

test("reject profileupdate if username already exist", async () => {
  searchUser.mockReturnValue(
    Promise.resolve({
      size: 1
    })
  );
  const userInput = {
    username: "donaldduck"
  };
  await expect(
    updateProfile(null, { input: userInput }, { token: { user_id: "donald" } })
  ).rejects.toThrow("Username already exists!");
});

test("reject profileupdate if username too short", async () => {
  searchUser.mockReturnValue(
    Promise.resolve({
      size: 0
    })
  );
  const userInput = {
    username: "don"
  };
  await expect(
    updateProfile(null, { input: userInput }, { token: { user_id: "donald" } })
  ).rejects.toThrow("Username already exists, it has to be min. 8 characters!");
});
