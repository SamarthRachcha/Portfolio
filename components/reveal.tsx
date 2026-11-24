"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

/**
 * Quiet scroll reveal. Fires once, stays out of the way of reduced-motion
 * users, and never hides content for search engines because the initial
 * styles are applied by Motion on the client only.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={reduce ? false : { opacity: 0, y: distance }}
      animate={reduce ? { opacity: 1, y: 0 } : undefined}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
