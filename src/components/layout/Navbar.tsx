// ============================================================
// src/components/layout/Navbar.tsx
// ============================================================
// The main navigation bar — handles:
//   1. Logo + nav links (desktop)
//   2. Dark/Light theme toggle (AnimatedToggle)
//   3. "Apply Now" CTA button
//   4. Mobile hamburger menu toggle
//   5. Scroll-aware background (transparent → blurred glass on scroll)
//
// Scroll-aware navbar pattern:
//   - On top of page: transparent background (hero image shows through)
//   - After scrolling 50px: glassmorphism effect (backdrop-blur + bg opacity)
//   - This is a very common pattern on premium school/university websites
// ============================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import AnimatedToggle from "@/components/animation/AnimatedToggle";
import { useTheme } from "@/hooks/useTheme";
import { NAV_LINKS, CONTACT } from "@/data/siteData";

export default function Navbar() {
  // Theme state from our custom hook
  const { theme, toggleTheme } = useTheme();

  // Whether the mobile menu drawer is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Whether the user has scrolled past 50px (changes navbar style)
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`
          fixed top-1 left-0 right-0 z-[1000]
          transition-all duration-500
          ${
            hasScrolled
              ? // Glassmorphism: frosted glass effect when scrolled
                "bg-white/80 dark:bg-tis-dark/80 backdrop-blur-md shadow-lg"
              : // Transparent when at the top
                "bg-transparent"
          }
        `}
        // Slide down from above on initial page load
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top info bar — phone number */}
        <div className="bg-tis-red text-white text-xs py-1 px-4 flex justify-center items-center gap-2">
          <Phone size={12} />
          <span>Admissions Helpline: </span>
          <a href={`tel:${CONTACT.phone}`} className="font-semibold hover:underline">
            {CONTACT.phone}
          </a>
        </div>

        {/* Main navbar row */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* ---- Logo ---- */}
            <motion.a
              href="#"
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              {/* Text logo — used when image isn't available */}
              <div className="flex flex-col leading-none">
                <span
                  className={`text-xl font-black tracking-tight ${
                    hasScrolled
                      ? "text-tis-red"
                      : "text-white drop-shadow-lg"
                  }`}
                >
                  TIS
                </span>
                <span
                  className={`text-[10px] font-medium tracking-widest uppercase ${
                    hasScrolled
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-white/80 drop-shadow-md"
                  }`}
                >
                  Tulas International School
                </span>
              </div>
            </motion.a>

            {/* ---- Desktop Nav Links ---- */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                      hover:bg-tis-red/10 hover:text-tis-red
                      ${
                        hasScrolled
                          ? "text-gray-700 dark:text-gray-200"
                          : "text-white drop-shadow-sm"
                      }
                    `}
                    whileHover={{ y: -1 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* ---- Right Side Controls ---- */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <AnimatedToggle
                isDark={theme === "dark"}
                onToggle={toggleTheme}
              />

              {/* Apply Now CTA — hidden on small mobile */}
              <motion.a
                href={CONTACT.admissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="navbar-apply-btn"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-tis-red text-white rounded-full text-sm font-semibold hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Apply Now
              </motion.a>

              {/* Mobile hamburger button */}
              <motion.button
                id="mobile-menu-btn"
                className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className={hasScrolled ? "text-gray-800 dark:text-white" : "text-white"} />
                ) : (
                  <Menu size={24} className={hasScrolled ? "text-gray-800 dark:text-white" : "text-white"} />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ---- Mobile Drawer Menu ---- */}
      {/* AnimatePresence enables exit animations when the menu closes */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[999] bg-tis-dark/95 backdrop-blur-lg flex flex-col pt-20 px-6"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            {/* Mobile nav links — staggered entrance */}
            <ul className="space-y-6">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  // Stagger: each item enters 100ms after the previous one
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    className="text-white text-3xl font-bold hover:text-tis-teal transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Mobile Apply Now */}
            <motion.div
              className="mt-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href={CONTACT.admissionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-tis-red text-white py-4 rounded-2xl text-lg font-bold"
              >
                Apply Now →
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 mt-4 text-tis-teal"
              >
                <Phone size={16} />
                {CONTACT.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
