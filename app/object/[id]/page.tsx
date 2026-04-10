import { getObject, getHighlightIDs } from "@/lib/api/met";
import { notFound } from "next/navigation";
import { ObjectDetail } from "@/components/object/object-detail";
import { DetailSkeleton } from "@/components/detail-Skeleton/DetailSkeleton";
import { Suspense } from "react";

// ISR — genera páginas estáticas para los highlights
export async function generateStaticParams() {
  const ids = await getHighlightIDs();
  return ids.slice(0, 20).map((id) => ({ id: String(id) }));
}

// Dynamic metadata para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  const obj = await getObject(+id);
  if (!obj) return { title: "Obra no encontrada — STELLAR" };

  return {
    title: `${obj.title} — STELLAR`,
    description: `${obj.title} por ${obj.artistDisplayName || "Artista desconocido"
      }. ${obj.objectDate}. ${obj.medium}. Metropolitan Museum of Art.`,
    openGraph: {
      images: obj.primaryImage ? [obj.primaryImage] : [],
    },
  };
}

export default async function ObjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  return (
    <>
      <main className="pt-22 pb-20 px-8">
        <Suspense fallback={<DetailSkeleton />}>
          <ObjectDetailWrapper id={Number(id)} />
        </Suspense>
      </main>
    </>
  );
}

async function ObjectDetailWrapper({ id }: { id: number }) {
  const obj = await getObject(id);
  if (!obj || !obj.primaryImage) notFound();

  return <ObjectDetail object={obj} />;
}