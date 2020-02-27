import {
  PresentationDetails,
  addPresentationDetail
} from "../models/presentationdetails";
import { Context } from "../services/context";

type PresentationDetailInput = {
  eventslug: string;
  titleslug: string;
  text: string;
  link: string;
};

export const addPresentationDetailMutation = async (
  _parent,
  args,
  context: Context
): Promise<PresentationDetails> => {
  const input: PresentationDetailInput = args.input;
  if (!context.token) {
    throw new Error("User is not authenticated");
  }
  const detail = {
    userId: context.token.user_id,
    eventslug: input.eventslug,
    titleslug: input.titleslug,
    text: input.text,
    link: input.link
  };
  const update = await addPresentationDetail(detail);
  return detail;
};
