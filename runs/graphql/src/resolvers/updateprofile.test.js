jest.mock("../models/user.js");
import { updateUser, searchUser, getUserEmail } from "../models/user.js";
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
      size: 1,
      docs: [
        {
          id: "otheruser"
        }
      ]
    })
  );
  const userInput = {
    username: "donaldduck"
  };
  await expect(
    updateProfile(null, { input: userInput }, { token: { user_id: "donald" } })
  ).rejects.toThrow("Username already exists!");
});

test("don't reject profileupdate if username is the same", async () => {
  const token = { user_id: "donald" };
  searchUser.mockReturnValue(
    Promise.resolve({
      size: 1,
      docs: [{ id: token.user_id }]
    })
  );
  const email = "test@test.com";
  getUserEmail.mockResolvedValueOnce(email);
  const userInput = {
    username: "donaldduck"
  };
  await expect(
    updateProfile(null, { input: userInput }, { token })
  ).resolves.toEqual({ username: userInput.username, email });
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

test("ensure username contains legal characters", async () => {
  const userInput = {
    username: "Donald Duck"
  };
  updateUser.mockReturnValue(Promise.resolve({}));
  const profile = await updateProfile(
    null,
    { input: userInput },
    { token: { user_id: "donald" } }
  );
  expect(profile).toEqual(userInput);
  expect(updateUser).lastCalledWith("donald", {
    username: "donald-duck"
  });
});
