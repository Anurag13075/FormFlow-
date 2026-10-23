import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wispr: {
          cream: "#F8F6EB",
          ivory: "#F2EFE2",
          sand: "#E6E1D1",
          border: "#DCD5C4",
          ink: "#141413",
          "ink-muted": "#54524C",
          stone: "#7D7A73",
          green: "#154032",
          "green-dark": "#0E2B22",
          "green-surface": "#1A4C3C",
          "green-light": "#E5EFE9",
          lavender: "#DDD0F7",
          "lavender-hover": "#C9B6F3",
          blush: "#FCD5E2",
          "blush-text": "#852648",
          orange: "#E25822",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Newsreader", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        tactile: "0 2px 0 0 #141413",
        "tactile-hover": "0 4px 0 0 #141413",
        "tactile-active": "0 1px 0 0 #141413",
        float: "0 20px 40px -8px rgba(20, 20, 19, 0.12), 0 4px 12px rgba(20, 20, 19, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
