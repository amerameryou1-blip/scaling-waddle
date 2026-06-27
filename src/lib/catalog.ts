// Shared product types, constants & STATIC catalog data with NO database
// dependency. Safe to import from both server and client components.
//
// To re-enable a database later, replace the helpers in `src/lib/data.ts`
// (which read from `PRODUCTS` below) with real queries.

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  story: string | null;
  price: string;
  compareAtPrice: string | null;
  category: string;
  image: string;
  accent: string;
  material: string | null;
  dimensions: string | null;
  edition: string | null;
  featured: boolean;
  inStock: boolean;
};

export const CATEGORY_LABELS: Record<string, string> = {
  kintsugi: "Kintsugi",
  mosaic: "Mosaic",
  sculpture: "Sculpture",
  "wall-art": "Wall Art",
};

export const CATEGORIES = [
  { key: "kintsugi", label: "Kintsugi" },
  { key: "mosaic", label: "Mosaic" },
  { key: "sculpture", label: "Sculpture" },
  { key: "wall-art", label: "Wall Art" },
] as const;

// ---------------------------------------------------------------------------
// Static catalog. Edit / extend this array to manage the storefront without
// a database. (Swap `src/lib/data.ts` for real queries when you add a DB.)
// ---------------------------------------------------------------------------
export const PRODUCTS: ProductRow[] = [
  {
    id: "aurelian-vessel",
    slug: "aurelian-vessel",
    name: "Aurelian Vessel",
    tagline: "Cracked glass, sealed in molten gold",
    description:
      "A hand-blown vessel fractured on purpose, then reborn: every seam traced with flowing 24k gold resin. The Aurelian turns damage into its most precious feature, glowing like trapped sunlight.",
    story:
      "We shattered this vessel the morning it cooled, then spent a week guiding gold through the fault lines. What was broken became the whole point.",
    price: "880",
    compareAtPrice: "1100",
    category: "kintsugi",
    image: "/images/aurelian-vessel.jpg",
    accent: "gold",
    material: "Hand-blown glass · 24k gold resin",
    dimensions: "Ø 18 × H 26 cm",
    edition: "Edition of 12",
    featured: true,
    inStock: true,
  },
  {
    id: "phoenix-ascendant",
    slug: "phoenix-ascendant",
    name: "Phoenix Ascendant",
    tagline: "From fracture, fire takes flight",
    description:
      "A wide amber platter riven with bold golden cracks that fan outward like a phoenix mid-flight. Warm, defiant, and impossible to look away from on a sunlit table.",
    story:
      "Inspired by the moment after the fall — when the shards are still glowing. The cracks here aren't repairs; they're wings.",
    price: "980",
    compareAtPrice: null,
    category: "kintsugi",
    image: "/images/phoenix-ascendant.jpg",
    accent: "gold",
    material: "Amber glass · gold-leaf kintsugi",
    dimensions: "Ø 34 × H 8 cm",
    edition: "Edition of 10",
    featured: true,
    inStock: true,
  },
  {
    id: "prism-bloom",
    slug: "prism-bloom",
    name: "Prism Bloom",
    tagline: "A garden shattered into light",
    description:
      "Hundreds of iridescent shards arranged into an abstract bloom that shifts color as you move past it. By day it's a flower; by candlelight it's a constellation.",
    story:
      "Cut from a single broken stained-glass window, sorted by the way each piece caught the afternoon sun.",
    price: "540",
    compareAtPrice: null,
    category: "mosaic",
    image: "/images/prism-bloom.jpg",
    accent: "pink",
    material: "Iridescent shard mosaic · oak frame",
    dimensions: "60 × 60 cm",
    edition: "Open edition",
    featured: true,
    inStock: true,
  },
  {
    id: "tide-mirror",
    slug: "tide-mirror",
    name: "Tide Mirror",
    tagline: "The shoreline, turned to glass",
    description:
      "A round mirror ringed with broken glass in deep teal, aqua, and seafoam — a frozen wave you can hang on the wall and walk into.",
    story:
      "Collected from fragments of a dozen coastal-blue bottles, tumbled until the edges were soft as sea glass.",
    price: "460",
    compareAtPrice: null,
    category: "mosaic",
    image: "/images/tide-mirror.jpg",
    accent: "cyan",
    material: "Coastal-hue shard mosaic · round mirror",
    dimensions: "Ø 50 cm",
    edition: "Open edition",
    featured: false,
    inStock: true,
  },
  {
    id: "aurora-veil",
    slug: "aurora-veil",
    name: "Aurora Veil",
    tagline: "The northern lights, caught in glass",
    description:
      "A large backlit panel of iridescent shards arranged in a flowing aurora of teal, violet, and rose. The edges glow when lit from behind — a private sky for your wall.",
    story:
      "Assembled shard by shard over a fortnight, each piece angled to send light in a different direction.",
    price: "1240",
    compareAtPrice: null,
    category: "wall-art",
    image: "/images/aurora-veil.jpg",
    accent: "cyan",
    material: "Backlit iridescent glass panel",
    dimensions: "120 × 80 cm",
    edition: "Edition of 8",
    featured: true,
    inStock: true,
  },
  {
    id: "shardfall",
    slug: "shardfall",
    name: "Shardfall",
    tagline: "Light, suspended in fragments",
    description:
      "A sculptural chandelier of suspended glass shards that catch and scatter light into slow-moving rainbows across the room. Quietly kinetic, endlessly mesmerizing.",
    story:
      "Our signature piece. Each shard hangs at a height tuned so the room is never the same color twice in a day.",
    price: "2890",
    compareAtPrice: null,
    category: "sculpture",
    image: "/images/shardfall-chandelier.jpg",
    accent: "violet",
    material: "Suspended glass shards · brushed brass",
    dimensions: "Ø 45 × H 95 cm",
    edition: "Made to order",
    featured: true,
    inStock: true,
  },
];

export function findProductBySlug(slug: string): ProductRow | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
