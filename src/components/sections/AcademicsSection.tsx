// ============================================================
// src/components/sections/AcademicsSection.tsx
// ============================================================
// Shows the 4 academic programs (Primary, Middle, Secondary, Senior).
// Layout: horizontal card row on desktop, stacked on mobile.
//
// Interaction pattern: hover a card → it lifts up (translateY),
// gains a colored glow shadow, and reveals a description.
// This is the "card reveal on hover" pattern — good for keeping
// the layout clean while still providing detail on demand.
// ============================================================

"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PROGRAMS } from "@/data/siteData";

export default function AcademicsSection() {
  return (
    <SectionWrapper
      id="academics"
      className="bg-gray-50 dark:bg-black/30"
    >
      {/* Section Header */}
      <div className="text-center mb-14">
        <Badge color="teal">Academics</Badge>
        <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
          Programs for Every Stage
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          From nurturing young minds in Primary to launching confident leaders
          in Senior Secondary — our curriculum grows with your child.
        </p>
      </div>

      {/* Cards grid — 2 columns on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROGRAMS.map((program, index) => (
          <motion.div
            key={program.id}
            // Staggered scroll reveal for each card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            // Hover: lift the card upward
            whileHover={{ y: -8 }}
            className={`
              relative overflow-hidden rounded-3xl p-7 border cursor-default
              bg-gradient-to-br ${program.color}
              border-white/10 dark:border-white/5
              hover:shadow-xl transition-shadow duration-300
            `}
            // Dynamic shadow color matching the program accent
            style={{
              "--hover-shadow": `0 20px 40px ${program.accent}30`,
            } as React.CSSProperties}
          >
            {/* Large emoji icon */}
            <span className="text-5xl mb-4 block">{program.icon}</span>

            {/* Accent color tag */}
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
              style={{
                backgroundColor: `${program.accent}20`,
                color: program.accent,
              }}
            >
              {program.subtitle}
            </span>

            <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">
              {program.title}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {program.description}
            </p>

            {/* Decorative background circle */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: program.accent }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <Button href="#admissions" variant="primary" id="academics-cta">
          Enquire About Admissions
        </Button>
      </div>
    </SectionWrapper>
  );
}
