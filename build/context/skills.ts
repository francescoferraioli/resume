export interface SkillCategory {
  heading: string;
  skills: string[];
  subcategories: SkillSubcategory[];
}

interface SkillSubcategory {
  heading: string;
  skills: string[];
}

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

export const skillCategories: SkillCategory[] = [
  technicalSkills,
  personalSkills,
];
