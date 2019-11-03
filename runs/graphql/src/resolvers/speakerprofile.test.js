jest.mock(
  "../../data/videos.js",
  () => {
    return {
      videos: [
        ["yyy", "Should not be selected", "Peter Müller"],
        ["xxx", "Should be selected", "Donald Duck"]
      ]
    };
  },
  { virtual: true }
);
import { getSpeakerProfiles } from "../models/speakers.js";
import { speakerProfile, SpeakerProfileVideos } from "./speakerprofile.js";
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

test("SpeakerProfileVideos should be defined", () => {
  expect(SpeakerProfileVideos).toBeDefined();
});

test("SpeakerProfileVideos should return videos", async () => {
  const videos = await SpeakerProfileVideos({ slug: "donald-duck" });
  expect(videos).toEqual([
    {
      name: "Donald Duck",
      slug: "donald-duck-should-be-selected",
      speakerSlug: "donald-duck",
      title: "Should be selected",
      youtubeId: "xxx"
    }
  ]);
});
