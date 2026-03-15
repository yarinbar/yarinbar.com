import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import ChapterHeader from "@/components/ui/ChapterHeader";
import type { Project } from "@/types/content";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-[var(--color-bg-primary)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <ChapterHeader chapter={1} title="What I've Built" id="projects-heading" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.article
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              className="group flex flex-col rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Header: name + status */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-body text-[16px] font-semibold text-[var(--color-text-primary)]">
                  {project.name}
                </h3>
                <span className="mt-0.5 flex shrink-0 items-center gap-1.5 text-[9px] font-semibold uppercase">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      project.status === "live"
                        ? "bg-[#22c55e]"
                        : "bg-[#a8a29e]"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={
                      project.status === "live"
                        ? "text-[#22c55e]"
                        : "text-[var(--color-text-muted)]"
                    }
                  >
                    {project.status === "live" ? "Live" : "Archived"}
                  </span>
                </span>
              </div>

              {/* Description */}
              <p className="mt-2 flex-1 font-body text-[12px] leading-[1.6] text-[var(--color-text-secondary)]">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[var(--color-bg-tertiary)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action link */}
              {project.url && project.status === "live" && (
                <div className="mt-3 border-t border-[var(--color-border)] pt-3">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.name} (opens in new tab)`}
                    className="inline-flex items-center gap-1 text-[12px] font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                  >
                    Visit project →
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
