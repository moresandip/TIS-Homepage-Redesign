import type { Config } from "tailwindcss";

const config: Config = {
  // This tells Tailwind to look at all these file types for class names
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Enable dark mode by adding a 'dark' class on the <html> element
  darkMode: "class",
  theme: {
    extend: {
      // TIS Brand Colors - these are the official school colors
      colors: {
        "tis-red": "#b90124",       // Primary brand red
        "tis-teal": "#60BAB1",      // Accent teal/green
        "tis-teal-light": "#90CCD0", // Light teal for backgrounds
        "tis-gold": "#c09d59",      // Gold accent (used in SVG underlines)
        "tis-dark": "#131313",      // Dark background
        "tis-dark-card": "#1C1C1C", // Dark card surface
      },
      // Custom font families matching TIS branding
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      // Custom animation keyframes for micro-interactions
      keyframes: {
        // Subtle floating effect for hero elements
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        // Gradient background shift
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Marquee scroll for the stats ticker
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        // Pulsing glow for CTAs
        pulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(185, 1, 36, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(185, 1, 36, 0)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        gradientShift: "gradientShift 6s ease infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-glow": "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
