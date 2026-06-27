"use client";

import Link from "next/link";
import { useCart, accent } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import {
  ArrowIcon,
  CloseIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";

export default function CartPage() {
  const { items, setQuantity, remove, subtotal, clear } = useCart();
  const shipping = subtotal > 0 ? (subtotal > 750 ? 0 : 35) : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-5 pt-28 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/5 text-4xl">
          🪞
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold text-mist">
          Your cart is empty
        </h1>
        <p className="mt-2 text-mist-dim">
          Nothing broken here yet — go find something luminous.
        </p>
        <Link
          href="/shop"
          className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
        >
          Explore the collection
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prism-violet">
            Your selection
          </p>
          <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
            Shopping cart
          </h1>
        </div>
        <button
          onClick={clear}
          className="text-xs text-mist-dim underline-offset-2 transition-colors hover:text-prism-pink hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => {
            const a = accent(item.accent);
            return (
              <div
                key={item.productId}
                className="flex gap-5 rounded-3xl border border-white/10 bg-ink-2 p-4"
              >
                <Link
                  href={`/product/${item.slug}`}
                  className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative h-full w-full object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="font-display text-lg font-semibold text-mist transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-0.5 text-sm text-mist-dim">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item.productId)}
                      className="grid h-8 w-8 place-items-center rounded-full text-mist-dim transition-colors hover:bg-white/10 hover:text-prism-pink"
                      aria-label="Remove item"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-1 rounded-full border border-white/15 p-0.5">
                      <button
                        onClick={() =>
                          setQuantity(item.productId, item.quantity - 1)
                        }
                        className="grid h-8 w-8 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Decrease"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-mist">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          setQuantity(item.productId, item.quantity + 1)
                        }
                        className="grid h-8 w-8 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Increase"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="font-display text-xl font-semibold text-mist">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-mist-soft transition-colors hover:text-white"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-3xl border border-white/10 bg-ink-2 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold text-mist">
            Order summary
          </h2>
          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-mist-soft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-mist-soft">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
              </span>
            </div>
            {shipping > 0 && (
              <p className="rounded-xl bg-white/5 px-3 py-2 text-xs text-mist-dim">
                Add {formatPrice(750 - subtotal)} more for free shipping.
              </p>
            )}
            <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-semibold text-mist">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-prism-violet via-prism-pink to-prism-cyan bg-[length:200%_auto] py-4 text-sm font-semibold text-white transition-all hover:bg-[position:100%]"
          >
            Proceed to checkout
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <p className="mt-3 text-center text-xs text-mist-dim">
            Secure checkout · Insured delivery
          </p>
        </div>
      </div>
    </div>
  );
}
