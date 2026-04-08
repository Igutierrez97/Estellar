/* src/components/object/object-detail.tsx */

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ExternalLink, Heart } from "lucide-react";
import { MetObject } from "@/lib/api/types";
import { formatArtist } from "@/lib/utils/utils";

interface ObjectDetailProps {
  object: MetObject;
}

export function ObjectDetail({ object }: ObjectDetailProps) {
  const artist = formatArtist(object);

  const metaItems = [
    { label: "Fecha", value: object.objectDate || "Desconocida" },
    { label: "Medio", value: object.medium || "No especificado" },
    { label: "Dimensiones", value: object.dimensions || "No disponible" },
    { label: "Clasificación", value: object.classification || "—" },
  ];

  if (object.culture) metaItems.push({ label: "Cultura", value: object.culture });
  if (object.period) metaItems.push({ label: "Período", value: object.period });
  if (object.country) metaItems.push({ label: "Origen", value: `${object.city ? object.city + ", " : ""}${object.country}` });

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="text-muted-foreground hover:text-foreground -ml-4 mb-6"
      >
        <Link href="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver
        </Link>
      </Button>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-card rounded-3xl border border-border overflow-hidden">
        {/* Imagen */}
        <div className="relative">
          <img
            src={object.primaryImage}
            alt={object.title || "Obra de arte"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="p-8 md:p-10 flex flex-col">
          <Badge
            variant="secondary"
            className="self-start bg-gold/10 text-gold border-gold/15 text-[11px] font-semibold uppercase tracking-wider mb-5"
          >
            {object.department}
          </Badge>

          <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight mb-2">
            {object.title || "Sin título"}
          </h1>

          <p className="text-gold text-[15px] font-medium mb-6">
            {artist}
          </p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
            {metaItems.map((item) => (
              <div key={item.label}>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                  {item.label}
                </div>
                <div className="text-sm font-medium">{item.value}</div>
              </div>
            ))}
          </div>

          {/* Descripción / Crédito */}
          {object.creditLine && (
            <>
              <Separator className="bg-border my-4" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                {object.creditLine}
              </p>
            </>
          )}

          {object.tags && object.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {object.tags.slice(0, 6).map((tag) => (
                <Badge
                  key={tag.term}
                  variant="outline"
                  className="text-[10px] font-normal border-border text-muted-foreground"
                >
                  {tag.term}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-auto pt-8">
            <Button
              asChild
              size="sm"
              className="bg-gold text-background hover:bg-gold-light font-semibold rounded-xl"
            >
              <a
                href={object.objectURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" />
                Ver en Met Museum
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}