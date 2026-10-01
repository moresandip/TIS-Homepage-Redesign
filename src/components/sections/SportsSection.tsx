// ============================================================
// src/components/sections/SportsSection.tsx
// ============================================================
// Showcases TIS's 16+ sports offering.
// Brand copy from the real TIS website: "Sports? It's not just
// a facility. At Tulas it's the foundation!"
//
// Layout: large heading + pill tag grid.
// The pills scale up on hover — a quick, impactful micro-interaction.
// ============================================================

"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { SPORTS } from "@/data/siteData";

export default function SportsSection() {
  return (
    <SectionWrapper id="sports" className="bg-white dark:bg-tis-dark">

      {/* Two-column layout: headline (left), sports grid (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ---- Left: Headline ---- */}
        <div>
          <Badge color="red">Sports & Activities</Badge>

          {/* Mimicking TIS's real headline */}
          <h2 className="mt-6 text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
            Sports?{" "}
            <span className="text-tis-red">It&apos;s not just a facility.</span>
          </h2>
          <h3 className="mt-2 text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            At Tulas it&apos;s the{" "}
            <span className="text-tis-teal">foundation!</span>
          </h3>

          <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            <span className="font-bold text-tis-gold text-2xl">16+</span> sports
            curated to bring joy and discipline to your life. From archery to
            polo — every passion has a home at TIS.
          </p>

          {/* Highlight boxes */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { label: "Olympic-standard pool", icon: "🏊" },
              { label: "Polo grounds", icon: "🐎" },
              { label: "Indoor sports hall", icon: "🏸" },
              { label: "Archery range", icon: "🏹" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-tis-dark-card"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Right: Sports Pill Grid ---- */}
        <div className="flex flex-wrap gap-3">
          {SPORTS.map((sport, index) => (
            <motion.div
              key={sport}
              // Staggered scroll reveal
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              // Hover: scale up slightly
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-5 py-2.5 rounded-full font-semibold text-sm cursor-default
                border-2 border-tis-red/20 text-tis-red
                hover:bg-tis-red hover:text-white hover:border-tis-red
                dark:text-tis-teal dark:border-tis-teal/30
                dark:hover:bg-tis-teal dark:hover:text-white dark:hover:border-tis-teal
                transition-colors duration-300
              "
            >
              {sport}
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
