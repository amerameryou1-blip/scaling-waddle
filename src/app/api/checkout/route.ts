// Frontend-only checkout (mock). Validates the cart and shipping details,
// then returns a generated order reference. Nothing is persisted.
//
// When you add a database later, persist the order here (see the git history
// of this file for the original Drizzle implementation).

import { PRODUCTS } from "@/lib/catalog";
import { NextResponse } from "next/server";

function makeRef() {
  const seg = () =>
    Math.random().toString(16).slice(2, 8).toUpperCase().padEnd(6, "0");
  return "SL-" + seg();
}

export async function POST(req: Request) {
  let body: {
    customerName?: string;
    email?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    items?: Array<{ slug?: string; quantity?: number }>;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const customerName = (body.customerName ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const address = (body.address ?? "").trim();
  const city = (body.city ?? "").trim();
  const postalCode = (body.postalCode ?? "").trim();
  const country = (body.country ?? "United States").trim();
  const items = Array.isArray(body.items) ? body.items : [];

  if (!customerName || !email || !address || !city || !postalCode) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const normalized = items
    .map((i) => ({
      slug: (i.slug ?? "").trim(),
      quantity: Math.max(1, Math.min(99, Math.floor(Number(i.quantity) || 0))),
    }))
    .filter((i) => i.slug && i.quantity > 0);

  if (normalized.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Server-side price validation against the static catalog.
  const bySlug = new Map(PRODUCTS.map((p) => [p.slug, p]));
  const lines = normalized
    .map((i) => {
      const p = bySlug.get(i.slug);
      if (!p) return null;
      return { price: parseFloat(p.price), quantity: i.quantity };
    })
    .filter((x): x is { price: number; quantity: number } => x !== null);

  if (lines.length === 0) {
    return NextResponse.json(
      { error: "No valid items found." },
      { status: 400 }
    );
  }

  const subtotal = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);
  const shipping = subtotal > 750 ? 0 : 35;
  const total = subtotal + shipping;

  return NextResponse.json({
    ok: true,
    orderRef: makeRef(),
    summary: {
      subtotal,
      shipping,
      total,
      country,
    },
  });
}
