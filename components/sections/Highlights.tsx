import { getHighlightIDs, getMultipleObjects } from "@/lib/api/met";
import { ArtCard } from "@/components/Art-Card/ArtCard";
import { ArtCardSkeleton } from "@/components/Art-Card/Skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Este componente es async → se usa con <Suspense>
export async function Highlights() {
  const ids = await getHighlightIDs();
  const objects = await getMultipleObjects(ids.slice(0, 8));

  return (
    <section id="highlights" className="py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-4xl font-bold">Obras destacadas</h2>
          <Link
            href="/departments"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-gold hover:gap-3 transition-all"
          >
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {objects.map((obj) => (
            <ArtCard key={obj.objectID} object={obj} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Skeleton que se muestra durante el streaming
export function HighlightsSkeleton() {
  return (
    <section id="highlights" className="py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-end justify-between mb-10">
          <div className="h-10 w-56 bg-secondary rounded-lg animate-shimmer bg-[length:200%_100%]" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ArtCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}