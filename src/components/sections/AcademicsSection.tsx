// ============================================================
// src/components/sections/AcademicsSection.tsx
// ============================================================
// UNIQUE INTERACTION: 3D Tilt Cards
//
// When you hover a card, it rotates in 3D based on where your
// mouse is on the card. This is the "tilt.js" effect done in
// pure React/Framer Motion — no external library needed.
//
// How 3D Tilt works:
//   1. Track mouse position within the card (onMouseMove)
//   2. Calculate how far from center the mouse is (as -1 to 1)
//   3. Apply rotateX and rotateY CSS transforms
//   4. On mouse leave, spring back to flat (rotateX=0, rotateY=0)
//
// The "perspective" CSS property creates the 3D depth illusion.
// Without it, rotateX/Y just look like skew transforms.
// ============================================================

"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PROGRAMS } from "@/data/siteData";

// ---- TiltCard Component ----
// Wraps each program card with mouse-tracking 3D tilt
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Raw mouse position values (no smoothing)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring smoothing — card doesn't snap instantly, it eases
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 300,
    damping: 30,
  });
  // Subtle scale up on hover
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Normalize to -0.5 → 0.5 range
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    // Spring back to flat
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  }

  function handleMouseEnter() {
    scale.set(1.04);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        scale,
        // perspective is what makes rotateX/Y look truly 3D
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {/* Inner content is pushed "forward" in 3D space */}
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function AcademicsSection() {
  return (
    <SectionWrapper id="academics">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-jade" />
              <span className="text-jade text-sm font-semibold tracking-[0.2em] uppercase">
                Academics
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-pearl leading-tight">
              Programs for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-jade to-champagne">
                Every Stage
              </span>
            </h2>
          </div>
          <p className="text-muted max-w-xs text-sm leading-relaxed">
            From nurturing young minds to launching confident leaders — our
            curriculum grows with your child.
          </p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROGRAMS.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
            >
              <TiltCard
                className={`
                  relative overflow-hidden rounded-3xl p-7 cursor-default h-full
                  border border-border
                  bg-gradient-to-br ${program.color}
                `}
              >
                {/* Glowing orb behind the icon */}
                <div
                  className="absolute top-4 right-4 w-24 h-24 rounded-full blur-2xl opacity-30"
                  style={{ backgroundColor: program.accent }}
                />

                {/* Icon */}
                <span className="text-5xl mb-5 block relative z-10">
                  {program.icon}
                </span>

                {/* Grade badge */}
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 relative z-10"
                  style={{
                    backgroundColor: `${program.accent}25`,
                    color: program.accent,
                    border: `1px solid ${program.accent}40`,
                  }}
                >
                  {program.subtitle}
                </span>

                <h3 className="text-xl font-black text-pearl mb-3 relative z-10">
                  {program.title}
                </h3>

                <p className="text-sm text-muted leading-relaxed relative z-10">
                  {program.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50"
                  style={{
                    background: `linear-gradient(to right, transparent, ${program.accent}, transparent)`,
                  }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <motion.a
            href="#admissions"
            id="academics-cta"
            className="inline-flex items-center gap-3 border border-champagne/30 text-champagne hover:bg-champagne/10 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            Enquire About Admissions →
          </motion.a>
        </div>
      </div>
    </SectionWrapper>
  );
}
