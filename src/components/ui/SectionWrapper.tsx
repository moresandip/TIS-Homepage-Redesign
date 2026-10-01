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
    // motion.section = a regular <section> element with Framer Motion powers
    <motion.section
      id={id}
      // Scroll-triggered reveal animation (Feature B implementation base)
      initial={{ opacity: 0, y: 40 }}       // Start: invisible, 40px below
      whileInView={{ opacity: 1, y: 0 }}    // End: visible, in normal position
      viewport={{ once: true, margin: "-80px" }} // Trigger 80px before visible
      transition={{
        duration: 0.5,    // 0.5s matches the 0.3–0.6s rule from the brief
        ease: "easeOut",  // Ease out = fast start, slow finish (natural feel)
      }}
      className={`
        ${noPadding ? "" : "py-16 md:py-24"}
        ${className}
      `}
    >
      {/* Inner div centers content and limits max width on large screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}
