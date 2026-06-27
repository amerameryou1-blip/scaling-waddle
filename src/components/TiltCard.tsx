"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { classNames } from "@/lib/format";

/**
 * A 3D perspective tilt wrapper. Tilts toward the cursor and restores on leave.
 * Includes an optional glare layer. Respects reduced-motion.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  glare = true,
  scale = 1.02,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });
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
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    setStyle({
      transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`,
    });
    setGlarePos({ x: px * 100, y: py * 100, o: 0.18 });
  };

  const reset = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
    });
    setGlarePos((g) => ({ ...g, o: 0 }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={classNames("relative [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform", className)}
      style={style}
    >
      {children}
      {glare && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.o}), transparent 55%)`,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
    </div>
  );
}
