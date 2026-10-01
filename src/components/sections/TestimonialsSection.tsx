// ============================================================
// src/components/sections/TestimonialsSection.tsx
// ============================================================
// Social proof section — shows quotes from parents and alumni.
// "Social proof" is a UX principle: people trust a school more
// when they see real testimonials from happy parents/students.
//
// Layout: 3 cards in a row on desktop, single column on mobile.
// The active/featured card is visually larger and has a red border.
//
// We use a simple JS state to track which card is "active".
// This could be extended to auto-rotate with setInterval if desired.
// ============================================================

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { TESTIMONIALS } from "@/data/siteData";

export default function TestimonialsSection() {
  // Track which testimonial card is currently the "active" / featured one
  const [activeIndex, setActiveIndex] = useState(0);

  // Go to previous testimonial (with wrap-around using modulo)
  const prev = () =>
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  // Go to next testimonial (with wrap-around)
  const next = () =>
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <SectionWrapper id="boarding" className="bg-gray-50 dark:bg-black/20">
      <div className="text-center mb-14">
        <Badge color="gold">Testimonials</Badge>
        <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
          Voices of the TIS Family
        </h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          Hear from parents and alumni who experienced the Tulas difference firsthand.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {TESTIMONIALS.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <motion.div
              key={testimonial.id}
              // Click to make this card active
              onClick={() => setActiveIndex(index)}
              className={`
                relative p-8 rounded-3xl cursor-pointer transition-all duration-300
                ${isActive
                  ? "bg-tis-red text-white shadow-2xl shadow-tis-red/30 scale-105"
                  : "bg-white dark:bg-tis-dark-card text-gray-800 dark:text-white hover:shadow-lg"
                }
              `}
              whileHover={!isActive ? { y: -4 } : {}}
              layout  // AnimateLayout handles smooth size/position transitions
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className={`mb-4 ${isActive ? "text-white/40" : "text-tis-red/30"}`}
              />

              {/* The testimonial quote text */}
              <p
                className={`text-base leading-relaxed mb-6 ${
                  isActive ? "text-white" : "text-gray-600 dark:text-gray-300"
                }`}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-3">
                {/* Avatar circle with initials */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    text-sm font-bold shrink-0
                    ${isActive ? "bg-white text-tis-red" : "bg-tis-red text-white"}
                  `}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm">{testimonial.author}</p>
                  <p
                    className={`text-xs ${
                      isActive ? "text-white/70" : "text-gray-400"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center gap-4">
        <motion.button
          id="testimonial-prev-btn"
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white dark:bg-tis-dark-card border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:border-tis-red hover:text-tis-red transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2.5 bg-tis-red"
                  : "w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <motion.button
          id="testimonial-next-btn"
          onClick={next}
          className="w-10 h-10 rounded-full bg-white dark:bg-tis-dark-card border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-white hover:border-tis-red hover:text-tis-red transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </SectionWrapper>
  );
}
