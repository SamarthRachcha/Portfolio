"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, []);

  function toggleTheme() {
    const next: Theme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";

    document.documentElement.classList.toggle("dark", next === "dark");

    try {
      window.localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked; the theme still applies for this visit.
    }

    setTheme(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      aria-label={label}
      title={label}
      className="flex size-8 shrink-0 items-center justify-center border border-rule text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-paper"
    >
      <Moon aria-hidden="true" className="size-3.5 dark:hidden" />
      <Sun aria-hidden="true" className="hidden size-3.5 dark:block" />
    </button>
  );
}
