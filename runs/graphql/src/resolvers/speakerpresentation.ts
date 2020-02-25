import { SpeakerProfilePresentation } from "../models/speakers";
import { getPresentationDetails } from "../models/presentationdetails";
import { memGetEvents } from "../models/events";

export const SpeakerPresentationDetails = async (
  parent: SpeakerProfilePresentation
) => {
  const event = memGetEvents().find(
    event => event.selfLink === parent.selfLink
  );
  if (!event) {
    throw new Error("Did not find event!");
  }
  return getPresentationDetails(event.slug, parent.title);
};
