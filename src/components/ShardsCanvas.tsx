"use client";

import { useEffect, useRef } from "react";

type Shard = {
  x: number;
  y: number;
  z: number; // depth 0..1, affects size/parallax/speed
  size: number;
  rotation: number;
  rotSpeed: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
};

const COLORS = [
  [94, 234, 212], // cyan
  [125, 211, 252], // blue
  [167, 139, 250], // violet
  [244, 114, 182], // pink
  [232, 200, 121], // gold
];

/**
 * A canvas field of slowly drifting, rotating glass shards. They catch a
 * prismatic gradient, glow softly, and gently part around the cursor.
 * Performance-tuned with capped DPR and an off-screen pause when hidden.
 */
export function ShardsCanvas({
  density = 0.00009,
  className,
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let shards: Shard[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let running = true;

    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const buildShards = () => {
      const count = Math.min(
        90,
        Math.max(26, Math.floor(width * height * density))
      );
      shards = Array.from({ length: count }, () => {
        const z = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: rand(10, 46) * (0.5 + z),
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: rand(-0.004, 0.004),
          vx: rand(-0.16, 0.16) * (0.4 + z),
          vy: rand(-0.12, 0.12) * (0.4 + z),
          hue: Math.floor(Math.random() * COLORS.length),
          alpha: rand(0.18, 0.6) * (0.5 + z * 0.7),
        };
      });
    };

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildShards();
    };

    const drawShard = (s: Shard) => {
      const [r, g, b] = COLORS[s.hue];
      const half = s.size / 2;
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = s.alpha;

      // Glass facet: a pentagon-ish shard
      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(half * 0.95, -half * 0.18);
      ctx.lineTo(half * 0.74, half);
      ctx.lineTo(-half * 0.62, half * 0.92);
      ctx.lineTo(-half * 0.92, -half * 0.1);
      ctx.closePath();

      const grad = ctx.createLinearGradient(-half, -half, half, half);
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.95)`);
      grad.addColorStop(0.5, `rgba(255,255,255,0.5)`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.25)`);
      ctx.fillStyle = grad;
      ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
      ctx.shadowBlur = 18 * (0.5 + s.z);
      ctx.fill();

      // crisp highlight edge
      ctx.shadowBlur = 0;
      ctx.globalAlpha = s.alpha * 0.9;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = `rgba(255,255,255,0.5)`;
      ctx.stroke();
      ctx.restore();
    };

    const update = () => {
      for (const s of shards) {
        // parallax drift
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        // cursor repulsion (only near the shard)
        if (mouse.active) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          const radius = 150;
          if (dist2 < radius * radius && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = (1 - dist / radius) * 2.4 * (0.5 + s.z);
            s.x += (dx / dist) * force;
            s.y += (dy / dist) * force;
          }
        }

        // wrap around edges
        const m = s.size;
        if (s.x < -m) s.x = width + m;
        if (s.x > width + m) s.x = -m;
        if (s.y < -m) s.y = height + m;
        if (s.y > height + m) s.y = -m;
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of shards) drawShard(s);
    };

    const frame = () => {
      if (!running) return;
      update();
      render();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Pause when the canvas scrolls out of view
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? false;
        if (visible && !running) {
          running = true;
          raf = requestAnimationFrame(frame);
        } else if (!visible && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    canvas.parentElement?.addEventListener("mouseleave", onLeave);

    if (reduced) {
      render();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      running = false;
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      canvas.parentElement?.removeEventListener("mouseleave", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
