import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PrismBackdrop } from "@/components/PrismBackdrop";
import { ArrowIcon, SparkleIcon } from "@/components/icons";

const FACTS = [
  { k: "1", v: "Maker, two hands" },
  { k: "12", v: "Years of fractures" },
  { k: "90%+", v: "Reclaimed glass" },
  { k: "8–40", v: "Hours per piece" },
];

const STEPS = [
  {
    t: "A conversation",
    d: "We start with what you love — a color, a memory, a wall. No briefs, just a chat.",
  },
  {
    t: "A sketch in shards",
    d: "I lay out real glass fragments on the bench so you can see (and shift) the design before a thing is fixed.",
  },
  {
    t: "The build",
    d: "Over days or weeks, the piece is composed, gilded, and polished entirely by hand.",
  },
  {
    t: "Home & healed",
    d: "Your heirloom ships crated and insured — and carries our lifetime re-heal promise.",
  },
];

export default function AtelierPage() {
  return (
    <div className="relative pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/atelier.jpg"
            alt="Inside the Shardlight atelier"
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        </div>
        <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur">
              <SparkleIcon className="h-3.5 w-3.5 text-gold" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-mist-soft">
                The Atelier
              </span>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tight">
              One bench. Two hands.
              <br />
              <span className="text-gold-grad">A lot of patience.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist-soft">
              Shardlight isn't a factory or a brand. It's a single, sunlit studio
              where one maker turns rescued glass into light, one painstaking
              fragment at a time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {FACTS.map((f, i) => (
            <Reveal
              key={f.v}
              delay={i * 70}
              className="rounded-3xl border border-white/10 bg-ink-2 p-7 text-center"
            >
              <p className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold text-prism">
                {f.k}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-mist-dim">
                {f.v}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Maker */}
      <section className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <span className="h-px w-8 bg-gold/50" />
              The maker
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.9rem,4.5vw,3rem)] font-semibold leading-[1.05] tracking-tight">
              I've been obsessed with broken things since I was eight.
            </h2>
            <div className="mt-6 space-y-4 text-mist-soft">
              <p>
                My grandmother kept a drawer of chipped cups and shattered
                marbles she couldn't bear to throw away. I inherited that drawer
                — and the stubborn belief that broken glass is just light
                waiting to be rearranged.
              </p>
              <p>
                Today the drawer is a studio. I still sort fragments by the way
                they catch the afternoon sun, still trace every seam by hand,
                and still sign each piece myself. If you own a Shardlight, you
                own something I touched from first shard to final polish.
              </p>
            </div>
            <p className="mt-6 font-display text-xl italic text-mist">
              — The maker
            </p>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aurora-veil.jpg"
                alt="A finished Shardlight panel"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Commission process */}
      <section className="relative overflow-hidden py-24">
        <PrismBackdrop className="opacity-60" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="text-center">
            <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-pink">
              <span className="h-px w-8 bg-prism-pink/50" />
              Commission a piece
              <span className="h-px w-8 bg-prism-pink/50" />
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
              Own something unrepeatable
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-mist-soft">
              We accept a small number of commissions each season. Here's how a
              piece becomes yours.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal
                key={s.t}
                delay={i * 80}
                className="rounded-3xl border border-white/10 bg-ink-2/80 p-7 backdrop-blur"
              >
                <span className="font-display text-sm font-semibold text-prism-pink">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 font-display text-xl font-semibold text-mist">
                  {s.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                  {s.d}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Start with the collection
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-4 text-sm text-mist-dim">
              For commissions, reply to any newsletter and we'll begin the
              conversation.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
