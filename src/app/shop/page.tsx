import Link from "next/link";
import { getAllProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { classNames } from "@/lib/format";

const CATS = [
  { key: "all", label: "All Pieces" },
  { key: "kintsugi", label: "Kintsugi" },
  { key: "mosaic", label: "Mosaic" },
  { key: "sculpture", label: "Sculpture" },
  { key: "wall-art", label: "Wall Art" },
];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const active = params.category ?? "all";
  const all = await getAllProducts();
  const products =
    active === "all" ? all : all.filter((p) => p.category === active);

  return (
    <div className="relative pt-32">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-prism-violet/15 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-prism-cyan/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-prism-violet">
            <span className="h-px w-8 bg-prism-violet/50" />
            The Collection
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[1] tracking-tight">
            Pieces, born from the break
          </h1>
          <p className="mt-5 max-w-xl text-mist-soft">
            Every work here is handcrafted and limited. When an edition closes,
            it's gone for good.
          </p>

          {/* Filter pills */}
          <div className="mt-9 flex flex-wrap gap-2">
            {CATS.map((c) => {
              const isActive = c.key === active;
              return (
                <Link
                  key={c.key}
                  href={c.key === "all" ? "/shop" : `/shop?category=${c.key}`}
                  className={classNames(
                    "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "border-transparent bg-white text-ink"
                      : "border-white/15 text-mist-soft hover:border-white/40 hover:text-white"
                  )}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-ink-2 p-16 text-center">
            <p className="font-display text-2xl text-mist">No pieces here yet</p>
            <p className="mt-2 text-mist-dim">
              This discipline is between editions. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
