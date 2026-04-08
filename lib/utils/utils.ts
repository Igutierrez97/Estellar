import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formatea el nombre del artista, maneja null/undefined */
export function formatArtist(obj: {
  artistDisplayName?: string | null;
  constituents?: Array<{ name: string }>;
}): string {
  if (obj.artistDisplayName) return obj.artistDisplayName;
  if (obj.constituents?.length) {
    return obj.constituents.map((c) => c.name).join(", ");
  }
  return "Artista desconocido";
}

/** Trunca texto */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max).trimEnd() + "…";
}

/** Genera placeholder SVG para cuando no hay imagen */
export function imagePlaceholder(width = 400, height = 500): string {
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="none">
      <rect width="${width}" height="${height}" fill="hsl(240,10%,8%)"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="hsl(240,6%,16%)" font-family="sans-serif" font-size="14">Sin imagen</text>
    </svg>`
  )}`;
}