import fs from "fs";
import path from "path";
import type {
  Profile,
  Publication,
  Experience,
  Project,
  Education,
} from "@/types/content";

const contentDir = path.join(process.cwd(), "content");

function loadJSON<T>(filename: string): T {
  const filePath = path.join(contentDir, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export const getProfile = () => loadJSON<Profile>("profile.json");
export const getPublications = () =>
  loadJSON<Publication[]>("publications.json");
export const getExperience = () => loadJSON<Experience[]>("experience.json");
export const getProjects = () => loadJSON<Project[]>("projects.json");
export const getEducation = () => loadJSON<Education[]>("education.json");
