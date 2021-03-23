import { contactInfo, ContactInfo } from "./contact-info";
import { Experience, experiences } from "./experience";
import { interests } from "./interests";
import { markdown, MarkDownLine } from "./markdown";
import { skillCategories, SkillCategory } from "./skills";

export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  skillCategories: SkillCategory[];
  interests: string[];
  experiences: Record<string, Experience>;
  markdown: Record<string, MarkDownLine[]>;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
    contactInfo,
    skillCategories,
    interests,
    experiences,
    markdown,
  };
};
