"use client";

import { classNames } from "@/lib/format";

/**
 * Decorative animated backdrop: drifting prismatic orbs + subtle grain.
 */
export function PrismBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={classNames("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-32 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-prism-violet/20 blur-[120px] animate-drift" />
      <div
        className="absolute right-[-12%] top-[12%] h-[34rem] w-[34rem] rounded-full bg-prism-pink/15 blur-[120px] animate-drift"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-[-18%] left-[28%] h-[38rem] w-[38rem] rounded-full bg-prism-cyan/15 blur-[120px] animate-drift"
        style={{ animationDelay: "-15s" }}
      />
    </div>
  );
}
