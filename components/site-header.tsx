"use client";

import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import { GitHubMark } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { GITHUB_URL } from "@/lib/projects";

const nav = [
  { href: "#work", label: "Projects" },
  { href: "#approach", label: "Approach" },
  { href: "#toolbox", label: "Tech Stack" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[88rem] items-center justify-between gap-6 px-6 md:px-10">
        <Link
          href="#top"
          className="group flex items-baseline gap-3"
          aria-label="Samarth Rachcha, back to top"
        >
          <span className="font-serif text-lg leading-none tracking-[-0.01em]">
            Samarth Rachcha
          </span>
          <span className="label hidden text-ink-muted transition-colors group-hover:text-ink lg:block">
            ML / Interfaces
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="label relative py-1 text-ink-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Samarth Rachcha on GitHub"
              className="flex size-8 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <GitHubMark className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute inset-x-0 -bottom-px h-px origin-left bg-accent"
      />
    </header>
  );
}
