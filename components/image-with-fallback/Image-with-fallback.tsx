"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  fill,
  sizes,
  priority = false,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 bg-secondary",
          className
        )}
      >
        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
        <span className="text-xs text-muted-foreground/40">Sin imagen</span>
      </div>
    );
  }

  // Usamos <img> nativo en vez de next/image para evitar
  // problemas con el optimizador de Next y URLs externas inestables
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}