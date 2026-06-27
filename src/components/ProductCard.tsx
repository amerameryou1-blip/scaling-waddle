"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, accent } from "@/lib/cart";
import { formatPrice, classNames } from "@/lib/format";
import { CATEGORY_LABELS, type ProductRow } from "@/lib/catalog";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { TiltCard } from "@/components/TiltCard";

export function ProductCard({ product }: { product: ProductRow }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const a = accent(product.accent);

  const handleAdd = () => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      accent: product.accent,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const compareAt = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  return (
    <article className="group flex flex-col">
      <TiltCard max={9} scale={1.03} className="flex-1">
        <Link
          href={`/product/${product.slug}`}
          className={classNames(
            "shine-sweep relative block aspect-[4/5] overflow-hidden rounded-3xl border border-white/8 bg-ink-3",
            "transition-all duration-500 group-hover:border-white/20"
          )}
        >
          <div
            className={classNames(
              "absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-700 group-hover:opacity-100",
              a.from,
              a.to
            )}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="relative h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80" />

          {/* Animated prismatic ring on hover */}
          <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 prism-border-animated" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span className="rounded-full border border-white/15 bg-ink/50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-mist-soft backdrop-blur">
              {CATEGORY_LABELS[product.category] ?? product.category}
            </span>
            {compareAt && (
              <span className="rounded-full bg-prism-pink/90 px-3 py-1 text-[11px] font-semibold text-white">
                Sale
              </span>
            )}
          </div>

          {product.edition && (
            <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-ink/50 px-3 py-1 text-[11px] font-medium text-mist-soft backdrop-blur">
              {product.edition}
            </span>
          )}

          {/* Slide-up quick view label */}
          <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">
              View piece →
            </span>
          </div>
        </Link>
      </TiltCard>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-display text-xl font-semibold text-mist transition-colors hover:text-white">
              {product.name}
            </h3>
          </Link>
          <p className="mt-0.5 truncate text-sm text-mist-dim">
            {product.tagline}
          </p>
        </div>
        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={classNames(
            "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-300",
            added
              ? "scale-110 border-prism-cyan/50 bg-prism-cyan/20 text-prism-cyan"
              : "border-white/15 bg-white/5 text-mist-soft hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:text-white"
          )}
        >
          {added ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <PlusIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-base font-semibold text-mist">
          {formatPrice(product.price)}
        </span>
        {compareAt && (
          <span className="text-sm text-mist-dim line-through">
            {formatPrice(compareAt)}
          </span>
        )}
      </div>
    </article>
  );
}
