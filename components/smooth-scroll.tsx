"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Document-level smooth scrolling. Lenis honours `prefers-reduced-motion`
 * itself (`respectReducedMotion` defaults to true), so we do not need to
 * branch here. Anchor links are handed to Lenis so header navigation glides
 * instead of jumping.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
