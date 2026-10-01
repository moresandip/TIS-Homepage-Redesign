// ============================================================
// src/components/ui/Button.tsx
// ============================================================
// Reusable button component (UI primitive).
//
// Why create this instead of using <button> directly?
//   - Consistency: every button in the app has the same base styles
//   - Variants: one change here updates ALL primary buttons everywhere
//   - Type safety: TypeScript catches wrong prop usage at build time
//
// Variants:
//   "primary"   → filled red button (main CTAs)
//   "secondary" → outlined/ghost button (secondary actions)
//   "teal"      → filled teal button (accent actions)
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "teal";
  href?: string;         // If provided, renders as an anchor tag
  onClick?: () => void;
  className?: string;    // Allow custom classes to extend the component
  id?: string;           // For browser testing / accessibility
  type?: "button" | "submit" | "reset";
}

// Style lookup object — maps variant name to Tailwind classes
// This is called a "variant map" pattern — easy to add new variants
const VARIANT_STYLES: Record<string, string> = {
  primary:
    "bg-tis-red text-white hover:bg-red-700 shadow-lg shadow-tis-red/30",
  secondary:
    "border-2 border-tis-red text-tis-red dark:text-white dark:border-white hover:bg-tis-red hover:text-white",
  teal:
    "bg-tis-teal text-white hover:bg-tis-teal-light shadow-lg shadow-tis-teal/30",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  id,
  type = "button",
}: ButtonProps) {
  // Base styles shared by ALL variants
  const baseStyles =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer";

  const combinedStyles = `${baseStyles} ${VARIANT_STYLES[variant]} ${className}`;

  // If href is provided, use a motion-enhanced anchor (for navigation)
  if (href) {
    return (
      <motion.a
        href={href}
        id={id}
        className={combinedStyles}
        // Framer Motion hover animation
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.a>
    );
  }

  // Otherwise, render a standard motion-enhanced button
  return (
    <motion.button
      type={type}
      id={id}
      onClick={onClick}
      className={combinedStyles}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.button>
  );
}
