// ============================================================
// src/components/ui/Badge.tsx
// ============================================================
// Small pill-shaped label used for section tags like "CBSE Affiliated"
// or "Est. 2012". Purely presentational — no logic.
// ============================================================

interface BadgeProps {
  children: React.ReactNode;
  color?: "red" | "teal" | "gold";
}

const COLOR_MAP = {
  red: "bg-tis-red/10 text-tis-red border-tis-red/20",
  teal: "bg-tis-teal/10 text-tis-teal border-tis-teal/20",
  gold: "bg-tis-gold/10 text-tis-gold border-tis-gold/20",
};

export default function Badge({ children, color = "red" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        uppercase tracking-widest border ${COLOR_MAP[color]}
      `}
    >
      {children}
    </span>
  );
}
