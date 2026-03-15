import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CVDownloadButton from "@/components/ui/CVDownloadButton";
import MobileMenu from "@/components/ui/MobileMenu";

const DESKTOP_NAV_SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

const MOBILE_NAV_SECTIONS = [
  ...DESKTOP_NAV_SECTIONS,
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("");
  const [isPastHero, setIsPastHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsPastHero(window.scrollY > window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const allSections = [...DESKTOP_NAV_SECTIONS, { id: "contact", label: "Contact" }];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -50% 0px", threshold: 0 }
    );

    allSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${
          isPastHero
            ? "border-b border-[var(--color-border)]/50 bg-[var(--color-bg-primary)]/80 shadow-sm backdrop-blur-xl"
            : "bg-[#0c0a09]/60 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-page items-center justify-between px-6 py-3 lg:px-12">
          <a
            href="#hero"
            className={`font-display text-lg tracking-tight transition-colors hover:text-[var(--color-accent)] ${
              isPastHero ? "text-[var(--color-text-primary)]" : "text-[#fafaf9]"
            }`}
          >
            Yarin Bar
          </a>

          {/* Desktop nav */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {DESKTOP_NAV_SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={activeSection === id ? "true" : undefined}
                className={`relative rounded-lg px-3 py-1.5 font-body text-sm transition-all duration-200 ${
                  activeSection === id
                    ? "text-[var(--color-accent)]"
                    : isPastHero
                      ? "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] hover:text-[var(--color-text-primary)]"
                      : "text-[#d6d3d1] hover:text-[#fafaf9]"
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[var(--color-accent)]" />
                )}
              </a>
            ))}
            <div className={`ml-3 flex items-center gap-2 border-l pl-3 ${
              isPastHero ? "border-[var(--color-border)]" : "border-[#292524]"
            }`}>
              <ThemeToggle />
              <CVDownloadButton variant="nav" />
            </div>
          </nav>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-bg-tertiary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isPastHero ? "text-[var(--color-text-primary)]" : "text-[#fafaf9]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        sections={MOBILE_NAV_SECTIONS}
        activeSection={activeSection}
      />
    </>
  );
}
