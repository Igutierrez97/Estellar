

export function ArtCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="aspect-[3/4] bg-secondary animate-shimmer bg-[length:200%_100%]" />
      <div className="p-4 space-y-2.5">
        <div className="h-3.5 bg-secondary rounded-md w-3/4 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-2.5 bg-secondary rounded-md w-1/2 animate-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  );
}