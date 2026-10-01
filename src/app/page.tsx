// ============================================================
// src/app/page.tsx
// ============================================================
// The HOMEPAGE — the main page component in Next.js App Router.
//
// This is the orchestration layer. Its job is simple:
//   - Import all section components
//   - Arrange them in the correct order
//   - That's it. No logic, no state.
//
// Why keep this file so minimal?
//   This follows the "Container vs. Presentational" component pattern.
//   page.tsx is the "container" — it assembles the puzzle.
//   Each section is "presentational" — it handles its own look and feel.
//   This makes each section independently testable and modifiable.
//
// Note: "use client" is NOT here — this page is a Server Component.
//   The child components that need interactivity use "use client" themselves.
//   This is the recommended Next.js pattern for optimal performance:
//   keep as much as possible on the server, push to client only what needs it.
// ============================================================

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgressBar from "@/components/animation/ScrollProgressBar";
import CustomCursor from "@/components/animation/CustomCursor";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import AcademicsSection from "@/components/sections/AcademicsSection";
import SportsSection from "@/components/sections/SportsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import AdmissionsSection from "@/components/sections/AdmissionsSection";

export default function HomePage() {
  return (
    <>
      {/* ---- Standout Features ---- */}
      {/* Feature A: Scroll Progress Bar — fixed at top of viewport */}
      <ScrollProgressBar />

      {/* Feature B: Custom Cursor — overlays entire page */}
      <CustomCursor />

      {/* ---- Layout ---- */}
      {/* Navbar is fixed-positioned, so it overlays the hero image */}
      <Navbar />

      {/* Main content — semantic <main> for accessibility and SEO */}
      <main>
        {/* 1. Hero: Full-screen animated landing */}
        <HeroSection />

        {/* 2. Stats Ticker: Auto-scrolling school facts bar */}
        <StatsSection />

        {/* 3. About: School story and highlights */}
        <AboutSection />

        {/* 4. Academics: Program cards (Primary → Senior) */}
        <AcademicsSection />

        {/* 5. Sports: 16+ sports showcase */}
        <SportsSection />

        {/* 6. Testimonials: Parent and alumni quotes */}
        <TestimonialsSection />

        {/* 7. Admissions: Enquiry form + contact details */}
        <AdmissionsSection />
      </main>

      {/* Footer with links and social media */}
      <Footer />
    </>
  );
}
