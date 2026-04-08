import { getRandomObjectID } from "@/lib/api/met";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function RandomPage() {
  const id = await getRandomObjectID();
  redirect(`/object/${id}`);
}