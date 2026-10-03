// ============================================================
// src/components/sections/TestimonialsSection.tsx
// ============================================================
// UNIQUE INTERACTIONS:
//   1. Auto-rotating carousel (every 4 seconds)
//   2. Drag to swipe (Framer Motion drag constraint)
//   3. Keyboard arrow navigation
//   4. Active card expands with smooth layout animation
//   5. Progress bar shows time until next auto-rotate
//
// Pattern: "Featured testimonial" design — one large active card
// + smaller preview cards on the side.
// ============================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { TESTIMONIALS } from "@/data/siteData";

// Star rating component
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-champagne fill-champagne"
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const INTERVAL = 4000; // Auto-rotate every 4 seconds

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % TESTIMONIALS.length);
    setProgress(0);
  }, []);

  const prev = () => {
    setActiveIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setProgress(0);
  };

  // Auto-rotate + progress bar
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress((elapsed / INTERVAL) * 100);
    }, 50);

    const rotateTimer = setTimeout(next, INTERVAL);

    return () => {
      clearInterval(timer);
      clearTimeout(rotateTimer);
    };
  }, [activeIndex, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next]);

  const active = TESTIMONIALS[activeIndex];

  return (
    <SectionWrapper id="boarding">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-champagne/60" />
          <span className="text-champagne text-sm font-semibold tracking-[0.2em] uppercase">
            Testimonials
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ═══ LEFT: Featured Active Card ═══ */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-black text-pearl leading-tight mb-10">
              Voices of the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-champagne to-jade">
                TIS Family
              </span>
            </h2>

            {/* Main featured testimonial */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative bg-surface border border-border rounded-3xl p-8"
              >
                {/* Decorative quote mark */}
                <Quote
                  size={48}
                  className="text-crimson/20 mb-4"
                />

                <StarRating />

                <p className="text-pearl text-lg leading-relaxed mb-8 font-light">
                  &ldquo;{active.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-crimson-gradient flex items-center justify-center text-pearl font-bold text-sm shadow-glow-crimson">
                    {active.avatar}
                  </div>
                  <div>
                    <p className="text-pearl font-bold">{active.author}</p>
                    <p className="text-muted text-sm">{active.role}</p>
                  </div>
                </div>

                {/* Progress bar — shows time until next auto-rotate */}
                <div className="mt-6 h-0.5 bg-border rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-crimson to-champagne rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-4 mt-6">
              {/* Prev / Next buttons */}
              <motion.button
                id="testimonial-prev-btn"
                onClick={prev}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:border-champagne hover:text-champagne transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                ←
              </motion.button>

              {/* Dot indicators — expand on active */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveIndex(i); setProgress(0); }}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`rounded-full transition-all duration-400 ${
                      i === activeIndex
                        ? "w-8 h-2 bg-champagne"
                        : "w-2 h-2 bg-border hover:bg-muted"
                    }`}
                  />
                ))}
              </div>

              <motion.button
                id="testimonial-next-btn"
                onClick={next}
                className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted hover:border-champagne hover:text-champagne transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                →
              </motion.button>

              <span className="text-subtle text-xs ml-2">
                Use ← → keys to navigate
              </span>
            </div>
          </div>

          {/* ═══ RIGHT: Draggable Preview Stack ═══ */}
          {/* Shows all testimonials as small draggable cards */}
          <div className="lg:w-1/2 space-y-3">
            {TESTIMONIALS.map((t, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={t.id}
                  onClick={() => { setActiveIndex(index); setProgress(0); }}
                  className={`
                    relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border
                    ${isActive
                      ? "bg-crimson border-crimson/40 shadow-glow-crimson"
                      : "bg-surface border-border hover:border-champagne/30"
                    }
                  `}
                  whileHover={!isActive ? { x: 8 } : {}}
                  whileTap={{ scale: 0.98 }}
                  layout
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-raised text-champagne"
                      }`}
                    >
                      {t.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-bold text-sm ${
                          isActive ? "text-white" : "text-pearl"
                        }`}
                      >
                        {t.author}
                      </p>
                      <p
                        className={`text-xs mb-2 ${
                          isActive ? "text-white/70" : "text-muted"
                        }`}
                      >
                        {t.role}
                      </p>
                      {/* Show truncated quote */}
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isActive ? "text-white/80" : "text-subtle"
                        }`}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    {/* Active indicator arrow */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white/60 text-lg shrink-0"
                      >
                        ←
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}
