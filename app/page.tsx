/* src/app/page.tsx */

import { Suspense } from "react";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/Stats-bar";
import {
  Highlights,
  HighlightsSkeleton,
} from "@/components/sections/Highlights";
import { SearchSection } from "@/components/sections/Search-section";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        {/* ISR — se revalida cada hora */}
        <Hero />

        {/* ISR — se revalida cada 24h */}
        <StatsBar />

        {/* STREAMING — el skeleton se muestra inmediatamente,
            los datos llegan por streaming y reemplazan el skeleton */}
        <Suspense fallback={<HighlightsSkeleton />}>
          <Highlights />
        </Suspense>

        {/* CLIENT — búsqueda interactiva, sin SSR */}
        <SearchSection />
      </main>

      <Footer />
    </>
  );
}