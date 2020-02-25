import { SpeakerPresentationDetails } from "./speakerpresentation";

jest.mock("../models/events");
import { memGetEvents } from "../models/events";
const mockedMemGetEvents = memGetEvents as jest.MockedFunction<
  typeof memGetEvents
>;

jest.mock("../models/presentationdetails");
import { getPresentationDetails } from "../models/presentationdetails";
const mockedGetPresentationDetails = getPresentationDetails as jest.MockedFunction<
  typeof getPresentationDetails
>;

test("SpeakerPresentationDetail defined", () => {
  expect(SpeakerPresentationDetails).toBeDefined();
});

test("SpeakerPresentationDetails should return an array of details", async () => {
  const selfLink = "example";
  const slug = "slug";
  const title = "test";
  mockedMemGetEvents.mockReturnValueOnce([
    {
      selfLink,
      slug,
      date: new Date(),
      presentations: []
    }
  ]);
  mockedGetPresentationDetails.mockReturnValueOnce([]);
  const SpeakerPresentation = {
    title,
    selfLink
  };
  const details = await SpeakerPresentationDetails(SpeakerPresentation);
  expect(details).toEqual([]);
  expect(mockedGetPresentationDetails).toBeCalledWith(slug, title);
});
