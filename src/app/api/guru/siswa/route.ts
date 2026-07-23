import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Get students
  const { data: students } = await supabase
    .from("users")
    .select("id, nama, kelas, level, xp_total")
    .eq("role", "siswa")
    .order("nama");

  return NextResponse.json({ data: students || [] });
}
