import { motion } from "framer-motion";
import { fadeInUp, dotScaleIn } from "@/lib/motion";
import ChapterHeader from "@/components/ui/ChapterHeader";
import type { Experience as ExperienceType } from "@/types/content";

interface ExperienceProps {
  experience: ExperienceType[];
}

const recentOrgs = ["Amazon AWS", "cathAlert", "kollit.ai"];

function isRecent(org: string) {
  return recentOrgs.some((r) => org.toLowerCase().includes(r.toLowerCase()));
}

export default function Experience({ experience }: ExperienceProps) {
  if (experience.length === 0) return null;

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="border-t border-[var(--color-border)] bg-[var(--color-bg-primary)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <ChapterHeader chapter={3} title="My Journey" id="experience-heading" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative ml-3"
        >
          {/* Vertical timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-border)]" />

          {experience.map((entry, i) => {
            const recent = isRecent(entry.organization);
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                transition={{ duration: 0.4 }}
                className="relative mb-7 pl-8 last:mb-0"
              >
                {/* Timeline dot */}
                <motion.div
                  variants={dotScaleIn}
                  className={`absolute left-0 top-1.5 h-[10px] w-[10px] -translate-x-1/2 rounded-full border-2 border-[var(--color-bg-primary)] ${
                    recent ? "bg-[#2563eb]" : "bg-[#57534e]"
                  }`}
                />

                {/* Entry content */}
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <h3 className="font-body text-[14px] font-semibold text-[var(--color-text-primary)]">
                    {entry.title}
                  </h3>
                  <span className="shrink-0 font-body text-[12px] tabular-nums text-[var(--color-text-muted)]">
                    {entry.period}
                  </span>
                </div>

                {entry.role && (
                  <p className="font-body text-[12px] font-medium text-[var(--color-accent)]">
                    {entry.role}
                  </p>
                )}
                {!entry.role && (
                  <p className="font-body text-[12px] font-medium text-[var(--color-accent)]">
                    {entry.organization}
                  </p>
                )}

                <p className="mt-1 font-body text-[12px] leading-[1.6] text-[var(--color-text-secondary)]">
                  {entry.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
