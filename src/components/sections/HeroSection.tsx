// ============================================================
// src/components/sections/HeroSection.tsx
// ============================================================
// The first thing visitors see — critical for conversion.
//
// Design decisions:
//   - Full-screen height (100vh) to make maximum impact
//   - Dark gradient overlay so white text stays readable over any image
//   - Two CTAs: primary (Apply Now) and secondary (Learn More)
//   - Animated text entrance (fade + slide up, staggered)
//   - Floating badge showing key stat (CBSE Affiliated)
//   - Scroll-down indicator arrow at the bottom
//
// The background uses a CSS gradient that matches TIS's deep navy/red
// aesthetic since we can't use their proprietary images.
// ============================================================

"use client";

import { motion } from "framer-motion";
import { ArrowDown, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CONTACT } from "@/data/siteData";

// Animation variant objects — defined outside component to avoid re-creation
// on every render (performance best practice)
const containerVariants = {
  hidden: {},  // Container itself doesn't animate — it just orchestrates children
  visible: {
    transition: {
      // staggerChildren: each child starts animating 0.15s after the previous
      staggerChildren: 0.15,
      delayChildren: 0.3,  // Wait 0.3s before starting the stagger sequence
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },   // Start: invisible, 30px below
  visible: {
    opacity: 1,
    y: 0,                           // End: visible, normal position
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ---- Background: Animated Gradient ---- */}
      {/* In production, replace this with a <video> or <Image> of the campus */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-tis-dark to-red-950">
        {/* Decorative blurred orbs for visual depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tis-red/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tis-teal/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-tis-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      {/* ---- Content Layer ---- */}
      {/* motion.div with variants orchestrates the staggered child animations */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge above headline */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <Badge color="teal">
            <Star size={10} className="mr-1" />
            CBSE Affiliated · Est. 2012 · Dehradun
          </Badge>
        </motion.div>

        {/* Main headline — the "Let's do it with Tulas" brand tagline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none mb-4"
        >
          Let&apos;s do{" "}
          <span className="italic font-light text-tis-gold">it</span>
          <br />
          <span className="text-white">with </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-tis-teal via-tis-gold to-tis-red">
            Tulas
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Tulas International School was established in 2012 to impart education
          through{" "}
          <span className="text-tis-gold font-semibold">seamless opportunities</span>.
          A CBSE co-ed boarding school in the heart of Dehradun, Uttarakhand.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button href={CONTACT.admissionUrl} variant="primary" id="hero-apply-btn">
            Apply for Admission →
          </Button>
          <Button href="#about" variant="secondary" id="hero-learn-btn">
            Explore TIS
          </Button>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: "40+", label: "Acre Campus" },
            { value: "16+", label: "Sports" },
            { value: "3000+", label: "Alumni" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-tis-gold">{stat.value}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---- Scroll Indicator ---- */}
      {/* Tells users there's more content below — improves scroll rate */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        {/* Bouncing arrow animation using Framer Motion */}
        <motion.div
          animate={{ y: [0, 8, 0] }}  // Moves down 8px and back, repeatedly
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  );
}
