// ============================================================
// src/components/animation/CustomCursor.tsx
// ============================================================
// Feature B: Custom Cursor
// Replaces the default browser cursor with two custom elements:
//   1. A small filled dot (follows mouse exactly)
//   2. A larger ring (follows with a spring-physics delay)
//
// The spring delay creates the "trailing" feel — the ring lags
// slightly behind the dot, making the cursor feel premium.
//
// Key technical decisions:
//   - pointer-events-none: our elements can't accidentally block clicks
//   - useSpring from Framer Motion handles the smooth trailing physics
//   - Hidden on touch devices via @media (pointer: coarse) in CSS
//     (touch users don't have a cursor, so this avoids a stuck ring)
//   - translate(-50%, -50%) centers the ring on the actual cursor position
// ============================================================

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  // Track whether the cursor is hovering over a clickable element
  const [isHovering, setIsHovering] = useState(false);

  // Raw mouse coordinates (updated instantly, no smoothing)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed coordinates for the ring (creates the trailing effect)
  // stiffness: how fast the ring chases the cursor (lower = more lag)
  // damping: how much it decelerates (higher = less bounce)
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Update the raw motion values when mouse moves
    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    // Detect when cursor enters/leaves interactive elements
    // querySelectorAll finds all links and buttons on the page
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };
    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* --- Small inner dot (follows mouse exactly, no spring) --- */}
      <motion.div
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{
          x: rawX,  // rawX/rawY have no smoothing — snappy response
          y: rawY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-tis-red"
          // Scale up when hovering over buttons/links
          animate={{
            width: isHovering ? 10 : 6,
            height: isHovering ? 10 : 6,
            opacity: isHovering ? 0.8 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* --- Larger outer ring (follows with spring physics, creates trail) --- */}
      <motion.div
        className="fixed top-0 left-0 z-[99998] pointer-events-none hidden md:block"
        style={{
          x: springX,  // springX/Y are smoothed — creates the trailing lag
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border-2 border-tis-red"
          animate={{
            width: isHovering ? 50 : 32,
            height: isHovering ? 50 : 32,
            opacity: isHovering ? 0.5 : 0.3,
            // Ring scales up and becomes more visible on hover
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        />
      </motion.div>
    </>
  );
}
