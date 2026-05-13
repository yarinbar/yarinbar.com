import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import ChapterHeader from "@/components/ui/ChapterHeader";
import type { Publication } from "@/types/content";

interface PublicationsProps {
  publications: Publication[];
}

const venueColors: Record<string, { bg: string; text: string }> = {
  ICML: { bg: "bg-[#0f766e]", text: "text-white" },
  NeurIPS: { bg: "bg-[#dc2626]", text: "text-white" },
  CVPR: { bg: "bg-[#2563eb]", text: "text-white" },
  arXiv: { bg: "bg-amber-500", text: "text-white" },
};

const formatVenueLabel = (pub: Publication) =>
  `${pub.venue} ${String(pub.year).slice(-2)}`;

function PublicationEntry({
  pub,
  index,
}: {
  pub: Publication;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyBibtex = async () => {
    try {
      await navigator.clipboard.writeText(pub.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy BibTeX:", pub.bibtex);
    }
  };

  const colors = venueColors[pub.venue] || venueColors.arXiv;

  return (
    <motion.article
      variants={fadeInUp}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-3 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 transition-colors duration-200 hover:bg-[var(--color-bg-tertiary)] md:flex-row md:items-start md:gap-5 md:p-5"
    >
      {/* Venue badge */}
      <div className="shrink-0">
        <span
          className={`inline-block rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${colors.bg} ${colors.text}`}
        >
          {formatVenueLabel(pub)}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3
          className="font-body text-[15px] font-semibold leading-snug text-[var(--color-text-primary)]"
        >
          {pub.title}
        </h3>

        <p className="mt-1 font-body text-[12px] text-[var(--color-text-muted)]">
          {pub.authors.map((author, j) => (
            <span key={j}>
              {j > 0 && ", "}
              <span
                className={
                  author === "Yarin Bar" || author === "Y. Bar"
                    ? "font-semibold text-[var(--color-accent)]"
                    : ""
                }
              >
                {author}
              </span>
            </span>
          ))}
        </p>

        {/* Abstract drawer */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              id={`abstract-${index}`}
              role="region"
              aria-label="Abstract"
              className="overflow-hidden"
            >
              <p className="mt-3 max-w-[65ch] rounded-lg bg-[var(--color-bg-tertiary)] p-3 font-body text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
                {pub.abstract}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action row */}
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={`abstract-${index}`}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Abstract
          </button>

          {pub.arxiv && (
            <a
              href={`https://arxiv.org/abs/${pub.arxiv}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`arXiv page for ${pub.title} (opens in new tab)`}
              className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent)]/30 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
            >
              arXiv
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          )}

          <button
            onClick={handleCopyBibtex}
            aria-label={`Copy BibTeX citation for ${pub.title}`}
            className="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
          >
            {copied ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-500"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                BibTeX
              </>
            )}
          </button>
        </div>

        <div aria-live="polite" className="sr-only">
          {copied && "BibTeX copied to clipboard"}
        </div>
      </div>
    </motion.article>
  );
}

export default function Publications({ publications }: PublicationsProps) {
  if (publications.length === 0) return null;

  return (
    <section
      id="publications"
      aria-labelledby="publications-heading"
      className="border-t border-[var(--color-border)] bg-bg-alternate py-16 lg:py-24"
    >
      <div className="mx-auto max-w-content px-6 lg:px-12">
        <ChapterHeader chapter={2} title="My Research" id="publications-heading" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-col gap-4"
        >
          {publications.map((pub, i) => (
            <PublicationEntry key={i} pub={pub} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
