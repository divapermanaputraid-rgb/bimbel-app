import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LatihanContainer } from "@/components/latihan/LatihanContainer";

export default async function LatihanUnitPage({ params }: { params: { "unit-id": string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("material_id", params["unit-id"])
    .order("id", { ascending: true });

  if (!questions || questions.length === 0) {
    redirect("/dashboard/siswa/practice");
  }

  return <LatihanContainer unitId={params["unit-id"]} questions={questions} />;
}
