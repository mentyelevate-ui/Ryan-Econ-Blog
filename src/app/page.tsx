"use client";

import dynamic from "next/dynamic";
import HeroContent from "@/components/hero/HeroContent";
import HomePortfolioPreview from "@/components/home/HomePortfolioPreview";
import HomeBlogPreview from "@/components/home/HomeBlogPreview";
import HomeAboutPreview from "@/components/home/HomeAboutPreview";

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden">
        <HeroScene />
        <HeroContent />
      </section>

      {/* Portfolio Preview */}
      <HomePortfolioPreview />

      {/* Blog Preview */}
      <HomeBlogPreview />

      {/* About Preview */}
      <HomeAboutPreview />
    </>
  );
}
