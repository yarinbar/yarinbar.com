# CODE REVIEW REPORT

- Verdict: NEEDS REVISION
- Blockers: 2 | High: 3 | Medium: 4

## Blockers

- `components/sections/Projects.tsx:13-14` -- React Rules of Hooks violation. `useReducedMotion()` is called after an early return (`if (projects.length === 0) return null`). Hooks must be called unconditionally at the top of a component. This will crash in React Strict Mode and produce undefined behavior in production. Fix: move the hook call above the early return:
  ```tsx
  export default function Projects({ projects }: ProjectsProps) {
    const shouldReduce = useReducedMotion();
    if (projects.length === 0) return null;
  ```

- `components/ui/ChapterHeader.tsx` + all section components -- Missing `id` on `<h2>` elements breaks `aria-labelledby`. Four sections (Projects, Publications, Experience, Education) declare `aria-labelledby="<name>-heading"` on their `<section>` elements, but `ChapterHeader` never renders an `id` attribute on its `<h2>`. These are dangling references, which breaks screen reader landmark navigation entirely. Fix: accept an `id` prop in `ChapterHeader` and apply it to both the reduced-motion and animated `<h2>`:
  ```tsx
  interface ChapterHeaderProps {
    chapter: number;
    title: string;
    id?: string;
  }
  // On both h2 elements in ChapterHeader:
  <h2 id={id} className="...">
  ```
  Then pass from each section: `<ChapterHeader id="projects-heading" chapter={1} title="What I've Built" />`.

## High Priority

- `components/sections/ContactSection.tsx:42,57,66,84,104,128` -- Dark mode incompatibility. The contact section uses hardcoded hex colors throughout (`bg-[#0c0a09]`, `text-[#fafaf9]`, `text-[#a8a29e]`, `border-[#292524]`, `bg-[#2563eb]`, `text-[#57534e]`). These happen to match the current dark theme values, making the section a fixed "dark bookend". However, the accent button (`bg-[#2563eb]`) should use `var(--color-accent)` so it adapts if the palette changes. The `hover:border-[#60a5fa]` and `hover:text-[#60a5fa]` on social icons should likewise reference `var(--color-accent)`. If the dark bookend pattern is intentional, add a code comment explaining it, and still switch interactive/accent colors to CSS variables.

- `components/sections/Publications.tsx:39` -- Misleading venue color fallback. Unknown venues fall back to arXiv's amber styling via `venueColors[pub.venue] || venueColors.arXiv`. For a paper at ICML or ICLR, an amber "arXiv-looking" badge is semantically misleading. Use a neutral gray fallback:
  ```tsx
  const defaultColor = { bg: "bg-[#78716c]", text: "text-white" };
  const colors = venueColors[pub.venue] || defaultColor;
  ```

- `components/sections/Experience.tsx:10-14` -- Brittle hardcoded org name matching for timeline dot color. `recentOrgs` uses string `includes()` matching, which breaks if data changes (e.g., "Amazon Web Services" vs "Amazon AWS"). Add a `highlighted` boolean field to the `Experience` type instead, letting data drive presentation rather than component-level string matching.

## Medium Priority

- `components/sections/Projects.tsx:36`, `Publications.tsx:235`, `Experience.tsx:45`, `Education.tsx:33` -- Array index used as React `key` (`key={i}`) in all four sections. If items are ever reordered or filtered, this causes incorrect reconciliation and potential UI bugs. Use stable identifiers: `project.name`, `pub.title`, `entry.title + entry.organization`, `entry.degree + entry.institution`.

- `components/sections/Publications.tsx:93,110` -- Abstract drawer `id` uses array index (`abstract-${index}`). If publications are filtered or reordered, the `aria-controls` / `id` pairing breaks. Use a slugified title or other stable identifier.

- `components/sections/Education.tsx:46` -- `Object.keys(entry.details).length > 0` is imprecise. An object like `{ thesisGrade: undefined }` has keys but no truthy values, rendering an empty details block. Safer check:
  ```tsx
  {Object.values(entry.details).some((v) => v != null) && (
  ```

- `components/sections/Education.tsx:49,69` -- Detail row borders use `border-[var(--color-bg-alternate)]`, a background color token repurposed for borders. This works visually but is confusing for maintainers. Consider `border-[var(--color-border)]` with `opacity-50`, or introduce a `--color-border-subtle` token.

## Good Practices

- `aria-live="polite"` with `sr-only` for BibTeX copy feedback in Publications is correctly implemented.
- `aria-expanded` and `aria-controls` on the abstract toggle button follows the ARIA disclosure pattern.
- External links consistently use `target="_blank" rel="noopener noreferrer"` with descriptive `aria-label` including "(opens in new tab)".
- `useReducedMotion` in Projects.tsx (disabling card offsets) and ChapterHeader (full static fallback) shows good attention to motion accessibility.
- Alternating section backgrounds are cleanly implemented through CSS custom properties, enabling dark mode adaptation.
- The global `prefers-reduced-motion` media query in `globals.css` provides a safety net for all animations.
- Copyright year uses `new Date().getFullYear()` for automatic updates.
- Empty-state guards (`if (x.length === 0) return null`) prevent rendering empty containers.
- Stagger animation patterns are consistent across all sections with appropriate `viewport={{ once: true }}` to prevent re-triggering.
