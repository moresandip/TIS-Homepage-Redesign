// ============================================================
// src/components/sections/StatsSection.tsx
// ============================================================
// Auto-scrolling ticker of school statistics.
// Why a ticker / marquee?
//   - Conveys lots of data points without vertical space
//   - The motion draws the eye without being disruptive
//   - Common on premium school and university websites
//
// Technical note on the duplicate items trick:
//   The STATS array is duplicated (spread twice into one array).
//   The CSS animation scrolls the list left by 50% of its total width.
//   When it finishes, it seamlessly loops because the second half
//   is identical to the first — creating an infinite scroll illusion.
// ============================================================

import { STATS } from "@/data/siteData";

export default function StatsSection() {
  // Duplicate the items for the seamless looping marquee trick
  const doubledStats = [...STATS, ...STATS];

  return (
    <section className="py-4 overflow-hidden border-y border-border" style={{ background: '#0D0D14' }}>
      <div className="relative flex">
        <div className="flex items-center gap-0 animate-marquee">
          {doubledStats.map((stat, index) => (
            <div key={index} className="flex items-center shrink-0">
              <div className="flex items-center gap-3 px-8 py-1">
                <span className="text-xl font-black text-pearl">
                  {stat.value}
                </span>
                <span className="text-muted text-xs uppercase tracking-widest font-medium">
                  {stat.label}
                </span>
              </div>
              {/* Champagne diamond separator */}
              <div className="w-1 h-1 rotate-45 bg-champagne/60 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
