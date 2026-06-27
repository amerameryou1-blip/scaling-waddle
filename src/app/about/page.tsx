import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { PrismBackdrop } from "@/components/PrismBackdrop";
import { ArrowIcon, LeafIcon, GemIcon, ShieldIcon } from "@/components/icons";

const PROCESS = [
  {
    n: "01",
    t: "Gather & break",
    d: "We reclaim glass from studios, bottles, and abandoned windows — then fracture it deliberately to free its inner light.",
  },
  {
    n: "02",
    t: "Read the shards",
    d: "Each fragment is sorted by color, opacity, and the way it bends light. The composition reveals itself.",
  },
  {
    n: "03",
    t: "Rejoin in gold",
    d: "Pieces are recomposed by hand with gold resin and lead-free solder. Every seam is traced, never hidden.",
  },
  {
    n: "04",
    t: "Polish & sign",
    d: "Finished pieces are polished, signed, and numbered with a certificate of authenticity.",
  },
];

const VALUES = [
  {
    icon: LeafIcon,
    t: "Radically reclaimed",
    d: "Over 90% of our glass is rescued. The most sustainable material is the one that already exists.",
  },
  {
    icon: GemIcon,
    t: "Truly limited",
    d: "No piece is mass-produced. Editions close, and then they're gone — forever.",
  },
  {
    icon: ShieldIcon,
    t: "Healed for life",
    d: "Break a Shardlight piece and we'll re-heal it. Our work is built to be repaired, again and again.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative pt-32">
      {/* Intro */}
      <section className="relative overflow-hidden border-b border-white/10">
        <PrismBackdrop />
        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prism-violet">
              Our philosophy
            </p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[0.98] tracking-tight">
              The break is where the{" "}
              <span className="text-prism">light begins</span>.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-mist-soft">
              Shardlight began with a shattered vase and a refusal to throw it
              away. We believe damage is not the opposite of beauty — it's often
              the doorway to it. Every piece we make is proof that what's broken
              can be made more luminous than what was whole.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Big quote */}
      <section className="mx-auto max-w-5xl px-5 py-24 sm:px-8">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/phoenix-ascendant.jpg"
              alt="A kintsugi-healed platter"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <span className="font-display text-6xl text-gold-grad">“</span>
            <blockquote className="-mt-4 font-display text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.2] text-mist">
              Kintsugi teaches us that the thing which broke you can become the
              gold that holds you together.
            </blockquote>
            <p className="mt-6 text-mist-soft">
              We borrow that ancient Japanese wisdom and extend it to glass —
              the most fragile, most luminous material we know. Where others see
              trash, we see a constellation waiting to be arranged.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section id="process" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
        <Reveal>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-cyan">
            <span className="h-px w-8 bg-prism-cyan/50" />
            How it's made
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Four steps, infinite patience
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 80}
              className="rounded-3xl border border-white/10 bg-ink-2 p-7"
            >
              <span className="font-display text-4xl font-light text-prism-violet/40">
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-mist">
                {s.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                {s.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.t}
              delay={i * 90}
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-white/5 text-prism-cyan">
                <v.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-mist">
                {v.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                {v.d}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Care & shipping */}
      <section id="care" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8">
        <Reveal className="rounded-[2rem] border border-white/10 bg-ink-2 p-8 sm:p-12">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-semibold tracking-tight">
            Care, shipping & the promise
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-lg font-semibold text-mist">
                Crated & insured
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                Every piece ships in a custom-built crate with full insurance
                and tracking. Complimentary worldwide shipping on orders over
                $750.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-mist">
                Displaying your piece
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                Place near natural light to watch colors shift through the day.
                Dust gently with a soft cloth. Avoid harsh cleaners.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-mist">
                The lifetime re-heal
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                If your Shardlight piece ever breaks, send it home. We'll re-heal
                it — often at no cost — because that's the whole point.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-mist">
                Commissions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-dim">
                Want something unrepeatable? We take a small number of
                commissions each season. Bring us a memory or a wall that needs
                to glow.
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Find your piece
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
