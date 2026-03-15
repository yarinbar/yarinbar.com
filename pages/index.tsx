import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Layout from "@/components/layout/Layout";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import ContactSection from "@/components/sections/ContactSection";
import CVDownloadButton from "@/components/ui/CVDownloadButton";
import {
  getProfile,
  getPublications,
  getExperience,
  getProjects,
  getEducation,
} from "@/lib/content";
import type {
  Profile,
  Publication,
  Experience as ExperienceType,
  Project,
  Education as EducationType,
} from "@/types/content";

interface HomePageProps {
  profile: Profile;
  publications: Publication[];
  experience: ExperienceType[];
  projects: Project[];
  education: EducationType[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {
      profile: getProfile(),
      publications: getPublications(),
      experience: getExperience(),
      projects: getProjects(),
      education: getEducation(),
    },
  };
};

export default function Home({
  profile,
  publications,
  experience,
  projects,
  education,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <Hero profile={profile} />

      {/* Gradient separator: hero → projects */}
      <div
        className="h-1"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(37,99,235,0.2), transparent)",
        }}
      />

      <Projects projects={projects} />
      <Publications publications={publications} />
      <Experience experience={experience} />
      <Education education={education} />
      <ContactSection profile={profile} />
      <CVDownloadButton variant="fab" />
    </Layout>
  );
}
