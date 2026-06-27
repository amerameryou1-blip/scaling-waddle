"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { classNames } from "@/lib/format";
import { CartIcon } from "@/components/icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collection" },
  { href: "/atelier", label: "Atelier" },
  { href: "/about", label: "Story" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={classNames(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-ink/70 backdrop-blur-xl py-3"
          : "border-b border-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center">
            <span className="absolute inset-0 rotate-45 rounded-[0.6rem] bg-gradient-to-br from-prism-cyan via-prism-violet to-prism-pink opacity-90 transition-transform duration-500 group-hover:rotate-[135deg]" />
            <span className="absolute inset-[3px] rotate-45 rounded-[0.45rem] bg-ink" />
            <span className="relative h-2 w-2 rounded-full bg-white shadow-[0_0_12px_2px_rgba(255,255,255,0.7)]" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-mist">
            Shardlight
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={classNames(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-white" : "text-mist-soft hover:text-white"
                )}
              >
                {active && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-white/10" />
                )}
                {l.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            className="group relative flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-mist transition-all hover:border-white/25 hover:bg-white/10"
            aria-label="Open cart"
          >
            <CartIcon className="h-4 w-4 text-mist-soft group-hover:text-white" />
            <span className="hidden sm:inline">Cart</span>
            <span className="relative">
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gradient-to-br from-prism-violet to-prism-pink px-1 text-[11px] font-semibold text-white">
                {count}
              </span>
            </span>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/5 text-mist md:hidden"
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={classNames(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={classNames(
                  "block h-0.5 w-5 bg-current transition-opacity",
                  open && "opacity-0"
                )}
              />
              <span
                className={classNames(
                  "block h-0.5 w-5 bg-current transition-transform",
                  open && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={classNames(
          "overflow-hidden px-5 transition-all duration-500 md:hidden",
          open ? "max-h-96 pt-4 pb-2 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="glass-strong space-y-1 rounded-2xl p-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block rounded-xl px-4 py-3 text-base font-medium text-mist-soft transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
