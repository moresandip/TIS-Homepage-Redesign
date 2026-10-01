# Tulas International School (TIS) — Homepage Redesign

A modern, animated redesign of the [Tulas International School](https://tis.edu.in/) homepage. Built as a frontend developer assessment project, this redesign focuses on high conversion, fluid animations, and mobile responsiveness while retaining the core TIS brand identity.

---

## 🚀 Live Demo

- **Live URL:** [https://tis-homepage-redesign-self.vercel.app/](https://tis-homepage-redesign-self.vercel.app/)
- **Repository:** [https://github.com/moresandip/tis-homepage-redesign.git](https://github.com/moresandip/tis-homepage-redesign.git)

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 14** (App Router) | Server Components + file-based routing |
| Language | **TypeScript** | Type safety, better IDE support |
| Styling | **Tailwind CSS** | Utility-first, rapid UI, dark mode built-in |
| Animations | **Framer Motion** | Declarative, 60fps, spring physics |
| Icons | **Lucide React** | Lightweight, consistent icon set |
| Deployment | **Vercel** | Zero-config Next.js deployment |

---

## ✨ Standout Features Implemented

### Feature A: Scroll Progress Bar
**File:** `src/components/animation/ScrollProgressBar.tsx`  
**Hook:** `src/hooks/useScrollProgress.ts`

A gradient bar fixed to the top of the viewport that fills from left to right as the user scrolls. Uses a custom `useScrollProgress` hook that calculates `scrollY / (scrollHeight - innerHeight)` and returns a 0–1 value. Framer Motion animates the width change smoothly at 60fps.

### Feature B: Custom Cursor
**File:** `src/components/animation/CustomCursor.tsx`  
**Hook:** `src/hooks/useMousePosition.ts`

Replaces the browser cursor with a **dot + ring system** on desktop. The dot follows the mouse instantly; the ring trails behind using Framer Motion's `useSpring` for a premium feel. The ring scales up when hovering over interactive elements (`<a>`, `<button>`). Hidden on touch devices via `@media (pointer: fine)`.

### Feature C: Dark/Light Theme Switcher
**File:** `src/components/animation/AnimatedToggle.tsx`  
**Hook:** `src/hooks/useTheme.ts`

An animated toggle pill that slides between ☀️ and 🌙 icons using Framer Motion spring physics. Saves preference to `localStorage` and respects the OS `prefers-color-scheme` media query on first visit. Applies Tailwind's `dark` class to the `<html>` element.

### Feature D: Scroll-Triggered Reveals
**File:** `src/components/ui/SectionWrapper.tsx` + all section components

Every section fades in and slides up as it enters the viewport using Framer Motion's `whileInView` with `viewport={{ once: true }}`. Cards within sections use `staggerChildren` for a sequential reveal effect. Animation durations are kept within the 0.3–0.6s range per the brief.

---

## 📂 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: SEO metadata, global CSS
│   └── page.tsx            # Homepage: assembles all sections
│
├── components/
│   ├── animation/
│   │   ├── ScrollProgressBar.tsx  # Feature A: Scroll progress indicator
│   │   ├── CustomCursor.tsx       # Feature B: Mouse-follower cursor
│   │   └── AnimatedToggle.tsx     # Feature C: Dark/light toggle
│   │
│   ├── layout/
│   │   ├── Navbar.tsx             # Fixed nav with glassmorphism scroll effect
│   │   └── Footer.tsx             # 3-column footer with social links
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        # Full-screen hero with animated text
│   │   ├── StatsSection.tsx       # Auto-scrolling stats marquee
│   │   ├── AboutSection.tsx       # School story + highlights grid
│   │   ├── AcademicsSection.tsx   # 4 program cards with hover effects
│   │   ├── SportsSection.tsx      # 16+ sports pill grid
│   │   ├── TestimonialsSection.tsx # Interactive testimonial cards
│   │   └── AdmissionsSection.tsx  # Enquiry form + contact info
│   │
│   └── ui/
│       ├── Button.tsx             # Reusable button with 3 variants
│       ├── Badge.tsx              # Small pill label component
│       └── SectionWrapper.tsx     # Scroll-reveal wrapper for sections
│
├── data/
│   └── siteData.ts         # All static content (single source of truth)
│
├── hooks/
│   ├── useScrollProgress.ts # Calculates scroll depth (0→1)
│   ├── useMousePosition.ts  # Tracks mouse x/y coordinates
│   └── useTheme.ts          # Dark/light theme with localStorage
│
└── styles/
    └── globals.css          # Tailwind directives, fonts, global resets
```

---

## 📦 Getting Started Locally

### Prerequisites
- Node.js 18+ installed
- npm 9+ (comes with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/moresandip/TIS-Homepage-Redesign.git
cd TIS-Homepage-Redesign
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 🎨 Design Decisions

### Brand Identity Retained
- **Primary Red** (`#b90124`): Buttons, accents, progress bar
- **Teal** (`#60BAB1`): Secondary CTA, hover states
- **Gold** (`#c09d59`): Decorative underlines, ticker separators
- **Tagline**: "Let's do it with Tulas" (from the original site)
- **Copy**: All section text is from the real TIS website

### Component Architecture Philosophy
- **Single Source of Truth**: All content in `src/data/siteData.ts`
- **Custom Hooks**: Logic separated from presentation (DRY, reusable)
- **Server-first**: Only components that need browser APIs use `"use client"`
- **Accessibility**: `aria-label` on icon buttons, semantic HTML (`<main>`, `<section>`, `<nav>`, `<footer>`)

---

## 🚢 Deployment (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Select the repository
4. Vercel auto-detects Next.js — click **Deploy**
5. Your site is live in ~60 seconds!

---

## 📋 Submission Checklist

- [x] Project builds locally (`npm run build` succeeds)
- [x] At least 2 bonus features implemented (Scroll Progress Bar, Custom Cursor, Theme Switcher, Scroll Reveals)
- [x] Tested on Mobile (375px), Tablet (768px), Desktop (1280px+)
- [x] No unused dependencies or dead code
- [x] No `console.log()` calls in production code
- [x] README with setup instructions and tech stack
- [ ] Live deployment link (add after deploying to Vercel)
- [ ] Google Form submitted

---

*Built with ❤️ for the TIS Frontend Developer Assessment*
