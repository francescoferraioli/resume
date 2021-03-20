export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  sections: Sections;
  summary: string[];
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
    summary,
  };
};

const summary: string[] = [
  "I am an extremely passionate full stack engineer favoring .NET (C# / F#) on the backend and React/Angular on the front end whilst having a broad experience in many other technologies.",
  "I am in love with using functional programming patterns to create intelligent, fast, secure, maintainable, readable, testable and reliable systems.",
  "I am a strong believer in being in a continuous state of learning as technology continues to rapidly evolve.",
  "I also believe that working in a team of people with the same passion is paramount.",
];
