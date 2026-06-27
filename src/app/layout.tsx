import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Shardlight Studio — Art Born from Broken Glass",
  description:
    "Shardlight is an atelier that transforms shattered glass into luminous, limited-edition art: kintsugi vessels, iridescent mosaics, and prismatic sculptures.",
  keywords: [
    "broken glass art",
    "kintsugi",
    "glass mosaic",
    "handmade decor",
    "artisan glass sculpture",
  ],
  openGraph: {
    title: "Shardlight Studio — Art Born from Broken Glass",
    description:
      "Limited-edition art made from shattered glass. Kintsugi vessels, iridescent mosaics, and prismatic sculptures.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-sans text-mist antialiased">
        <CartProvider>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <CartDrawer />
          <main className="relative">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
