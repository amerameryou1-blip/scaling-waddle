"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { classNames } from "@/lib/format";

type Variant = "up" | "left" | "right" | "scale";

const VARIANT_CLASS: Record<Variant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  threshold = 0.12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={classNames(VARIANT_CLASS[variant], visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}
