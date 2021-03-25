import { contactInfo, ContactInfo } from "./contact-info";
import { markdown } from "./markdown";
import { MarkDownRendered } from "./markdown/renderers";

export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  markdown: Record<string, MarkDownRendered[]>;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
    contactInfo,
    markdown,
  };
};
