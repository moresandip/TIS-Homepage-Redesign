// ============================================================
// src/components/sections/AboutSection.tsx
// ============================================================
// The school's story and philosophy section.
// Layout: two-column grid on desktop (text | visual), stacks on mobile.
//
// The "circled keyword" concept is borrowed from the actual TIS website
// where important phrases have a hand-drawn SVG circle around them.
// We recreate this using an underline + glow effect.
// ============================================================

"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";

// Each card in the highlights grid
const HIGHLIGHTS = [
  {
    icon: "🏫",
    title: "Modern Gurukul",
    desc: "Ancient wisdom meets modern education in a residential environment that shapes character.",
  },
  {
    icon: "🌍",
    title: "Global Perspective",
    desc: "International exposure, diverse culture, and world-class facilities on a 40-acre campus.",
  },
  {
    icon: "❤️",
    title: "Holistic Development",
    desc: "Academics, sports, arts, and values — every dimension of a student's life is nurtured.",
  },
  {
    icon: "🏆",
    title: "Proven Results",
    desc: "Consistently 100% CBSE results with toppers going to IITs, NITs, and top universities.",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about" className="bg-white dark:bg-tis-dark">
      {/* Section label */}
      <div className="flex justify-center mb-12">
        <Badge color="red">About TIS</Badge>
      </div>

      {/* Two-column layout: text (left) + highlights grid (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ---- Left: Text Content ---- */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            We feel supported in what we do and{" "}
            {/* Highlighted keyword with gold underline */}
            <span className="relative inline-block text-tis-red">
              nudged further
              <span className="absolute bottom-0 left-0 w-full h-1 bg-tis-gold rounded-full" />
            </span>{" "}
            to do more.
          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
            At Tulas, we believe in bringing out the best in every student —
            whether it&apos;s academics, music, art, or sports. With the right
            support and inspiration, creativity finds its way.
          </p>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
            For us, school isn&apos;t just about lessons, it&apos;s about endless
            opportunities waiting to be explored. Established in 2012 under the
            aegis of Rishabh Educational Trust, TIS offers CBSE-affiliated
            co-educational boarding from Class 4 to 12.
          </p>

          {/* Key facts row */}
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <p className="text-3xl font-black text-tis-red">2012</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Established</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-tis-teal">40+</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Acre Campus</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-tis-gold">Class 4–12</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">All Programs</p>
            </div>
          </div>
        </div>

        {/* ---- Right: Highlights Grid (2×2) ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              key={item.title}
              // Each card has a slightly different delay for a stagger effect
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gray-50 dark:bg-tis-dark-card p-6 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-tis-teal/40 transition-all duration-300 cursor-default"
            >
              <span className="text-3xl mb-3 block">{item.icon}</span>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
