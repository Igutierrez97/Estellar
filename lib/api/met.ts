import { MetObject, Department, MetSearchResponse } from "./types";

const BASE_URL_SERVER = process.env.BASE_URL 
const BASE_URL_CLIENT = process.env.NEXT_PUBLIC_BASE_URL 

/** ISR — Obras destacadas: revalida cada 1 hora */
export async function getHighlightIDs(): Promise<number[]> {
  const res = await fetch(
    `${BASE_URL_SERVER}/search?hasImages=true&isHighlight=true&q=*`,
    { next: { revalidate: 3600 } }
  );
  const data: MetSearchResponse = await res.json();
  return data.objectIDs.slice(0, 20);
}

/** ISR — Un objeto: revalida cada 7 días (las obras no cambian) */
export async function getObject(id: number): Promise<MetObject | null> {
  const res = await fetch(`${BASE_URL_SERVER}/objects/${id}`, {
    next: { revalidate: 604800 },
  });
  if (!res.ok) return null;
  return res.json();
}

/** ISR — Múltiples objetos en paralelo */
export async function getMultipleObjects(
  ids: number[]
): Promise<MetObject[]> {
  const objects = await Promise.all(ids.map((id) => getObject(id)));
  return objects.filter(
    (obj): obj is MetObject =>
      obj !== null && !!obj.primaryImage && obj.primaryImage !== ""
  );
}

/** ISR — Departamentos: revalida cada 24 horas */
export async function getDepartments(): Promise<Department[]> {
  const res = await fetch(`${BASE_URL_SERVER}/departments`, {
    next: { revalidate: 86400 },
  });
  const data = await res.json();
  return data.departments;
}

/** ISR — Obras por departamento */
export async function getObjectsByDepartment(
  deptId: number,
  offset = 0,
  limit = 20
): Promise<{ total: number; objectIDs: number[] }> {
  const res = await fetch(
    `${BASE_URL_SERVER}/objects?departmentIds=${deptId}&hasImages=true`,
    { next: { revalidate: 3600 } }
  );
  const data: MetSearchResponse = await res.json();
  return {
    total: data.total,
    objectIDs: data.objectIDs.slice(offset, offset + limit),
  };
}

/** Client — Búsqueda sin cache (llamar desde Client Components) */
export async function searchObjectsClient(
  query: string
): Promise<MetSearchResponse> {
  const res = await fetch(
    `${BASE_URL_CLIENT}/search?hasImages=true&q=${encodeURIComponent(query)}`
  );
  return res.json();
}

/** Client — Un objeto sin cache */
export async function getObjectClient(
  id: number
): Promise<MetObject | null> {

  const res = await fetch(`${BASE_URL_CLIENT}/objects/${id}`);
  if (!res.ok) return null;
  return res.json();
}

/** Client — Obra aleatoria (usa el total de objetos con imagen) */
export async function getRandomObjectID(): Promise<number> {
  const res = await fetch(
    `${BASE_URL_CLIENT}/search?hasImages=true&q=sun`, // query genérico para tener resultados
    { cache: "no-store" }
  );
  const data: MetSearchResponse = await res.json();
  const randomIndex = Math.floor(Math.random() * Math.min(data.total, 1000));
  return data.objectIDs[randomIndex];
}