import clsx from "clsx";

interface CVDownloadButtonProps {
  variant: "nav" | "fab" | "inline";
  email?: string;
}

export default function CVDownloadButton({
  variant,
  email = "yarinbar1@gmail.com",
}: CVDownloadButtonProps) {
  const mailto = `mailto:${email}?subject=${encodeURIComponent("CV Request – Yarin Bar")}&body=${encodeURIComponent("Hi Yarin,\n\nI'd like to request a copy of your CV.\n\nThank you.")}`;

  return (
    <a
      href={mailto}
      aria-label="Request Yarin Bar's CV via email"
      className={clsx(
        "inline-flex items-center gap-2 font-body font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
        variant === "nav" &&
          "rounded-lg bg-[var(--color-accent)] px-3.5 py-1.5 text-sm text-white shadow-sm hover:bg-[var(--color-accent-hover)] hover:shadow-md",
        variant === "fab" &&
          "fixed bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-lg ring-4 ring-[var(--color-accent)]/20 hover:scale-105 hover:shadow-xl lg:hidden",
        variant === "inline" &&
          "rounded-xl bg-[var(--color-accent)] px-6 py-3 text-white shadow-sm hover:bg-[var(--color-accent-hover)] hover:shadow-md"
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={variant === "fab" ? 22 : 16}
        height={variant === "fab" ? 22 : 16}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      {variant === "nav" && <span>Request CV</span>}
      {variant === "inline" && <span>Request CV</span>}
    </a>
  );
}
