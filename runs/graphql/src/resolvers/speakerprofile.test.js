import { getSpeakers } from "../speakers.js";
import { speakerProfile } from "./speakerprofile.js";
import { slugify } from "../slug.js";
jest.mock("../speakers.js");

test("speakerProfile should be defined", () => {
  expect(speakerProfile).toBeDefined();
});

test("speakerProfile should return a speaker", () => {
  getSpeakers.mockReturnValue(
    [
      {
        name: "Donald Duck",
        title: "My first presentations"
      },
      {
        name: "Donald Duck",
        title: "Second presentation"
      }
    ].map(i => ({ ...i, slug: slugify(i.name) }))
  );
  const result = {
    name: "Donald Duck",
    slug: "donald-duck",
    presentations: ["My first presentations", "Second presentation"]
  };
  const args = {
    slug: result.slug
  };
  const speaker = speakerProfile({}, args);
  expect(speaker).toEqual(result);
});
