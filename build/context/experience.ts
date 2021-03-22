export interface Experience {
  jobTitle: string;
  company: string;
  start: string;
  end: string;
}

const stacktrace: Experience = {
  jobTitle: "Senior Software Engineer",
  company: "Stacktrace",
  start: "AUGUST 2018",
  end: "JANUARY 2021",
};

export const experiences: Record<string, Experience> = { stacktrace };
