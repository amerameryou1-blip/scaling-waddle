"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon, SparkleIcon } from "@/components/icons";
import { ShardsCanvas } from "@/components/ShardsCanvas";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";

function LightRay({
  className,
  delay = "0s",
  height = "120%",
}: {
  className: string;
  delay?: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute origin-top ${className}`}
      style={{
        height,
        width: "2px",
        background:
          "linear-gradient(to bottom, rgba(167,139,250,0.6), rgba(94,234,212,0.15), transparent)",
        filter: "blur(1px)",
        animation: `pulse-glow 6s ease-in-out infinite`,
        animationDelay: delay,
      }}
    />
  );
}

const STATS = [
  { value: 400, suffix: "+", label: "Pieces reborn" },
  { value: 100, suffix: "%", label: "Made by hand" },
  { value: 4, suffix: "", label: "Distinct disciplines" },
  { value: -1, suffix: "", label: "Light, refracted" },
];

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onMove = (e: MouseEvent) => {
      if (reduced || !parallaxRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxRef.current.style.setProperty("--px", `${x * 18}px`);
      parallaxRef.current.style.setProperty("--py", `${y * 18}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background image with parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ transform: "translate3d(var(--px,0), var(--py,0), 0)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-[108%] w-[108%] object-cover"
          style={{ transform: "translate(-4%,-4%) scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/30" />
      </div>

      {/* Light rays */}
      <LightRay className="left-[20%] top-0 rotate-[8deg]" delay="0s" />
      <LightRay className="left-[38%] top-0 rotate-[4deg]" delay="-2s" />
      <LightRay className="right-[26%] top-0 -rotate-[6deg]" delay="-1s" height="90%" />
      <LightRay className="right-[42%] top-0 -rotate-[3deg]" delay="-3s" height="100%" />

      {/* Interactive floating shards */}
      {mounted && <ShardsCanvas className="opacity-70" />}

      {/* Slow-drifting aurora glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-prism-violet/10 blur-[140px] animate-aurora" />
        <div className="absolute right-[15%] top-[20%] h-72 w-72 rounded-full bg-prism-pink/10 blur-[120px] animate-aurora" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
        <div className="max-w-3xl">
          <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur">
            <SparkleIcon className="h-3.5 w-3.5 animate-spin-slow text-prism-violet" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist-soft">
              Atelier of Broken Light
            </span>
          </div>

          <h1
            className="mt-6 animate-fade-up font-display text-[clamp(2.8rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight"
            style={{ animationDelay: "0.1s" }}
          >
            We turn <span className="text-prism">broken&nbsp;glass</span>
            <br />
            into <span className="italic text-gold-grad">light</span>.
          </h1>

          <p
            className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-mist-soft"
            style={{ animationDelay: "0.2s" }}
          >
            Every Shardlight piece begins as something shattered — then is
            reborn by hand as a luminous, limited-edition work of art.
            Kintsugi vessels, iridescent mosaics, and prismatic sculpture,
            made to be heirlooms.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-wrap items-center gap-4"
            style={{ animationDelay: "0.3s" }}
          >
            <MagneticButton strength={0.35}>
              <Link
                href="/shop"
                className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.5)]"
              >
                Explore the Collection
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
            <Link
              href="/about"
              className="prism-border-animated inline-flex items-center gap-2 rounded-full bg-white/5 px-7 py-3.5 text-sm font-semibold text-mist backdrop-blur transition-colors hover:bg-white/10"
            >
              Our Philosophy
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex animate-fade-up flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
          style={{ animationDelay: "0.4s" }}
        >
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-semibold text-mist">
                {s.value < 0 ? (
                  <span className="text-prism">∞</span>
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-mist-dim">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-mist-dim">
          Scroll
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-x-0 top-0 h-4 animate-[float_1.8s_ease-in-out_infinite] bg-gradient-to-b from-white/80 to-transparent" />
        </span>
      </div>
    </section>
  );
}
