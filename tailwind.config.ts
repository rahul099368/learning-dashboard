import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: {
          base: "#080c12",
          surface: "#0d1117",
          raised: "#131920",
          overlay: "#1a2230",
        },
        accent: {
          cyan: "#00d4ff",
          violet: "#7c3aed",
          emerald: "#00ffa3",
          amber: "#ffb700",
          rose: "#ff3b6b",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          muted: "rgba(255,255,255,0.10)",
          glow: "rgba(0,212,255,0.35)",
        },
      },
      backgroundImage: {
        "glow-cyan": "radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "glow-violet": "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "streak": "streak 1.5s ease-out forwards",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        streak: {
          "0%": { width: "0%", opacity: "0" },
          "60%": { opacity: "1" },
          "100%": { opacity: "1" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,212,255,0.25), 0 0 60px rgba(0,212,255,0.10)",
        "glow-violet": "0 0 20px rgba(124,58,237,0.25), 0 0 60px rgba(124,58,237,0.10)",
        "card": "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
