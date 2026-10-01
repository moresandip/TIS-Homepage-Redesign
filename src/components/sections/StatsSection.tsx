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
    <section className="bg-tis-red py-5 overflow-hidden">
      {/* The outer div clips content that overflows horizontally */}
      <div className="relative flex">
        {/* This div holds all items and runs the marquee animation */}
        <div className="flex items-center gap-0 animate-marquee">
          {doubledStats.map((stat, index) => (
            <div
              key={index}
              // Each item is a flex row with a separator dot between
              className="flex items-center shrink-0"
            >
              {/* Stat block */}
              <div className="flex items-center gap-3 px-8 py-1">
                <span className="text-2xl font-black text-white">
                  {stat.value}
                </span>
                <span className="text-white/70 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </span>
              </div>
              {/* Gold dot separator between items */}
              <div className="w-1.5 h-1.5 rounded-full bg-tis-gold shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
