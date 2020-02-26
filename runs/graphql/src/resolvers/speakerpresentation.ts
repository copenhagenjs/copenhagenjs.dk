import { SpeakerProfilePresentation } from "../models/speakers";
import {
  getPresentationDetails,
  PresentationDetails
} from "../models/presentationdetails";
import { memGetEvents } from "../models/events";

export const SpeakerPresentationDetails = async (
  parent: SpeakerProfilePresentation
): Promise<PresentationDetails[]> => {
  const event = memGetEvents().find(
    event => event.selfLink === parent.selfLink
  );
  if (!event) {
    throw new Error("Did not find event!");
  }
  const details = await getPresentationDetails(event.slug, parent.slug);
  return details
};
