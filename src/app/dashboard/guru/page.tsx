import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "../siswa/logout-button";

export default async function GuruDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("users")
    .select("nama, role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "guru") {
    redirect("/dashboard/siswa");
  }

  return (
    <main className="mx-auto min-h-screen max-w-lg p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-indigo-700 mb-2">👨‍🏫 Dashboard Guru</h1>
      <p className="text-slate-500 mb-6">Halo {profile.nama}! Fitur monitoring dan input tugas sedang disiapkan ya.</p>
      <LogoutButton />
    </main>
  );
}
