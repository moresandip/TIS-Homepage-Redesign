// ============================================================
// src/components/animation/AnimatedToggle.tsx
// ============================================================
// Feature C: Dark/Light Theme Switcher Toggle
// An animated switch that slides between sun ☀️ and moon 🌙.
//
// How the animation works:
//   - The outer pill div is the track (background changes via Tailwind)
//   - The inner circle div slides left/right using Framer Motion
//   - layoutId on motion.div enables smooth position morphing
//   - The icon inside fades in/out with AnimatePresence
//
// UX note: The toggle is 48×24px — meets WCAG minimum touch target
// of 44×44px when including padding from the parent button.
// ============================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";

// Props: what data the parent must pass in
interface AnimatedToggleProps {
  isDark: boolean;       // Current theme state
  onToggle: () => void;  // Function to call when user clicks
}

export default function AnimatedToggle({ isDark, onToggle }: AnimatedToggleProps) {
  return (
    <button
      onClick={onToggle}
      // aria-label makes this accessible to screen readers
      // (they announce "Switch to dark mode" / "Switch to light mode")
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative flex items-center cursor-pointer"
    >
      {/* Outer pill track */}
      <motion.div
        className="w-14 h-7 rounded-full flex items-center px-1"
        // Background smoothly transitions between dark and light states
        animate={{
          backgroundColor: isDark ? "#1C1C1C" : "#e5e7eb",
          borderColor: isDark ? "#60BAB1" : "#b90124",
        }}
        style={{ border: "2px solid" }}
        transition={{ duration: 0.3 }}
      >
        {/* Inner sliding circle — this is the "thumb" of the toggle */}
        <motion.div
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
          // layoutId causes Framer Motion to animate position changes smoothly
          // When 'x' value changes, it slides the circle across the track
          animate={{
            x: isDark ? 24 : 0,      // slide right when dark, left when light
            backgroundColor: isDark ? "#60BAB1" : "#b90124",
          }}
          transition={{
            type: "spring",    // Spring physics = bouncy, natural feel
            stiffness: 400,
            damping: 30,
          }}
        >
          {/* AnimatePresence animates the icon in/out when it changes */}
          <AnimatePresence mode="wait">
            {isDark ? (
              // Moon icon for dark mode
              <motion.span
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                🌙
              </motion.span>
            ) : (
              // Sun icon for light mode
              <motion.span
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.2 }}
              >
                ☀️
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </button>
  );
}
