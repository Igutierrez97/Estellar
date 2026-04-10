"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ArtCard } from "@/components/art-Card/ArtCard";
import { ArtCardSkeleton } from "@/components/art-Card/Skeleton";
import { useFavorites } from "@/hooks/use-favorite";
import { Button } from "@/components/ui/button";
import { Heart, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FavoritesPage() {
  const router = useRouter();
  const { objects, hydrated, loading, toggle, clearAll } = useFavorites();

  // Antes de hidratar: no mostramos nada para evitar hydration mismatch
  if (!hydrated) {
    return (
      <>
        <main className="pt-22 pb-20 px-8 min-h-screen">
          <div className="max-w-360 mx-auto">
            <div className="h-10 w-56 bg-secondary rounded-lg animate-shimmer  bg-size-[200%_100%] mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <ArtCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </main>
      </>
    );
  }

  // Hidratado, sin favoritos
  if (objects.length === 0 && !loading) {
    return (
      <>
        <main className="pt-[88px] pb-20 px-8 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            {/* Icono grande decorativo */}
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-muted-foreground/40" />
            </div>

            <h1 className="font-display text-3xl font-bold mb-3">
              Sin favoritos aún
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Explorá la colección y tocá el corazón en cualquier obra para
              guardarla acá. Tus favoritos se guardan localmente en tu
              navegador.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                asChild
                className="bg-gold text-background hover:bg-gold-light font-semibold rounded-xl"
              >
                <Link href="/">
                  <Heart className="w-4 h-4 mr-2" />
                  Explorar obras
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-border/60 hover:border-gold/40 hover:text-gold rounded-xl"
              >
                <Link href="/random">
                  Sorprendeme
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Hidratado, con favoritos
  return (
    <>
      <main className="pt-[88px] pb-20 px-8 min-h-screen">
        <div className="max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground -ml-4 mb-4"
              >
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Inicio
                </Link>
              </Button>
              <h1 className="font-display text-4xl font-bold">
                Mis favoritos
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {objects.length}{" "}
                {objects.length === 1 ? "obra guardada" : "obras guardadas"}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={clearAll}
              className="self-start sm:self-auto text-muted-foreground hover:text-destructive hover:border-destructive/30 border-border rounded-xl"
            >
              <Trash2 className="w-3.5 h-3.5 mr-2" />
              Borrar todo
            </Button>
          </div>

          {/* Loading: fetching obras del localStorage */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <ArtCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Grid de favoritos */}
          {!loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {objects.map((obj) => (
                <ArtCard
                  key={obj.objectID}
                  object={obj}
                  isFavorite={true}
                  onToggleFavorite={toggle}
                  onClick={() => router.push(`/object/${obj.objectID}`)}
                />
              ))}
            </div>
          )}

          {/* Nota sobre localStorage */}
          {!loading && objects.length > 0 && (
            <p className="text-xs text-muted-foreground/60 text-center mt-12">
              Los favoritos se guardan en tu navegador. Si limpiás los datos
              del sitio, se pierden.
            </p>
          )}
        </div>
      </main>
    </>
  );
}