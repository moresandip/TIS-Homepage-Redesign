// ============================================================
// src/hooks/useTheme.ts
// ============================================================
// Custom hook that manages dark/light theme state.
//
// Strategy:
//   1. On first load, check localStorage for a saved preference
//   2. If none saved, use the OS preference via prefers-color-scheme
//   3. Toggle adds/removes 'dark' class on the <html> element
//      (Tailwind's darkMode: "class" strategy reads this class)
//   4. Save the preference to localStorage so it persists across visits
//
// Why localStorage and not cookies?
//   - localStorage is simpler for client-only preferences
//   - No server round-trip needed for theme data
// ============================================================

"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: read saved preference or OS preference
  useEffect(() => {
    const saved = localStorage.getItem("tis-theme") as Theme | null;
    const osPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Priority: saved preference > OS preference > default (light)
    const initial: Theme = saved ?? (osPrefersDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  // Helper: applies the class to <html> and saves to localStorage
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement; // this is the <html> element
    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("tis-theme", newTheme);
  };

  // Toggle function — called when user clicks the theme switcher button
  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
}
