export interface Profile {
  name: string;
  tagline: string;
  email: string;
  location: string;
  headshot: string;
  links: {
    linkedin: string;
    scholar: string;
    github: string;
  };
  cvPath: string;
  highlights: string[];
}

export interface Publication {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  arxiv: string;
  abstract: string;
  bibtex: string;
}

export interface Experience {
  title: string;
  role?: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
  type: "work" | "project";
}

export interface Project {
  name: string;
  description: string;
  url?: string | null;
  github?: string;
  screenshot?: string;
  tags: string[];
  status: "live" | "archived";
}

export interface EducationDetails {
  thesisTitle?: string;
  thesisGrade?: number;
  advisor?: string;
  gpa?: number;
  scholarship?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: EducationDetails;
}
