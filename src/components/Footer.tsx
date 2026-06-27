import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";

const SHOP = [
  { href: "/shop", label: "All Pieces" },
  { href: "/shop?category=kintsugi", label: "Kintsugi" },
  { href: "/shop?category=mosaic", label: "Mosaics" },
  { href: "/shop?category=sculpture", label: "Sculptures" },
];

const STUDIO = [
  { href: "/atelier", label: "The Atelier" },
  { href: "/about", label: "Our Story" },
  { href: "/about#process", label: "Process" },
  { href: "/about#care", label: "Care & Shipping" },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-ink-2">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.6fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative grid h-9 w-9 place-items-center">
                <span className="absolute inset-0 rotate-45 rounded-[0.6rem] bg-gradient-to-br from-prism-cyan via-prism-violet to-prism-pink" />
                <span className="absolute inset-[3px] rotate-45 rounded-[0.45rem] bg-ink-2" />
                <span className="relative h-2 w-2 rounded-full bg-white" />
              </span>
              <span className="font-display text-xl font-semibold text-mist">
                Shardlight
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-dim">
              An atelier that turns broken glass into light. Handcrafted,
              limited editions, made to be heirlooms.
            </p>
            <div className="mt-5 flex gap-3">
              {["Instagram", "Pinterest", "Behance"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-full border border-white/12 px-3 py-1.5 text-xs text-mist-soft transition-colors hover:border-white/30 hover:text-white"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mist-dim">
              Collection
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SHOP.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-mist-soft transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mist-dim">
              Studio
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {STUDIO.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-mist-soft transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-mist-dim">
              The Inner Light — our letter
            </p>
            <p className="mt-4 text-sm text-mist-soft">
              New editions, behind-the-shard stories, and early access. No noise.
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-6 text-xs text-mist-dim sm:flex-row">
          <p>© {new Date().getFullYear()} Shardlight Studio. Crafted from fracture.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-mist-soft">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-mist-soft">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-mist-soft">
              Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
