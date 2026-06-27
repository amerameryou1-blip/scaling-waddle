// Pure accent styling data + helper. NO "use client" so it can be imported
// safely from both server and client components.

export const ACCENT_MAP: Record<
  string,
  { from: string; to: string; text: string; ring: string; glow: string }
> = {
  gold: {
    from: "from-amber-300/30",
    to: "to-yellow-600/10",
    text: "text-gold-grad",
    ring: "ring-amber-300/30",
    glow: "glow-[0_0_70px_-20px_rgba(232,200,121,0.6)]",
  },
  cyan: {
    from: "from-teal-300/30",
    to: "to-sky-500/10",
    text: "text-prism-cyan",
    ring: "ring-teal-300/30",
    glow: "glow-cyan",
  },
  violet: {
    from: "from-violet-400/30",
    to: "to-fuchsia-500/10",
    text: "text-prism-violet",
    ring: "ring-violet-400/30",
    glow: "glow-violet",
  },
  pink: {
    from: "from-pink-400/30",
    to: "to-rose-500/10",
    text: "text-prism-pink",
    ring: "ring-pink-400/30",
    glow: "glow-pink",
  },
};

export function accent(name: string) {
  return ACCENT_MAP[name] ?? ACCENT_MAP.violet;
}
