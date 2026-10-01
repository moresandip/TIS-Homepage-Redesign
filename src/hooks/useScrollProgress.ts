// ============================================================
// src/hooks/useScrollProgress.ts
// ============================================================
// Custom hook that calculates how far the user has scrolled
// down the page as a value between 0 (top) and 1 (bottom).
//
// Why a custom hook?
//   - Keeps the scroll logic in one place (DRY principle)
//   - Any component can consume this without re-implementing it
//   - The hook manages its own event listener cleanup (no memory leaks)
//
// How it works:
//   scrollY          = how many pixels the user has scrolled
//   scrollHeight     = total height of the document
//   innerHeight      = height of the visible viewport window
//   scrollableDistance = scrollHeight - innerHeight  (max you can scroll)
//   progress         = scrollY / scrollableDistance  → 0 to 1
// ============================================================

"use client"; // This hook uses browser APIs (window), so it must run on the client

import { useState, useEffect } from "react";

export function useScrollProgress(): number {
  // State stores the current progress value (0 to 1)
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // This function runs every time the user scrolls
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;

      // Guard against division by zero on short pages
      if (scrollableDistance === 0) {
        setProgress(0);
        return;
      }

      // Clamp between 0 and 1 using Math.min/max for safety
      const calculatedProgress = Math.min(
        Math.max(scrollY / scrollableDistance, 0),
        1
      );

      setProgress(calculatedProgress);
    };

    // Attach listener — { passive: true } tells the browser we won't
    // call preventDefault(), allowing scroll performance optimisations
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup: remove the listener when the component unmounts
    // Without this, the listener keeps running even after nav away → memory leak
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty array = run this effect only once (on mount)

  return progress;
}
