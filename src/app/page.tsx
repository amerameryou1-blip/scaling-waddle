import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ShardsCanvas } from "@/components/ShardsCanvas";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";
import { getAllProducts, getFeaturedProducts } from "@/lib/data";
import {
  ArrowIcon,
  GemIcon,
  LeafIcon,
  QuoteIcon,
  ShieldIcon,
  SparkleIcon,
  TruckIcon,
} from "@/components/icons";

const MARQUEE = [
  "Kintsugi",
  "Iridescent Mosaic",
  "Prismatic Sculpture",
  "Wall Light",
  "Hand-blown",
  "24k Gold",
  "Limited Edition",
  "Made by Hand",
];

const PROCESS = [
  {
    n: "01",
    t: "We break it",
    d: "Glass is blown, then deliberately fractured. The break is the beginning, never the end.",
  },
  {
    n: "02",
    t: "We read the shards",
    d: "Each fragment is sorted by color, light, and edge — a puzzle with no picture on the box.",
  },
  {
    n: "03",
    t: "We rejoin in gold",
    d: "Pieces are recomposed with gold resin and lead-free solder, seams traced by hand.",
  },
  {
    n: "04",
    t: "We release the light",
    d: "Finished, polished, and signed — a one-of-one ready to scatter light for decades.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My Aurelian vessel arrived and I genuinely teared up. It's more beautiful broken than anything I owned whole.",
    name: "Marisol R.",
    place: "Lisbon",
  },
  {
    quote:
      "The Shardfall chandelier turns my dining room into a slow-moving rainbow at golden hour. Worth every cent.",
    name: "Devon K.",
    place: "Brooklyn",
  },
  {
    quote:
      "Commissioned a custom tide mirror for our foyer. Guests always ask who the artist is. It's me. (It's Shardlight.)",
    name: "Priya & Tom",
    place: "Austin",
  },
];

const TRUST = [
  { icon: TruckIcon, t: "Insured worldwide shipping", d: "Crated & tracked" },
  { icon: ShieldIcon, t: "Lifetime repair promise", d: "We re-heal our work" },
  { icon: GemIcon, t: "Signed & numbered", d: "Certificate included" },
  { icon: LeafIcon, t: "100% reclaimed glass", d: "Sustainable by nature" },
];

const CATEGORY_VISUALS: Record<string, string> = {
  kintsugi: "/images/aurelian-vessel.jpg",
  mosaic: "/images/prism-bloom.jpg",
  sculpture: "/images/shardfall-chandelier.jpg",
  "wall-art": "/images/aurora-veil.jpg",
};

const CATEGORY_LABEL: Record<string, string> = {
  kintsugi: "Kintsugi",
  mosaic: "Mosaic",
  sculpture: "Sculpture",
  "wall-art": "Wall Art",
};

const CATEGORY_DESC: Record<string, string> = {
  kintsugi: "Cracks rejoined in molten gold.",
  mosaic: "Hundreds of shards, one image.",
  sculpture: "Light, suspended in fragments.",
  "wall-art": "Private skies for your walls.",
};

