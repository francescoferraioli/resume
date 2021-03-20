export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  sections: Sections;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  github: string;
  linkedIn: string;
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
    contactInfo: {
      address: "Brisbane",
      phone: "424938538",
      email: "francesco.ferraioli@outlook.com",
      github: "francescoferraioli",
      linkedIn: "ferraiolifrancesco",
    },
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
