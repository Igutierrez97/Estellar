import { getDepartments, getObjectsByDepartment, getMultipleObjects } from "@/lib/api/met";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { ArtCard } from "@/components/Art-Card/ArtCard";
import { ArtCardSkeleton } from "@/components/Art-Card/Skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export async function generateStaticParams() {
  const depts = await getDepartments();
  return depts.map((d) => ({ id: String(d.departmentId) }));
}

export async function generateMetadata({
   params 
  }: 
  { params: Promise< { id: string }> }) {
    const { id } = await params
  const depts = await getDepartments();
  const dept = depts.find((d) => d.departmentId === Number(id));
  return {
    title: dept ? `${dept.displayName} — STELLAR` : "Departamento — STELLAR",
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  const depts = await getDepartments();
  const dept = depts.find((d) => d.departmentId === Number(id));

  if (!dept) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-[88px] pb-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground -ml-4 mb-8"
          >
            <Link href="/departments">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Departamentos
            </Link>
          </Button>

          <h1 className="font-display text-4xl font-bold mb-2">
            {dept.displayName}
          </h1>

          <Suspense
            fallback={
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ArtCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <DepartmentGrid deptId={dept.departmentId} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}

async function DepartmentGrid({ deptId }: { deptId: number }) {
  const { total, objectIDs } = await getObjectsByDepartment(deptId, 0, 20);
  const objects = await getMultipleObjects(objectIDs);

  return (
    <>
      <p className="text-sm text-muted-foreground mb-8">
        {total.toLocaleString()} obras con imágenes
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {objects.map((obj) => (
          <ArtCard key={obj.objectID} object={obj} />
        ))}
      </div>
    </>
  );
}