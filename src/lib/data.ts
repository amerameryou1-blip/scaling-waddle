// Frontend-only data layer. Reads from the static catalog (no database).
// When you add a database later, swap these bodies for real queries —
// every page imports the same function names, so nothing else changes.

import { PRODUCTS, findProductBySlug, type ProductRow } from "@/lib/catalog";

export type { ProductRow };
export { CATEGORY_LABELS } from "@/lib/catalog";

export function getAllProducts(): ProductRow[] {
  // Sort by category, then keep a stable order for display.
  const order: Record<string, number> = {
    kintsugi: 0,
    mosaic: 1,
    sculpture: 2,
    "wall-art": 3,
  };
  return [...PRODUCTS].sort(
    (a, b) => (order[a.category] ?? 99) - (order[b.category] ?? 99)
  );
}

export function getFeaturedProducts(): ProductRow[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): ProductRow | null {
  return findProductBySlug(slug);
}

export const ALL_SLUGS = PRODUCTS.map((p) => p.slug);
