// ============================================================
// src/components/sections/AboutSection.tsx
// ============================================================
// UNIQUE DESIGN: Bento Grid Layout
//
// A "bento grid" is a mosaic of cards in different sizes —
// inspired by Apple's product pages and modern SaaS dashboards.
// Cards span different columns/rows for visual variety.
//
// Layout (desktop):
//   [  Large quote card  ] [ Stat card ] [ Icon card ]
//   [ Icon card ] [ Icon card ] [  CTA card  ]
// ============================================================

"use client";

import { motion } from "framer-motion";
import { GraduationCap, Globe, Heart, Trophy, Leaf, BookOpen } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

// Bento grid cards data
const BENTO_CARDS = [
  {
    id: "quote",
    // Large card spans 2 columns
    colSpan: "lg:col-span-2",
    rowSpan: "lg:row-span-1",
    bg: "bg-gradient-to-br from-tis-red to-red-900",
    content: "quote",
  },
  {
    id: "stat",
    colSpan: "lg:col-span-1",
    bg: "bg-white/5 dark:bg-white/5 border border-white/10",
    content: "stat",
  },
  {
    id: "gurukul",
    icon: Leaf,
    title: "Modern Gurukul",
    desc: "Ancient wisdom, modern methods. We nurture the whole child.",
    colSpan: "lg:col-span-1",
    bg: "bg-white/5 dark:bg-white/5 border border-white/10",
    accent: "text-tis-teal",
  },
  {
    id: "global",
    icon: Globe,
    title: "Global Outlook",
    desc: "Preparing students for a connected, borderless world.",
    colSpan: "lg:col-span-1",
    bg: "bg-white/5 dark:bg-white/5 border border-white/10",
    accent: "text-tis-gold",
  },
  {
    id: "holistic",
    icon: Heart,
    title: "Holistic Growth",
    desc: "Academics, sports, arts — a complete human being.",
    colSpan: "lg:col-span-1",
    bg: "bg-white/5 dark:bg-white/5 border border-white/10",
    accent: "text-tis-red",
  },
  {
    id: "cta",
    colSpan: "lg:col-span-2",
    bg: "bg-gradient-to-r from-tis-teal/20 to-tis-gold/10 border border-tis-teal/30",
    content: "cta",
  },
];

export default function AboutSection() {
  return (
    <SectionWrapper id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Label */}
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <BookOpen size={16} className="text-tis-teal" />
          <span className="text-tis-teal text-sm font-semibold tracking-[0.2em] uppercase">
            Our Story
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          className="text-4xl md:text-6xl font-black text-white dark:text-white text-gray-900 mb-12 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Where Students{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tis-teal to-tis-gold">
            Become Leaders
          </span>
        </motion.h2>

        {/* ---- Bento Grid ---- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">

          {/* Card 1: Large Quote */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-br from-tis-red to-red-950 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            {/* Decorative large quote mark */}
            <span className="absolute -top-6 -left-4 text-[12rem] font-black text-white/5 leading-none select-none">
              "
            </span>
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic relative z-10">
              Tulas International School was established to impart education
              through{" "}
              <span className="font-bold not-italic text-tis-gold">
                seamless opportunities
              </span>{" "}
              in an environment that nurtures every child&apos;s potential.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <GraduationCap size={14} className="text-white" />
              </div>
              <span className="text-white/70 text-sm">TIS Philosophy</span>
            </div>
          </motion.div>

          {/* Card 2: Key Stat */}
          <motion.div
            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, borderColor: "rgba(192,157,89,0.4)" }}
          >
            <Trophy size={32} className="text-tis-gold mb-4" />
            <p className="text-5xl font-black text-white">Est.</p>
            <p className="text-6xl font-black text-tis-gold">2012</p>
            <p className="text-white/50 text-xs uppercase tracking-widest mt-2">Founded</p>
          </motion.div>

          {/* Cards 3, 4, 5: Feature cards */}
          {[
            { icon: Leaf, title: "Modern Gurukul", desc: "Ancient wisdom meets modern pedagogy.", color: "text-tis-teal", delay: 0.3 },
            { icon: Globe, title: "Global Outlook", desc: "Students prepared for a borderless world.", color: "text-tis-gold", delay: 0.4 },
            { icon: Heart, title: "Holistic Growth", desc: "Academics, sports, arts — together.", color: "text-tis-red", delay: 0.5 },
          ].map(({ icon: Icon, title, desc, color, delay }) => (
            <motion.div
              key={title}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-end group cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay }}
              whileHover={{ scale: 1.02 }}
            >
              <Icon size={28} className={`${color} mb-4 transition-transform duration-300 group-hover:scale-110`} />
              <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}

          {/* Card 6: CTA (spans 2 cols) */}
          <motion.div
            className="lg:col-span-2 bg-gradient-to-r from-tis-teal/10 to-tis-gold/10 border border-tis-teal/20 rounded-3xl p-8 flex items-center justify-between gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <div>
              <p className="text-white text-xl font-bold mb-1">
                Ready to join the Tulas family?
              </p>
              <p className="text-white/50 text-sm">
                Admissions open for Classes IV – XII
              </p>
            </div>
            <motion.a
              href="#admissions"
              className="flex-shrink-0 bg-white text-tis-dark font-bold text-sm px-6 py-3 rounded-full hover:bg-tis-teal hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Enquire Now →
            </motion.a>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
}
