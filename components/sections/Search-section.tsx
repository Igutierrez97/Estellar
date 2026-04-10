/* src/components/sections/search-section.tsx */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchObjectsClient, getObjectClient } from "@/lib/api/met";
import { useDebounce } from "@/hooks/use-debounce";
import { MetObject } from "@/lib/api/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { ArtCard } from "@/components/art-Card/ArtCard";
import { ArtCardSkeleton } from "@/components/art-Card/Skeleton";
import { useFavorites } from "@/hooks/use-favorite";

const quickFilters = [
  "Pinturas",
  "Esculturas",
  "Fotografías",
  "Textiles",
  "Cerámica",
];

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MetObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const debounced = useDebounce(query, 350);
  const router = useRouter();
  const { isFavorite, toggle } = useFavorites();
  const abortRef = useRef<AbortController | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q || q.length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchObjectsClient(q);
      const objects = await Promise.all(
        data.objectIDs.slice(0, 12).map((id) =>
          getObjectClient(id).catch(() => null)
        )
      );
      setResults(
        objects.filter(
          (o): o is MetObject => o !== null && !!o.primaryImage
        )
      );
    } catch {
      // abort o error de red
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    doSearch(debounced);
  }, [debounced, doSearch]);

  // ⌘K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("stellar-search")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section id="search-section" className="py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-display text-4xl font-bold mb-3">
            Buscá cualquier obra
          </h2>
          <p className="text-[15px] text-muted-foreground leading-relaxed">
            Por título, artista, período o material. Más de 490,000 obras
            indexadas en tiempo real.
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-xl mx-auto mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            id="stellar-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Ej: "Monet", "sunflowers", "Egyptian"...'
            className="pl-11 pr-10 h-12 rounded-xl bg-secondary border-border focus:border-gold/50 focus:ring-gold/10 text-base"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {quickFilters.map((f) => (
            <Button
              key={f}
              variant="ghost"
              size="sm"
              onClick={() => {
                setActiveFilter(activeFilter === f ? null : f);
                setQuery(activeFilter === f ? "" : f);
              }}
              className={`rounded-full text-xs font-medium px-4 ${
                activeFilter === f
                  ? "bg-gold/10 text-gold border-gold/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </Button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-[1440px] mx-auto">
            {Array.from({ length: 8 }).map((_, i) => (
              <ArtCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Results */}
        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {results.map((obj) => (
              <ArtCard
                key={obj.objectID}
                object={obj}
                isFavorite={isFavorite(obj.objectID)}
                onToggleFavorite={toggle}
                onClick={() => router.push(`/object/${obj.objectID}`)}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && query.length >= 2 && results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No se encontraron obras para &quot;{query}&quot;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}