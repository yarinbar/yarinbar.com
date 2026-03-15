import { useEffect, useRef } from "react";
import CVDownloadButton from "./CVDownloadButton";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  sections: NavItem[];
  activeSection: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  sections,
  activeSection,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    firstFocusableRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[55] bg-[var(--color-bg-primary)]/95 backdrop-blur-sm lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      ref={menuRef}
    >
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <button
          ref={firstFocusableRef}
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-button text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col items-center gap-6">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={onClose}
                  aria-current={
                    activeSection === section.id ? "true" : undefined
                  }
                  className={`font-body text-xl transition-colors duration-fast hover:text-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                    activeSection === section.id
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-primary)]"
                  }`}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CVDownloadButton variant="nav" />
        </div>
      </div>
    </div>
  );
}
