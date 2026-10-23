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
        flow: {
          cream: "#FAF8F5",
          ivory: "#F3EFE6",
          sand: "#E8E2D5",
          border: "#DCD4C4",
          "border-dark": "#2A2A28",
          ink: "#141413",
          "ink-muted": "#5A5751",
          stone: "#8A867D",
          green: "#17382B",
          "green-hover": "#214C3B",
          "green-light": "#E9F1EC",
          "green-accent": "#2E7D32",
          amber: "#D97706",
          "amber-light": "#FEF3C7",
          lilac: "#F0ECF5",
          "lilac-text": "#5E4B77",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        tactile: "0 2px 0 0 rgba(20, 20, 19, 0.08), 0 4px 12px rgba(20, 20, 19, 0.04)",
        "tactile-hover": "0 3px 0 0 rgba(20, 20, 19, 0.12), 0 8px 20px rgba(20, 20, 19, 0.06)",
        float: "0 12px 36px -4px rgba(20, 20, 19, 0.16), 0 4px 12px rgba(20, 20, 19, 0.08)",
        capsule: "0 8px 30px rgba(20, 20, 19, 0.12), 0 2px 6px rgba(20, 20, 19, 0.06)",
      },
      animation: {
        "wave-bar": "wave 1.2s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        wave: {
          "0%, 100%": { height: "6px" },
          "50%": { height: "24px" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
