/* src/components/sections/hero.tsx */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Compass, Shuffle } from "lucide-react";
import { getHighlightIDs, getMultipleObjects } from "@/lib/api/met";
import { ImageWithFallback } from "@/components/image-with-fallback/Image-with-fallback";
import { truncate } from "@/lib/utils/utils";

// Server Component — fetch dinámico, nunca hardcodeado
export async function Hero() {
  // Fetch real desde la API del Met
  const ids = await getHighlightIDs();
  const objects = await getMultipleObjects(ids.slice(0, 4));

  // Si no hay imágenes, usamos placeholders
  const mosaicItems = objects.length >= 4
    ? objects.slice(0, 4)
    : [
        null, null, null, null
      ];

  const overlayData = [
    { title: "Retrato de Juan de Pareja", sub: "Diego Velázquez, 1650" },
    { title: "Wheat Field with Cypresses", sub: "Van Gogh, 1889" },
    { title: "Bridge over a Pond", sub: "Monet, 1899" },
    { title: "Colección del Met", sub: "Explorar obras destacadas" },
  ];

  return (
    <section className="pt-[140px] pb-20 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 50%, hsl(var(--gold)/0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 80% 30%, hsl(262 83% 58%/0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gold" />
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">
                Met Museum Collection
              </span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[64px] font-bold leading-[1.05] tracking-tight mb-6">
              Explorá medio millón de{" "}
              <em className="text-gold not-italic">obras de arte</em>
            </h1>

            <p className="text-[17px] leading-[1.8] text-muted-foreground max-w-[440px] mb-10">
              Accedé a la colección completa del Metropolitan Museum of Art.
              Pinturas, esculturas, textiles y más — desde el antiguo Egipto
              hasta el arte contemporáneo.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-gold to-gold-dark text-background hover:shadow-[0_8px_24px_-4px_hsl(var(--gold)/0.35)] hover:-translate-y-0.5 transition-all font-semibold rounded-xl"
              >
                <Link href="#highlights">
                  <Compass className="w-4 h-4 mr-2" />
                  Empezar a explorar
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-border/60 hover:border-gold/40 hover:text-gold rounded-xl"
              >
                <Link href="/random">
                  <Shuffle className="w-4 h-4 mr-2" />
                  Obra aleatoria
                </Link>
              </Button>
            </div>
          </div>

          {/* Mosaic — imágenes dinámicas con fallback */}
          <div className="grid grid-cols-2 grid-rows-[200px_200px_160px] gap-3">
            {/* Item 1 — row-span-2 */}
            <div className="row-span-2 rounded-2xl overflow-hidden relative group">
              <ImageWithFallback
                src={mosaicItems[0]?.primaryImage || ""}
                alt={mosaicItems[0]?.title || "Obra destacada"}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <p className="font-display text-sm font-semibold">
                  {mosaicItems[0]
                    ? truncate(mosaicItems[0].title, 30)
                    : overlayData[0].title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {mosaicItems[0]
                    ? `${truncate(mosaicItems[0].artistDisplayName || "Artista desconocido", 20)}, ${mosaicItems[0].objectDate || ""}`
                    : overlayData[0].sub}
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="rounded-2xl overflow-hidden relative group">
              <ImageWithFallback
                src={mosaicItems[1]?.primaryImage || ""}
                alt={mosaicItems[1]?.title || "Obra destacada"}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-display text-xs font-semibold">
                  {mosaicItems[1]
                    ? truncate(mosaicItems[1].title, 25)
                    : overlayData[1].title}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {mosaicItems[1]
                    ? `${truncate(mosaicItems[1].artistDisplayName || "", 15)}, ${mosaicItems[1].objectDate || ""}`
                    : overlayData[1].sub}
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="rounded-2xl overflow-hidden relative group">
              <ImageWithFallback
                src={mosaicItems[2]?.primaryImage || ""}
                alt={mosaicItems[2]?.title || "Obra destacada"}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-display text-xs font-semibold">
                  {mosaicItems[2]
                    ? truncate(mosaicItems[2].title, 25)
                    : overlayData[2].title}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {mosaicItems[2]
                    ? `${truncate(mosaicItems[2].artistDisplayName || "", 15)}, ${mosaicItems[2].objectDate || ""}`
                    : overlayData[2].sub}
                </p>
              </div>
            </div>

            {/* Item 4 — col-span-2 */}
            <div className="col-span-2 rounded-2xl overflow-hidden relative group">
              <ImageWithFallback
                src={mosaicItems[3]?.primaryImage || ""}
                alt={mosaicItems[3]?.title || "Obra destacada"}
                className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 z-10">
                <p className="font-display text-xs font-semibold">
                  {mosaicItems[3]
                    ? truncate(mosaicItems[3].title, 35)
                    : overlayData[3].title}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {mosaicItems[3]
                    ? `${truncate(mosaicItems[3].artistDisplayName || "", 25)}, ${mosaicItems[3].objectDate || ""}`
                    : overlayData[3].sub}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}