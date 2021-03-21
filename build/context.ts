export interface Context {
  firstName: string;
  lastName: string;
  contactInfo: ContactInfo;
  summary: string[];
  skillCategories: SkillCategory[];
  interests: string[];
  experiences: Record<string, Experience>;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  github: string;
  linkedIn: string;
}

interface SkillCategory {
  heading: string;
  skills: string[];
  subcategories: SkillSubcategory[];
}

interface SkillSubcategory {
  heading: string;
  skills: string[];
}

interface Experience {
  jobTitle: string;
  company: string;
  start: string;
  end: string;
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
    summary,
    skillCategories,
    interests,
    experiences,
  };
};

const summary: string[] = [
  "I am an extremely passionate full stack engineer favoring .NET (C# / F#) on the backend and React/Angular on the front end whilst having a broad experience in many other technologies.",
  "I am in love with using functional programming patterns to create intelligent, fast, secure, maintainable, readable, testable and reliable systems.",
  "I am a strong believer in being in a continuous state of learning as technology continues to rapidly evolve.",
  "I also believe that working in a team of people with the same passion is paramount.",
];

const backendSkills: SkillSubcategory = {
  heading: "Backend",
  skills: [
    ".NET Core",
    "C# / F#",
    "NUnit / XUnit",
    "Java",
    "JUnit",
    "OData",
    "Azure",
    "AWS",
  ],
};

const frontendSkills: SkillSubcategory = {
  heading: "Frontend",
  skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "LESS / SASS"],
};

const otherTechnicalSkills: SkillSubcategory = {
  heading: "Other",
  skills: ["GIT", "VIM", "Command Line"],
};

const technicalSkills: SkillCategory = {
  heading: "Technical",
  skills: [],
  subcategories: [backendSkills, frontendSkills, otherTechnicalSkills],
};

const personalSkills: SkillCategory = {
  heading: "Personal",
  skills: [
    "Communication",
    "Fast Learner",
    "Pragmatic",
    "Leading",
    "Honest",
    "Team Work",
    "Transparent",
    "Listening",
  ],
  subcategories: [],
};

const skillCategories: SkillCategory[] = [technicalSkills, personalSkills];

const interests = [
  "Coding",
  "Technology",
  "Chess",
  "Puzzles",
  "Sport",
  "Soccer",
];

const stacktrace: Experience = {
  jobTitle: "Senior Software Engineer",
  company: "Stacktrace",
  start: "AUGUST 2018",
  end: "JANUARY 2021",
};

const experiences: Record<string, Experience> = { stacktrace };
