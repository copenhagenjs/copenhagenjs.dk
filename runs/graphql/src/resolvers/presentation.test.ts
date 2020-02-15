import { presentation } from "./presentation";

jest.mock("../models/speakers");
import { getSpeakerProfile } from "../models/speakers";
const mockedGetSpeakerProfile = getSpeakerProfile as jest.MockedFunction<
  typeof getSpeakerProfile
>;

test("presentation defined", () => {
  expect(presentation).toBeDefined();
});

test("given a slug return a presentation", () => {
  const nameslug = "donald-duck";
  const name = "Donal Duck";
  const titleslug = "my-favorite-tech";
  const title = "My favorite Tech";
  const selfLink = "http://example.com";

  mockedGetSpeakerProfile.mockReturnValueOnce({
    name,
    slug: nameslug,
    presentationsCount: 1,
    presentations: [
      {
        title,
        selfLink
      }
    ]
  });

  expect(
    presentation(
      {},
      {
        nameslug,
        titleslug
      }
    )
  ).toEqual({
    title
  });
});
