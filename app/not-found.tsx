/* src/app/not-found.tsx */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer/Footer";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <main className="pt-[88px] pb-20 px-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="font-mono text-8xl font-bold text-gold/20 mb-4">404</div>
          <h1 className="font-display text-3xl font-bold mb-3">
            Obra no encontrada
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Esta obra no existe o fue removida de la colección. Probá con otra
            búsqueda o explorá las obras destacadas.
          </p>
          <Button
            asChild
            className="bg-gold text-background hover:bg-gold-light font-semibold rounded-xl"
          >
            <Link href="/">
              <Compass className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}