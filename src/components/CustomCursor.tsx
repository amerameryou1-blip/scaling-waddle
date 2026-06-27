"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A custom prismatic cursor: a soft glowing orb that trails the pointer with
 * easing, plus a sharp dot. Disabled on touch / reduced-motion devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      const interactive = (e.target as HTMLElement)?.closest(
        "a, button, input, textarea, [role='button'], [data-cursor]"
      );
      setActive(!!interactive);
    };

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-5 -mt-5 h-10 w-10 rounded-full transition-[width,height,opacity] duration-200"
        style={{ willChange: "transform" }}
      >
        <div
          className="h-full w-full rounded-full border transition-all duration-200"
          style={{
            borderColor: active ? "rgba(244,114,182,0.9)" : "rgba(167,139,250,0.6)",
            background: active
              ? "radial-gradient(circle, rgba(244,114,182,0.18), transparent 70%)"
              : "radial-gradient(circle, rgba(167,139,250,0.12), transparent 70%)",
            transform: active ? "scale(1.5)" : "scale(1)",
            boxShadow: active
              ? "0 0 24px rgba(244,114,182,0.5)"
              : "0 0 18px rgba(167,139,250,0.4)",
          }}
        />
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
        style={{ willChange: "transform", boxShadow: "0 0 10px rgba(255,255,255,0.9)" }}
      />
    </>
  );
}
