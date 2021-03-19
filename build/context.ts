export interface Context {
  firstName: string;
  lastName: string;
  sections: Sections;
}

interface Sections {
  summary: Section;
  skills: Section;
  interests: Section;
  experience: Section;
}

interface Section {
  name: string;
  icon: string;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
    sections: {
      summary: {
        name: "summary",
        icon: "bars",
      },
      skills: {
        name: "skills",
        icon: "wrench",
      },
      interests: {
        name: "interests",
        icon: "heart",
      },
      experience: {
        name: "experience",
        icon: "briefcase",
      },
    },
  };
};
