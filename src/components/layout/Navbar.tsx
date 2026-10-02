// ============================================================
// src/components/layout/Navbar.tsx
// ============================================================
// UNIQUE DESIGN: Floating pill-shaped navbar
//
// Instead of a full-width bar, this nav "floats" in the center
// of the screen with rounded corners and glassmorphism.
// This is a modern design trend used by premium brands.
//
// States:
//   - At top: transparent, floats freely
//   - After scroll: frosted glass pill with shadow
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import AnimatedToggle from "@/components/animation/AnimatedToggle";
import { useTheme } from "@/hooks/useTheme";
import { NAV_LINKS, CONTACT } from "@/data/siteData";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ---- Floating Pill Navbar ---- */}
      <motion.header
        className="fixed top-5 left-1/2 z-[1000]"
        style={{ x: "-50%" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <div
          className={`
            flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-500
            ${hasScrolled
              ? "bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/30"
              : "bg-transparent border border-white/10"
            }
          `}
        >
          {/* ---- Logo ---- */}
          <motion.a
            href="#"
            className="flex items-center gap-2 px-3 py-1"
            whileHover={{ scale: 1.05 }}
          >
            {/* Logo circle */}
            <div className="w-7 h-7 rounded-full bg-tis-red flex items-center justify-center">
              <span className="text-white text-xs font-black">T</span>
            </div>
            <span className="text-white font-bold text-sm tracking-tight hidden sm:block">
              Tulas
            </span>
          </motion.a>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20" />

          {/* ---- Desktop Nav Links ---- */}
          <ul className="hidden lg:flex items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="w-px h-5 bg-white/20 hidden lg:block" />

          {/* ---- Right Controls ---- */}
          <div className="flex items-center gap-2 px-1">
            {/* Theme Toggle */}
            <AnimatedToggle isDark={theme === "dark"} onToggle={toggleTheme} />

            {/* Apply CTA — pill inside pill */}
            <motion.a
              href={CONTACT.admissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-apply-btn"
              className="hidden sm:flex items-center gap-1 bg-tis-red hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Now
            </motion.a>

            {/* Mobile hamburger */}
            <motion.button
              id="mobile-menu-btn"
              className="lg:hidden p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ---- Mobile Full-Screen Menu ---- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[999] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Dark blurred backdrop */}
            <div className="absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-2xl" />

            {/* Decorative orb */}
            <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-tis-red/20 rounded-full blur-3xl" />

            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white p-2 z-10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Nav links */}
            <div className="relative z-10 flex flex-col justify-center h-full px-10">
              <div className="h-px w-12 bg-tis-teal mb-8" />
              <ul className="space-y-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      className="text-5xl font-black text-white/30 hover:text-white transition-colors duration-200 block"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href={CONTACT.admissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-flex items-center gap-2 bg-tis-red text-white px-8 py-4 rounded-full font-bold text-sm w-fit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Apply for Admission →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
