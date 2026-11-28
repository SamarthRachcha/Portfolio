"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { DiscordMark } from "@/components/icons";

const DISCORD_HANDLE = "sam_7249";

export function CopyDiscord() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copyHandle() {
    try {
      await navigator.clipboard.writeText(DISCORD_HANDLE);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the handle stays visible.
    }
  }

  return (
    <button
      type="button"
      onClick={copyHandle}
      title={copied ? "Copied" : "Copy Discord handle"}
      aria-label={
        copied
          ? "Discord handle copied"
          : `Copy Discord handle ${DISCORD_HANDLE}`
      }
      className="inline-flex items-center gap-2.5 border border-paper/25 px-4 py-3.5 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink sm:text-[0.7rem]"
    >
      <DiscordMark aria-hidden="true" className="size-3.5 shrink-0" />
      <span className="normal-case tracking-[0.04em]">{DISCORD_HANDLE}</span>
      {copied ? (
        <Check aria-hidden="true" className="size-3.5 shrink-0 text-signal" />
      ) : (
        <Copy aria-hidden="true" className="size-3.5 shrink-0" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied" : ""}
      </span>
    </button>
  );
}
