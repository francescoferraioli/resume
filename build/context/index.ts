import { contactInfo, ContactInfo } from "./contact-info";
import { Experience, experiences } from "./experience";
import { markdown } from "./markdown";
import { MarkDownRendered } from "./markdown/renderers";

export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  experiences: Record<string, Experience>;
  markdown: Record<string, MarkDownRendered[]>;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
    contactInfo,
    experiences,
    markdown,
  };
};
