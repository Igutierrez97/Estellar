export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-card rounded-3xl border border-border overflow-hidden max-w-5xl mx-auto">
      <div className="aspect-[3/4] md:aspect-auto bg-secondary animate-shimmer bg-[length:200%_100%]" />
      <div className="p-8 md:p-10 space-y-6">
        <div className="h-4 w-24 bg-secondary rounded-md animate-shimmer bg-[length:200%_100%]" />
        <div className="h-8 w-full bg-secondary rounded-md animate-shimmer bg-[length:200%_100%]" />
        <div className="h-4 w-48 bg-secondary rounded-md animate-shimmer bg-[length:200%_100%]" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-4 w-full bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
          ))}
        </div>
        <div className="flex-1 space-y-2 pt-6 border-t border-border">
          <div className="h-3 w-full bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-3 w-5/6 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-3 w-4/6 bg-secondary rounded animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}