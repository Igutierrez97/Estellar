/* src/components/sections/stats-bar.tsx */

import { getDepartments } from "@/lib/api/met";

export async function StatsBar() {
  // Aprovechamos el fetch de departamentos para el count
  const departments = await getDepartments();

  const stats = [
    { value: "492K+", label: "Obras con imágenes" },
    { value: String(departments.length), label: "Departamentos" },
    { value: "5,000+", label: "Años de historia" },
    { value: "150+", label: "Países representados" },
  ];

  return (
    <section className="py-10 border-y border-border">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-3xl font-semibold text-gold mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}