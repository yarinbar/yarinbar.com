import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import ChapterHeader from "@/components/ui/ChapterHeader";
import type { Education as EducationType } from "@/types/content";

interface EducationProps {
  education: EducationType[];
}

export default function Education({ education }: EducationProps) {
  if (education.length === 0) return null;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-t border-[var(--color-border)] bg-bg-alternate py-16 lg:py-24"
    >
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <ChapterHeader chapter={4} title="My Foundation" id="education-heading" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          {education.map((entry, i) => (
            <motion.article
              key={i}
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              className="rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-5 py-4"
            >
              <h3 className="font-body text-[14px] font-semibold text-[var(--color-text-primary)]">
                {entry.degree}
              </h3>
              <p className="mt-0.5 font-body text-[12px] font-medium text-[var(--color-accent)]">
                {entry.institution} · {entry.period}
              </p>

              {/* Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.details.thesisGrade != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)]">
                    GPA: {entry.details.thesisGrade}
                  </span>
                )}
                {entry.details.advisor && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-bg-tertiary)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
                    {entry.details.advisor}
                  </span>
                )}
                {entry.details.gpa != null && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent-soft)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)]">
                    GPA: {entry.details.gpa}
                  </span>
                )}
                {entry.details.scholarship && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    {entry.details.scholarship}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
