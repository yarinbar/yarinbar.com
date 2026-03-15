import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Profile } from "@/types/content";

interface HeroProps {
  profile: Profile;
}

const socialLinks = [
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    key: "scholar",
    label: "Google Scholar",
    icon: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
  },
  {
    key: "github",
    label: "GitHub",
    icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
];

export default function Hero({ profile }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const headshotY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const linkHref = (key: string) => {
    const map: Record<string, string> = {
      linkedin: profile.links.linkedin,
      scholar: profile.links.scholar,
      github: profile.links.github,
    };
    return map[key] ?? "#";
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label={`About ${profile.name}`}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0c0a09]"
    >
      {/* Radial blue glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Content wrapper with parallax */}
      <motion.div
        style={
          shouldReduce
            ? undefined
            : { y: contentY, opacity: contentOpacity }
        }
        className="relative mx-auto flex w-full max-w-page flex-col items-center gap-8 px-6 py-20 text-center lg:py-0"
      >
        {/* Headshot */}
        <motion.div
          style={shouldReduce ? undefined : { y: headshotY }}
          className="shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-[140px] w-[140px] overflow-hidden rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.4)] ring-2 ring-[#292524] lg:h-[180px] lg:w-[180px]">
            <Image
              src="/images/profile/headshot.jpg"
              alt={`Portrait photo of ${profile.name}`}
              width={400}
              height={400}
              priority
              quality={95}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text content */}
        <motion.div
          className="flex flex-col items-center gap-5"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
            className="font-body text-[11px] font-medium uppercase tracking-[3px] text-[#60a5fa]"
          >
            AI · LLMs · Computer Vision · Test Martingale
          </motion.p>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="font-display text-4xl font-light leading-[1.05] tracking-[-2px] text-[#fafaf9] lg:text-[58px]"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="max-w-[340px] font-body text-[15px] leading-relaxed text-[#a8a29e]"
          >
            I build things that sit at the intersection of research and product.
          </motion.p>

          {/* Social links */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
            className="flex items-center gap-3 pt-2"
          >
            {socialLinks.map((link) => (
              <a
                key={link.key}
                href={linkHref(link.key)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} profile (opens in new tab)`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#292524] text-[#a8a29e] transition-all duration-200 hover:scale-110 hover:border-[#60a5fa] hover:text-[#60a5fa]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d={link.icon} />
                </svg>
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.p
          className="font-body text-[11px] text-[#78716c]"
          animate={shouldReduce ? undefined : { opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to explore ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
