// ============================================================
// src/hooks/useMousePosition.ts
// ============================================================
// Custom hook that tracks the current mouse cursor position
// in pixels (x, y) relative to the top-left of the viewport.
//
// This is used by the CustomCursor component to move the
// decorative cursor ring to follow the mouse.
//
// Why track in a hook vs. inline in the component?
//   - Separation of concerns: the component handles "look",
//     the hook handles "data" (where is the mouse?)
//   - Reusable: multiple components could use this hook
// ============================================================

"use client";

import { useState, useEffect } from "react";

// TypeScript interface describes the shape of the returned object
interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  // Start at 0,0 — will be updated on first mouse move
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Every time the mouse moves, read its x/y coordinates
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount — prevents memory leaks
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []); // Run only once

  return position;
}
