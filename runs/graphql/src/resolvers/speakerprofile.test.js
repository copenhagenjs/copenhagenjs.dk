import { getSpeakerProfiles } from "../models/speakers.js";
import { speakerProfile } from "./speakerprofile.js";
import { slugify } from "../services/slug.js";
jest.mock("../models/speakers.js");

test("speakerProfile should be defined", () => {
  expect(speakerProfile).toBeDefined();
});

test("speakerProfile should return a speaker", () => {
  getSpeakerProfiles.mockReturnValue([
    {
      slug: "donald-duck"
    },
    {
      slug: "batman"
    }
  ]);
  const result = {
    slug: "donald-duck"
  };
  const args = {
    slug: result.slug
  };
  const speaker = speakerProfile({}, args);
  expect(speaker).toEqual(result);
});
