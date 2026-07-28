import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { studentId, unitId, subjectId, kelas } = await req.json();
  if (!studentId || !unitId) return NextResponse.json({ error: "Missing data" }, { status: 400 });

  const { data: existing } = await supabase
    .from("unit_progress")
    .select("id")
    .eq("user_id", studentId)
    .eq("unit_id", unitId)
    .maybeSingle();

  if (existing) {
    await supabase.from("unit_progress").update({ status: "available" }).eq("id", existing.id);
  } else {
    await supabase.from("unit_progress").insert({
      user_id: studentId,
      unit_id: unitId,
      subject_id: subjectId || "k3-bing",
      kelas: kelas || 3,
      status: "available"
    });
  }

  await supabase.from("notifications").insert({
    student_id: studentId,
    type: "unit_unlocked",
    title: "🔓 Unit Baru Terbuka!",
    message: `Kak Diva membuka akses unit ${unitId} untukmu. Ayo belajar!`,
    is_read: false
  });

  return NextResponse.json({ success: true });
}
