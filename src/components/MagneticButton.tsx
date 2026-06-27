"use client";

import {
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import { classNames } from "@/lib/format";

/**
 * Wraps children so the element gently pulls toward the cursor (magnetic hover).
 * Respects reduced-motion.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.4,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "a" | "button";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * strength, y: y * strength });
  };

  const reset = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={classNames("inline-block transition-transform duration-300 ease-out", className)}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      {...(rest as object)}
    >
      {children}
    </div>
  );
}
