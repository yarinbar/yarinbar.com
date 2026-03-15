import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "var(--color-bg-primary)",
          secondary: "var(--color-bg-secondary)",
          tertiary: "var(--color-bg-tertiary)",
          alternate: "var(--color-bg-alternate)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        border: "var(--color-border)",
      },
      boxShadow: {
        sm: "0 1px 3px var(--color-shadow)",
        md: "0 4px 12px var(--color-shadow)",
        lg: "0 8px 24px var(--color-shadow)",
      },
      borderRadius: {
        card: "12px",
        badge: "9999px",
        button: "8px",
      },
      spacing: {
        "section-mobile": "96px",
        "section-desktop": "128px",
      },
      transitionDuration: {
        fast: "100ms",
        default: "200ms",
        slow: "400ms",
      },
      zIndex: {
        nav: "50",
        "mobile-menu": "40",
        fab: "30",
        "skip-link": "60",
      },
      maxWidth: {
        content: "1024px",
        page: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