export default async function HomePage() {
  const [featured, all] = await Promise.all([
    getFeaturedProducts(),
    getAllProducts(),
  ]);

  const categories = Array.from(
    new Set(all.map((p) => p.category))
  );

  return (
    <>
      <Hero />

      {/* Marquee */}
      <div className="relative space-y-2 border-y border-white/10 bg-ink-2/60 py-5">
        <div className="flex overflow-hidden mask-fade-x">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="font-display text-xl italic text-mist-soft">
                  {m}
                </span>
                <SparkleIcon className="h-4 w-4 text-prism-violet/60" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex overflow-hidden mask-fade-x">
          <div className="flex shrink-0 animate-marquee-rev items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].reverse().map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                <SparkleIcon className="h-4 w-4 text-prism-cyan/60" />
                <span className="font-display text-xl italic text-mist-dim">
                  {m}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured collection */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="flex flex-col items-end justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-violet">
              <span className="h-px w-8 bg-prism-violet/50" />
              Featured Pieces
            </p>
            <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
              The pieces catching the light right now
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-mist-soft transition-colors hover:text-white"
          >
            View full collection
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-2/50 to-transparent" />
        <ShardsCanvas density={0.00006} className="opacity-50" />
        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <span className="font-display text-6xl text-gold-grad">“</span>
            <p className="mt-2 font-display text-[clamp(1.8rem,4.5vw,3rem)] font-medium leading-[1.15] text-mist">
              We don't hide the break. We gild it — because the crack is where
              the <span className="italic text-prism">light gets in</span>.
            </p>
            <p className="mx-auto mt-8 max-w-xl text-mist-soft">
              Shardlight is a small studio devoted to a single belief: that
              damage is not the opposite of beauty, but often its source. Every
              piece here is proof.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-white"
            >
              Read our story
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-cyan">
            <span className="h-px w-8 bg-prism-cyan/50" />
            The Process
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
            From shattered to luminous
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 90}
              className="group relative bg-ink-2 p-8 transition-colors hover:bg-ink-3"
            >
              <span className="font-display text-5xl font-light text-white/10 transition-colors group-hover:text-prism-violet/30">
                {step.n}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-mist">
                {step.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                {step.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="text-center">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-pink">
            <span className="h-px w-8 bg-prism-pink/50" />
            Browse by discipline
            <span className="h-px w-8 bg-prism-pink/50" />
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Four ways to catch the light
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <Reveal key={c} delay={i * 80}>
              <Link
                href={`/shop?category=${c}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CATEGORY_VISUALS[c]}
                  alt={CATEGORY_LABEL[c]}
                  className="h-full w-full object-cover transition-transform duration-[1100ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {CATEGORY_LABEL[c]}
                  </h3>
                  <p className="mt-1 text-sm text-mist-soft">
                    {CATEGORY_DESC[c]}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                    Discover
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Atelier teaser */}
      <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/atelier.jpg"
                alt="Inside the Shardlight atelier"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 hidden rounded-2xl glass-strong p-5 sm:block">
              <p className="font-display text-3xl font-semibold text-prism">
                12 yrs
              </p>
              <p className="text-xs text-mist-soft">of gilded fractures</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              Inside the atelier
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
              One bench, two hands, infinite shards
            </h2>
            <p className="mt-5 text-mist-soft">
              Shardlight is the work of a single maker in a small, light-filled
              studio. No factories, no automation — just patience, tweezers, and
              a stubborn belief that broken things deserve a second act.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Made-to-order commissions welcome",
                "Each piece signed and numbered by hand",
                "Reclaimed & rescued glass, wherever possible",
              ].map((point) => (
                <li key={point} className="flex items-center gap-3 text-sm text-mist">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-prism-violet/20 text-prism-violet">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/atelier"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:bg-white/10"
            >
              Visit the atelier
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Trust band */}
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal
              key={t.t}
              delay={i * 70}
              className="flex items-center gap-4 bg-ink-2 p-6"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 bg-white/5 text-prism-cyan">
                <t.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-mist">{t.t}</p>
                <p className="text-xs text-mist-dim">{t.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Collectors, in their own words
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 90}
              className="relative flex flex-col rounded-3xl border border-white/10 bg-ink-2 p-8"
            >
              <QuoteIcon className="h-8 w-8 text-prism-violet/40" />
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-mist-soft">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-prism-violet to-prism-pink font-display text-sm font-semibold text-white">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-mist">{t.name}</p>
                  <p className="text-xs text-mist-dim">{t.place}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Reveal
          variant="scale"
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-3 to-ink-2 px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-prism-violet/20 blur-[100px] animate-aurora" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-prism-pink/20 blur-[100px] animate-aurora" style={{ animationDelay: "-7s" }} />
          <ShardsCanvas density={0.00005} className="opacity-40" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight">
              Commission something <span className="text-prism">unrepeatable</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-mist-soft">
              Bring us a memory, a color, or a wall that needs to glow. We'll
              break the glass and build you a heirloom.
            </p>
            <MagneticButton strength={0.4} className="mt-8">
              <Link
                href="/shop"
                className="shine-sweep group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.5)]"
              >
                Start with the collection
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
