export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-button focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
