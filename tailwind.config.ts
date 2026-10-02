import type { Config } from "tailwindcss";

// ============================================================
// tailwind.config.ts — TIS Premium Color System
// ============================================================
//
// PREMIUM PALETTE PHILOSOPHY:
//   Instead of flat colors, we use a layered dark system:
//
//   Background layers (deepest → surface):
//     void    #06060A  → deepest background (like space)
//     base    #0D0D14  → main page background
//     surface #141420  → card backgrounds
//     raised  #1C1C2A  → elevated components
//     border  #252535  → subtle dividers
//
//   Brand colors (refined from original TIS palette):
//     crimson  #C01837  → deeper, richer red (vs flat #b90124)
//     jade     #3AAFA0  → sophisticated teal
//     champagne #D4B483 → warm gold (premium, not gaudy)
//
//   Text hierarchy:
//     pearl    #F2EDE4  → warm off-white (not cold #ffffff)
//     muted    #8888A0  → secondary text
//     subtle   #44445A  → disabled/placeholder
//
// WHY NOT PURE BLACK (#000000)?
//   Pure black looks cheap — premium brands use near-blacks
//   with a slight hue (blue/warm) to add depth and richness.
// ============================================================

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ---- Legacy TIS names (kept for backward compat) ----
        "tis-red":       "#C01837",   // Upgraded: deeper crimson
        "tis-teal":      "#3AAFA0",   // Upgraded: jade green-teal
        "tis-teal-light":"#6DCFC4",
        "tis-gold":      "#D4B483",   // Upgraded: warm champagne gold
        "tis-dark":      "#0D0D14",   // Upgraded: deep midnight
        "tis-dark-card": "#141420",

        // ---- New Premium Layer System ----
        void:    "#06060A",   // Absolute darkest background
        base:    "#0D0D14",   // Main page background
        surface: "#141420",   // Card / panel background
        raised:  "#1C1C2A",   // Elevated components (dropdowns, tooltips)
        border:  "#252535",   // Subtle borders

        // ---- Premium Brand Accent Colors ----
        crimson:    "#C01837",   // Primary CTA, highlights
        "crimson-light": "#E83358",
        "crimson-dark":  "#8A1025",

        jade:       "#3AAFA0",   // Secondary accent
        "jade-light": "#6DCFC4",
        "jade-dark":  "#25756E",

        champagne:  "#D4B483",   // Decorative gold
        "champagne-light": "#EDD9AB",
        "champagne-dark":  "#9C7D50",

        // ---- Text Scale ----
        pearl:  "#F2EDE4",   // Primary text (warm white)
        muted:  "#8888A0",   // Secondary text
        subtle: "#44445A",   // Placeholder / disabled
      },

      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },

      // ---- Box Shadow Presets ----
      boxShadow: {
        "glow-crimson":   "0 0 40px -10px rgba(192, 24, 55, 0.5)",
        "glow-jade":      "0 0 40px -10px rgba(58, 175, 160, 0.4)",
        "glow-champagne": "0 0 40px -10px rgba(212, 180, 131, 0.4)",
        "card":           "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 4px 24px rgba(0,0,0,0.4)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        float:      "float 4s ease-in-out infinite",
        marquee:    "marquee 30s linear infinite",
        shimmer:    "shimmer 3s linear infinite",
        "fade-up":  "fade-up 0.5s ease-out forwards",
      },

      backgroundImage: {
        // Premium gradient used throughout the site
        "premium-radial": "radial-gradient(ellipse at top, #1C1C2A 0%, #06060A 70%)",
        "crimson-gradient": "linear-gradient(135deg, #C01837, #8A1025)",
        "jade-gradient":    "linear-gradient(135deg, #3AAFA0, #25756E)",
        "champagne-gradient": "linear-gradient(135deg, #D4B483, #9C7D50)",
        // Shimmer effect for loading/decorative elements
        "shimmer-gradient": "linear-gradient(90deg, transparent, rgba(212,180,131,0.15), transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
