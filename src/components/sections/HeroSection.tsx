// ============================================================
// src/components/sections/HeroSection.tsx
// ============================================================
// UNIQUE DESIGN: Asymmetric split layout
//   LEFT  → Big bold typography + CTAs
//   RIGHT → Animated rotating ring with stats + glowing orb
//
// Key techniques:
//   - Diagonal clip-path divides background into two colors
//   - Animated "orbit ring" around a central stat number
//   - Typewriter-style word cycling for the tagline
//   - Large decorative text behind the heading (z-index trick)
// ============================================================

"use client";

import { motion, useAnimationFrame, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, MapPin, Award, Users } from "lucide-react";
import { CONTACT } from "@/data/siteData";

// Words that cycle in the hero headline
const CYCLING_WORDS = ["Curiosity", "Excellence", "Character", "Purpose"];

// Orbit dots that circle the hero stat ring
const ORBIT_ITEMS = [
  { icon: Award, label: "CBSE", angle: 0 },
  { icon: MapPin, label: "Dehradun", angle: 120 },
  { icon: Users, label: "Co-Ed", angle: 240 },
];

// ---- MagneticButton Component ----
// The button is attracted toward the cursor when the cursor is nearby.
// This is a premium micro-interaction seen on award-winning websites.
// How it works:
//   1. Track mouse position relative to button center
//   2. When cursor is within a certain radius, move the button
//   3. useSpring makes it feel elastic and satisfying
function MagneticButton({ children, href, className, id }: {
  children: React.ReactNode;
  href: string;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Pull toward cursor — max 20px displacement
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  }

  function handleMouseLeave() {
    // Spring back to original position
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      id={id}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  // Parallax mouse tracking for background orbs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalize to -30 → 30 range for parallax shift
    mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
    mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Cycle the word every 2.5 seconds
  const timerRef = useRef(0);
  useAnimationFrame((t) => {
    if (t - timerRef.current > 2500) {
      timerRef.current = t;
      setIsChanging(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        setIsChanging(false);
      }, 300);
    }
  });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
    >
      {/* ---- Background Grid Pattern ---- */}
      {/* Fine dot grid gives a "tech/premium" feel */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4B483 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ---- Diagonal Color Block ---- */}
      {/* Right side of the hero has a deep red background using clip-path */}
      <div
        className="absolute inset-0"
        style={{ 
          clipPath: "polygon(58% 0, 100% 0, 100% 100%, 45% 100%)",
          background: "linear-gradient(160deg, #C01837 0%, #5A0A1A 60%, #06060A 100%)"
        }}
      />

      {/* ---- Large Decorative Letter — parallax with mouse ---- */}
      <motion.div
        className="absolute left-0 top-1/2 -translate-y-1/2 text-[30rem] font-black leading-none select-none pointer-events-none"
        style={{ color: 'rgba(212,180,131,0.03)', x: parallaxX, y: parallaxY }}
      >
        T
      </motion.div>

      {/* ---- Main Content Grid ---- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24">

        {/* ═══ LEFT COLUMN: Text Content ═══ */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Top label */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-12 bg-champagne/60" />
            <span className="text-champagne text-sm font-semibold tracking-[0.2em] uppercase">
              Est. 2012 · Dehradun
            </span>
          </motion.div>

          {/* Main headline with cycling word */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6">
            Building
            <br />
            {/* Cycling word with fade animation */}
            <span
              className="inline-block transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-champagne via-champagne-light to-jade"
              style={{ opacity: isChanging ? 0 : 1, transform: isChanging ? "translateY(10px)" : "translateY(0)" }}
            >
              {CYCLING_WORDS[wordIndex]}
            </span>
            <br />
            <span className="text-white/40 font-light italic text-4xl md:text-6xl">
              with Tulas
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-10">
            A CBSE co-ed boarding school in the heart of Dehradun —
            where students from{" "}
            <span className="text-white font-medium">Class IV to XII</span>{" "}
            discover who they are and who they want to become.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Magnetic button — pulls toward cursor */}
            <MagneticButton
              href={CONTACT.admissionUrl}
              id="hero-apply-btn"
              className="group flex items-center gap-3 bg-crimson hover:bg-crimson-light text-pearl px-8 py-4 rounded-full font-bold text-sm transition-all duration-300 shadow-glow-crimson"
            >
              Apply for Admission
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight size={16} />
              </motion.span>
            </MagneticButton>

            <MagneticButton
              href="#about"
              id="hero-explore-btn"
              className="flex items-center gap-2 border border-border text-muted hover:border-jade hover:text-jade px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300"
            >
              Explore Campus
            </MagneticButton>
          </div>
        </motion.div>

        {/* ═══ RIGHT COLUMN: Animated Ring Visual ═══ */}
        <motion.div
          className="relative flex items-center justify-center h-[420px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Outer slow-spinning ring */}
          <motion.div
            className="absolute w-80 h-80 rounded-full border border-champagne/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {/* Orbit items rotate around the ring */}
            {ORBIT_ITEMS.map(({ icon: Icon, label, angle }) => (
              <div
                key={label}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                  style={{ transform: `translateX(-50%) rotate(-${angle}deg)` }}
                >
                  <div className="w-10 h-10 bg-raised backdrop-blur rounded-full flex items-center justify-center border border-border">
                    <Icon size={16} className="text-champagne" />
                  </div>
                  <span className="text-muted text-xs font-medium">{label}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Middle dashed ring */}
          <div className="absolute w-56 h-56 rounded-full border border-dashed border-champagne/20" />

          {/* Center glowing orb with main stat */}
          <div className="relative w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-glow-crimson" style={{ background: 'linear-gradient(135deg, #C01837, #6A0F1F)' }}>
            {/* Glow pulse effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-crimson/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <p className="text-4xl font-black text-white">40+</p>
            <p className="text-xs text-white/70 uppercase tracking-widest">Acre Campus</p>
          </div>

          {/* Floating stat cards */}
          {[
            { value: "16+", label: "Sports", x: "calc(100% - 20px)", y: "30%" },
            { value: "3000+", label: "Alumni", x: "-20px", y: "60%" },
          ].map(({ value, label, x, y }) => (
            <motion.div
              key={label}
              className="absolute glass-dark rounded-2xl px-4 py-3 text-center"
              style={{ right: x === "calc(100% - 20px)" ? undefined : undefined, left: x === "-20px" ? x : undefined }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: value === "16+" ? 0 : 1.5 }}
            >
              <p className="text-xl font-black text-white">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ---- Bottom Scroll Hint ---- */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-champagne/40" />
        <span className="text-[10px] text-white/30 uppercase tracking-[0.25em]">Scroll</span>
      </motion.div>
    </section>
  );
}
