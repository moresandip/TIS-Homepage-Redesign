// ============================================================
// src/components/animation/ScrollProgressBar.tsx
// ============================================================
// Feature A: Scroll Progress Bar
// A thin red bar fixed at the very top of the viewport that
// grows from left to right as the user scrolls down the page.
//
// Implementation details:
//   - Uses our custom useScrollProgress hook (0 → 1)
//   - Multiplies by 100 to convert to percentage (0% → 100%)
//   - Framer Motion's motion.div animates the width change smoothly
//   - "scaleX" via width % is preferred over transform for clarity
//
// Why fixed positioning?
//   - It stays visible no matter how far the user scrolls
//   - z-[9999] keeps it above all other elements (navbar, modals, etc.)
// ============================================================

"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useScrollProgress";

export default function ScrollProgressBar() {
  // Get the 0–1 progress value from our custom hook
  const progress = useScrollProgress();

  return (
    // Outer container: full width, fixed at top, very thin height
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent">
      {/* The actual progress bar — width is animated by Framer Motion */}
      <motion.div
        className="h-full bg-gradient-to-r from-tis-red via-tis-gold to-tis-teal origin-left"
        // animate watches the 'width' property and transitions smoothly
        animate={{ width: `${progress * 100}%` }}
        // Spring config: stiffness = how snappy, damping = how much it settles
        transition={{ ease: "easeOut", duration: 0.1 }}
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
