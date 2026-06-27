"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, accent } from "@/lib/cart";
import { classNames, formatPrice } from "@/lib/format";
import { ArrowIcon, CheckIcon, ShieldIcon } from "@/components/icons";

type Status = "form" | "loading" | "success" | "error";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [status, setStatus] = useState<Status>("form");
  const [orderRef, setOrderRef] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "United States",
  });

  const shipping = subtotal > 750 ? 0 : 35;
  const total = subtotal + shipping;

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Checkout failed.");
        setStatus("error");
        return;
      }
      setOrderRef(data.orderRef);
      clear();
      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="relative mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 pt-32 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-prism-cyan/15 text-prism-cyan">
          <CheckIcon className="h-10 w-10" />
        </div>
        <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
          Thank you. The light is yours.
        </h1>
        <p className="mt-4 text-mist-soft">
          Your order is confirmed and will be hand-packed in our atelier. A
          confirmation is on its way to your inbox.
        </p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-ink-2 px-8 py-4">
          <p className="text-xs uppercase tracking-wider text-mist-dim">
            Order reference
          </p>
          <p className="mt-1 font-display text-2xl font-semibold text-prism">
            {orderRef}
          </p>
        </div>
        <Link
          href="/shop"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
        >
          Continue collecting
          <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-32 text-center">
        <h1 className="font-display text-3xl font-semibold text-mist">
          Nothing to check out yet
        </h1>
        <p className="mt-2 text-mist-dim">
          Your cart is empty. Let's find something worth gilding.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
        >
          Explore the collection
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const fields: Array<{ key: keyof typeof form; label: string; type?: string; full?: boolean; placeholder?: string }> = [
    { key: "customerName", label: "Full name", placeholder: "Ada Lovelace" },
    { key: "email", label: "Email", type: "email", placeholder: "ada@email.com" },
    { key: "address", label: "Address", full: true, placeholder: "123 Glasshouse Lane" },
    { key: "city", label: "City", placeholder: "Lisbon" },
    { key: "postalCode", label: "Postal code", placeholder: "1000-001" },
    { key: "country", label: "Country", placeholder: "United States" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-prism-violet">
        Almost luminous
      </p>
      <h1 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-tight">
        Checkout
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-ink-2 p-6">
            <h2 className="font-display text-xl font-semibold text-mist">
              Shipping details
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className={classNames(f.full && "col-span-2")}
                >
                  <label className="text-xs font-medium uppercase tracking-wider text-mist-dim">
                    {f.label}
                  </label>
                  <input
                    type={f.type ?? "text"}
                    required
                    value={form[f.key]}
                    placeholder={f.placeholder}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-mist placeholder:text-mist-dim/60 focus:border-prism-violet/50 focus:outline-none focus:ring-2 focus:ring-prism-violet/30"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-ink-2 p-6">
            <div className="flex items-center gap-2 text-mist">
              <ShieldIcon className="h-5 w-5 text-prism-cyan" />
              <h2 className="font-display text-xl font-semibold">Payment</h2>
            </div>
            <p className="mt-2 text-sm text-mist-dim">
              This is a demonstration checkout — no real payment is processed.
              Your order is recorded so you can see the full experience.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium uppercase tracking-wider text-mist-dim">
                  Card number
                </label>
                <input
                  inputMode="numeric"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-mist placeholder:text-mist-dim/60 focus:border-prism-violet/50 focus:outline-none focus:ring-2 focus:ring-prism-violet/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-mist-dim">
                  Expiry
                </label>
                <input
                  placeholder="MM / YY"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-mist placeholder:text-mist-dim/60 focus:border-prism-violet/50 focus:outline-none focus:ring-2 focus:ring-prism-violet/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-mist-dim">
                  CVC
                </label>
                <input
                  placeholder="123"
                  className="mt-1.5 w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3 text-sm text-mist placeholder:text-mist-dim/60 focus:border-prism-violet/50 focus:outline-none focus:ring-2 focus:ring-prism-violet/30"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-prism-pink/30 bg-prism-pink/10 px-4 py-3 text-sm text-prism-pink">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={classNames(
              "group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-prism-violet via-prism-pink to-prism-cyan bg-[length:200%_auto] py-4 text-sm font-semibold text-white transition-all hover:bg-[position:100%]",
              status === "loading" && "opacity-70"
            )}
          >
            {status === "loading" ? (
              "Placing order…"
            ) : (
              <>
                Place order · {formatPrice(total)}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        {/* Summary */}
        <div className="h-fit rounded-3xl border border-white/10 bg-ink-2 p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl font-semibold text-mist">
            Your order
          </h2>
          <div className="mt-5 space-y-3">
            {items.map((item) => {
              const a = accent(item.accent);
              return (
                <div key={item.productId} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="relative h-full w-full object-cover"
                    />
                    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-prism-violet px-1 text-[11px] font-semibold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-mist">
                      {item.name}
                    </p>
                    <p className="text-xs text-mist-dim">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-mist">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
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
            <div className="flex justify-between border-t border-white/10 pt-2 text-lg font-semibold text-mist">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
