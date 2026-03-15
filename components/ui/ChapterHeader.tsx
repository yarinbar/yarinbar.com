import { motion, useReducedMotion } from "framer-motion";

interface ChapterHeaderProps {
  chapter: number;
  title: string;
  id?: string;
}

export default function ChapterHeader({ chapter, title, id }: ChapterHeaderProps) {
  const shouldReduce = useReducedMotion();

  const chapterLabel = `Chapter ${String(chapter).padStart(2, "0")}`;

  if (shouldReduce) {
    return (
      <div className="mb-10">
        <p className="text-[11px] font-body uppercase tracking-[4px] text-text-muted">
          {chapterLabel}
        </p>
        <h2 id={id} className="mt-3 font-display text-[32px] font-normal text-text-primary">
          {title}
        </h2>
        <div className="mt-3 h-[2px] w-10 bg-accent" />
      </div>
    );
  }

  return (
    <motion.div
      className="mb-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.p
        className="text-[11px] font-body uppercase tracking-[4px] text-text-muted"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4 } },
        }}
      >
        {chapterLabel}
      </motion.p>
      <motion.h2
        className="mt-3 font-display text-[32px] font-normal text-text-primary"
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, delay: 0.15 },
          },
        }}
      >
        {title}
      </motion.h2>
      <motion.div
        className="mt-3 h-[2px] w-10 bg-accent"
        variants={{
          hidden: { scaleX: 0, originX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.4, delay: 0.35 },
          },
        }}
      />
    </motion.div>
  );
}
