import { SpeakerPresentationDetails } from "./speakerpresentation";

jest.mock("../models/events");
import { memGetEvents } from "../models/events";
const mockedMemGetEvents = memGetEvents as jest.MockedFunction<
  typeof memGetEvents
>;

jest.mock("../models/presentationdetails");
import { getPresentationDetails, PresentationDetails } from "../models/presentationdetails";
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
  const details: PresentationDetails[] = [{
    text: 'text',
    link: 'link'
  }]
  mockedGetPresentationDetails.mockResolvedValueOnce(details);
  const SpeakerPresentation = {
    title,
    selfLink
  };
  const resultDetails = await SpeakerPresentationDetails(SpeakerPresentation);
  expect(resultDetails).toEqual(details);
  expect(mockedGetPresentationDetails).toBeCalledWith(slug, title);
});
