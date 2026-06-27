import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  CATEGORY_LABELS,
  ALL_SLUGS,
} from "@/lib/data";
import { ProductActions } from "@/components/ProductActions";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { accent } from "@/lib/accents";
import { classNames } from "@/lib/format";
import { GemIcon, LeafIcon, ShieldIcon, TruckIcon } from "@/components/icons";

// Prerender a page for every product in the static catalog.
export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Piece not found — Shardlight" };
  return {
    title: `${product.name} — Shardlight`,
    description: product.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  const fallbackRelated = all.filter((p) => p.id !== product.id).slice(0, 3);
  const relatedFinal = related.length > 0 ? related : fallbackRelated;
  const a = accent(product.accent);

  const specs = [
    { label: "Category", value: CATEGORY_LABELS[product.category] ?? product.category },
    { label: "Material", value: product.material },
    { label: "Dimensions", value: product.dimensions },
    { label: "Edition", value: product.edition },
  ].filter((s) => s.value);

  return (
    <div className="relative pt-28">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-mist-dim">
          <Link href="/" className="transition-colors hover:text-mist-soft">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="transition-colors hover:text-mist-soft">
            Collection
          </Link>
          <span>/</span>
          <span className="text-mist-soft">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <Reveal variant="left">
            <TiltCard max={7} scale={1.01} glare={false}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
              <div
                className={classNames(
                  "absolute inset-0 bg-gradient-to-br",
                  a.from,
                  a.to
                )}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.image}
                alt={product.name}
                className="relative aspect-square w-full object-cover"
              />
            </div>
            </TiltCard>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={classNames(
                    "relative aspect-square overflow-hidden rounded-2xl border",
                    i === 0 ? "border-white/40" : "border-white/10 opacity-60"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ filter: `hue-rotate(${i * 12}deg)` }}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={120} className="lg:pt-4">
            <div className="flex items-center gap-3">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-mist-soft">
                {CATEGORY_LABELS[product.category] ?? product.category}
              </span>
              {product.inStock ? (
                <span className="flex items-center gap-1.5 text-xs text-prism-cyan">
                  <span className="h-1.5 w-1.5 rounded-full bg-prism-cyan" />
                  In studio, ready to ship
                </span>
              ) : (
                <span className="text-xs text-prism-pink">Made to order</span>
              )}
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-semibold leading-[1.02] tracking-tight">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-mist-soft">{product.tagline}</p>

            <ProductActions
              productId={product.id}
              slug={product.slug}
              name={product.name}
              price={product.price}
              compareAtPrice={product.compareAtPrice}
              image={product.image}
              accentName={product.accent}
              inStock={product.inStock}
            />

            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-mist-soft">
              <p>{product.description}</p>
              {product.story && (
                <p className="border-l-2 border-prism-violet/40 pl-4 italic text-mist">
                  {product.story}
                </p>
              )}
            </div>

            {/* Specs */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/8">
              {specs.map((s) => (
                <div key={s.label} className="bg-ink-2 p-4">
                  <p className="text-[11px] uppercase tracking-wider text-mist-dim">
                    {s.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-mist">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Trust */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              {[
                { icon: TruckIcon, t: "Free insured shipping over $750" },
                { icon: ShieldIcon, t: "Lifetime re-heal guarantee" },
                { icon: GemIcon, t: "Signed & numbered certificate" },
                { icon: LeafIcon, t: "Reclaimed, sustainable glass" },
              ].map((x) => (
                <div key={x.t} className="flex items-center gap-2.5 text-mist-soft">
                  <x.icon className="h-4 w-4 shrink-0 text-prism-cyan" />
                  <span className="text-xs">{x.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Related */}
        {relatedFinal.length > 0 && (
          <section className="mt-28">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.6rem,4vw,2.5rem)] font-semibold tracking-tight">
                You may also scatter light with
              </h2>
              <Link
                href="/shop"
                className="group hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-mist-soft transition-colors hover:text-white sm:flex"
              >
                View all
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <div className="mt-10 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedFinal.map((p, i) => (
                <Reveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
