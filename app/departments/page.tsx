
import { getDepartments } from "@/lib/api/met";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 86400; // ISR 24h

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  return (
    <>
      <Navbar />
      <main className="pt-[88px] pb-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h1 className="font-display text-4xl font-bold mb-3">
              Departamentos
            </h1>
            <p className="text-[15px] text-muted-foreground leading-relaxed">
              Explorá la colección por departamento. Cada uno agrupa obras de
              distintas épocas y culturas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Link key={dept.departmentId} href={`/departments/${dept.departmentId}`}>
                <Card className="bg-card border-border hover:border-gold/20 hover:bg-secondary/50 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
                  <CardContent className="flex items-center gap-4 p-5">
                    <div className="font-mono text-2xl font-semibold text-gold min-w-[56px] text-center">
                      {dept.departmentId}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{dept.displayName}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}