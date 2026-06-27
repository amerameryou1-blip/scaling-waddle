"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, classNames } from "@/lib/format";
import { CloseIcon, MinusIcon, PlusIcon, ArrowIcon } from "@/components/icons";

export function CartDrawer() {
  const { items, isOpen, closeCart, setQuantity, remove, subtotal, count } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const shipping = subtotal > 0 ? (subtotal > 750 ? 0 : 35) : 0;

  return (
    <>
      <div
        onClick={closeCart}
        className={classNames(
          "fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm transition-opacity duration-400",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <aside
        className={classNames(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-ink-2 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="font-display text-lg font-semibold text-mist">
              Your Cart
            </p>
            <p className="text-xs text-mist-dim">
              {count} {count === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/12 text-mist-soft transition-colors hover:border-white/30 hover:text-white"
            aria-label="Close cart"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5">
              <span className="text-3xl">🪞</span>
            </div>
            <p className="font-display text-xl text-mist">Your cart is empty</p>
            <p className="text-sm text-mist-dim">
              Discover pieces born from shattered light.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              Explore the Collection
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-6 py-5">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-mist">
                          {item.name}
                        </p>
                        <p className="text-xs text-mist-dim">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="text-xs text-mist-dim underline-offset-2 transition-colors hover:text-prism-pink hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-white/12 p-0.5">
                        <button
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          className="grid h-7 w-7 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Decrease"
                        >
                          <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium text-mist">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          className="grid h-7 w-7 place-items-center rounded-full text-mist-soft transition-colors hover:bg-white/10 hover:text-white"
                          aria-label="Increase"
                        >
                          <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-mist">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 px-6 py-5">
              <div className="space-y-1.5 text-sm">
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
                {shipping === 0 && subtotal > 0 && (
                  <p className="text-xs text-prism-cyan">
                    Free shipping over $750 unlocked ✦
                  </p>
                )}
                <div className="flex justify-between border-t border-white/10 pt-2 text-base font-semibold text-mist">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-prism-violet via-prism-pink to-prism-cyan bg-[length:200%_auto] py-3.5 text-sm font-semibold text-white transition-all hover:bg-[position:100%] hover:shadow-[0_8px_30px_-8px_rgba(167,139,250,0.7)]"
              >
                Proceed to Checkout
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/cart"
                onClick={closeCart}
                className="mt-2 block text-center text-xs text-mist-dim underline-offset-2 hover:text-mist-soft hover:underline"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
