"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center max-w-md">
        <AlertTriangle className="w-12 h-12 text-gold mx-auto mb-4" />
        <h2 className="font-display text-2xl font-bold mb-3">
          Algo salió mal
        </h2>
        <p className="text-muted-foreground mb-8">
          No pudimos cargar los datos. Esto puede ser un problema temporal
          con la API del Met Museum.
        </p>
        <Button
          onClick={reset}
          className="bg-gold text-background hover:bg-gold-light font-semibold rounded-xl"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Intentar de nuevo
        </Button>
      </div>
    </div>
  );
}