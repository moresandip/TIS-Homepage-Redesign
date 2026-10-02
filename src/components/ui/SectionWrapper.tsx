// ============================================================
// src/components/ui/SectionWrapper.tsx
// ============================================================
// Reusable layout wrapper for all major page sections.
//
// Problem it solves:
//   Every section needs: consistent padding, max-width centering,
//   and scroll-triggered entrance animation. Without this wrapper,
//   you'd copy-paste those classes into every section (messy, error-prone).
//
// How the scroll animation works:
//   - whileInView: Framer Motion runs the animation when the element
//     enters the user's visible screen area (viewport)
//   - viewport={{ once: true }}: runs the animation ONCE, not every time
//     the element scrolls in/out (better UX, less distracting)
//   - initial: starting state (invisible, shifted down)
//   - whileInView: ending state (fully visible, normal position)
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;            // Anchor ID for smooth scroll navigation
  className?: string;     // Additional classes from parent sections
  noPadding?: boolean;    // Some sections (hero) handle their own padding
}

export default function SectionWrapper({
  children,
  id,
  className = "",
  noPadding = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        ${noPadding ? "" : "py-20 md:py-28"}
        ${className}
      `}
    >
      {children}
    </motion.section>
  );
}
