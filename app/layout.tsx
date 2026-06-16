import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "Lumina Skin Studio | Premium Personalized Facial Skincare",
  description: "Premium modern beauty salon website for personalized facial treatments: hydration, acne, brightening, anti-aging, and sensitive repair with WhatsApp booking.",
  openGraph: {
    title: "Lumina Skin Studio",
    description: "Personalized facial skincare treatments for calm, luminous, confident skin.",
    images: ["/images/hero-bg.svg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
