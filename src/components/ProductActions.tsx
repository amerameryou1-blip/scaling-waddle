"use client";

import { useState } from "react";
import { useCart, accent } from "@/lib/cart";
import { classNames, formatPrice } from "@/lib/format";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";

export function ProductActions({
  productId,
  slug,
  name,
  price,
  compareAtPrice,
  image,
  accentName,
  inStock,
}: {
  productId: string;
  slug: string;
  name: string;
  price: string;
  compareAtPrice: string | null;
  image: string;
  accentName: string;
  inStock: boolean;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const a = accent(accentName);

  const handleAdd = () => {
    add(
      {
        productId,
        slug,
        name,
        price: parseFloat(price),
        image,
        accent: accentName,
      },
      qty
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="mt-8">
      <div className="flex items-baseline gap-3">
        <span className="font-display text-4xl font-semibold text-mist">
          {formatPrice(price)}
        </span>
        {compareAtPrice && (
          <span className="text-lg text-mist-dim line-through">
            {formatPrice(compareAtPrice)}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-full border border-white/15 p-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-10 w-10 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Decrease quantity"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-10 text-center font-semibold text-mist">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-10 w-10 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Increase quantity"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={classNames(
            "group flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r px-8 py-4 text-sm font-semibold text-white transition-all",
            a.from,
            a.to,
            inStock
              ? "hover:shadow-[0_10px_40px_-10px_rgba(167,139,250,0.6)]"
              : "cursor-not-allowed opacity-50"
          )}
        >
          {added ? (
            <>
              <CheckIcon className="h-4 w-4" /> Added to cart
            </>
          ) : inStock ? (
            <>Add to cart</>
          ) : (
            <>Currently unavailable</>
          )}
        </button>
      </div>
    </div>
  );
}
