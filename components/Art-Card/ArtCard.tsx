/* src/components/ui/art-card.tsx */

import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MetObject } from "@/lib/api/types";
import { formatArtist, truncate } from "@/lib/utils/utils";

interface ArtCardProps {
  object: MetObject;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  onClick?: () => void;
}

export function ArtCard({
  object,
  isFavorite = false,
  onToggleFavorite,
  onClick,
}: ArtCardProps) {
  return (
    <div
      className="group bg-card rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-gold/20 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.4)]"
      onClick={onClick}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img
          src={object.primaryImageSmall || object.primaryImage}
          alt={object.title || "Obra de arte"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Departamento badge */}
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-background/70 backdrop-blur-md border-border text-[10px] font-semibold uppercase tracking-wider"
        >
          {truncate(object.department, 20)}
        </Badge>

        {/* Botón favorito */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(object.objectID);
            }}
            className={cn(
              "absolute top-3 right-3 w-8 h-8 rounded-lg bg-background/70 backdrop-blur-md border border-border flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100",
              isFavorite
                ? "text-pink-500 border-pink-500/30 opacity-100"
                : "text-muted-foreground hover:text-pink-500 hover:border-pink-500/30"
            )}
          >
            <Heart
              className="w-3.5 h-3.5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        )}

        {/* Gradiente inferior */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold leading-snug line-clamp-2 mb-1.5">
          {object.title || "Sin título"}
        </h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <span>{truncate(formatArtist(object), 30)}</span>
          {object.objectDate && (
            <>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>{object.objectDate}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}