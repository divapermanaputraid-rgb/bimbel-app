import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { studentId, message } = await req.json();
  if (!studentId) return NextResponse.json({ error: "studentId required" }, { status: 400 });

  await supabase.from("notifications").insert({
    student_id: studentId,
    type: "semangat",
    title: "💪 Semangat dari Kak Diva!",
    message: message || "Kamu pasti bisa! Ayo coba lagi! 🌟",
    is_read: false
  });

  return NextResponse.json({ success: true });
}
