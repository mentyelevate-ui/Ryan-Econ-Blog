import type { Metadata } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Renfro | Economics & Market Research",
  description:
    "Open notebook by Ryan Renfro — documenting macro research, tracking mock portfolios, and building software for wealth advisory.",
  keywords: ["economics", "market research", "portfolio management", "wealth advisory"],
  openGraph: {
    title: "Ryan Renfro | Economics & Market Research",
    description: "An open notebook documenting macro research, simulated portfolios, and software engineering.",
    url: "https://renfrocapital.com",
    siteName: "Ryan Renfro",
    images: [
      {
        url: "/sharing-card.png",
        width: 1200,
        height: 630,
        alt: "Ryan Renfro Economics & Market Research",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Renfro | Economics & Market Research",
    description: "Documenting macro research, simulated portfolios, and software engineering.",
    images: ["/sharing-card.png"],
  },
  icons: {
    icon: "/favicon-rr.png",
    shortcut: "/favicon-rr.png",
    apple: "/favicon-rr.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased font-sans`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
