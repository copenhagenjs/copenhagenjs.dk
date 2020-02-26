import { presentation } from "./presentation";

jest.mock("../models/speakers");
import { getSpeakerProfile } from "../models/speakers";
const mockedGetSpeakerProfile = getSpeakerProfile as jest.MockedFunction<
  typeof getSpeakerProfile
>;
jest.mock("../models/events");
import { memGetSingleEvent } from "../models/events";
const mockedMemGetSingleEvent = memGetSingleEvent as jest.MockedFunction<
  typeof memGetSingleEvent
>;

test("presentation defined", () => {
  expect(presentation).toBeDefined();
});

test("given a slug return a presentation", () => {
  const nameslug = "donald-duck";
  const name = "Donal Duck";
  const eventslug = "2020-01-01-jan";
  const titleslug = "my-favorite-tech";
  const title = "My favorite Tech";
  const selfLink = "http://example.com";

  mockedMemGetSingleEvent.mockReturnValueOnce({
    slug: eventslug,
    date: new Date(),
    presentations: [
      {
        name,
        title
      }
    ]
  });

  mockedGetSpeakerProfile.mockReturnValueOnce({
    name,
    slug: nameslug,
    presentationsCount: 1,
    presentations: [
      {
        title,
        selfLink,
        slug: titleslug
      }
    ]
  });

  expect(
    presentation(
      {},
      {
        eventslug,
        titleslug
      }
    )
  ).toEqual({
    title
  });
});
