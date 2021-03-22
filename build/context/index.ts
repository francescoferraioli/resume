import { contactInfo, ContactInfo } from "./contact-info";
import { Experience, experiences } from "./experience";
import { interests } from "./interests";
import { markdown } from "./markdown";
import { skillCategories, SkillCategory } from "./skills";
import { summary } from "./summary";

export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  summary: string[];
  skillCategories: SkillCategory[];
  interests: string[];
  experiences: Record<string, Experience>;
  markdown: Record<string, string[]>;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
    contactInfo,
    summary,
    skillCategories,
    interests,
    experiences,
    markdown,
  };
};