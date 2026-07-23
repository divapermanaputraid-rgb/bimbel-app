import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (profile?.role !== "guru") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { studentId, newLevel } = await req.json();

  if (!studentId || !newLevel) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  try {
    const { data: st } = await supabase.from("users").select("level").eq("id", studentId).single();
    
    await supabase.from("users").update({ level: newLevel }).eq("id", studentId);
    
    await supabase.from("level_history").insert({
      student_id: studentId,
      level_lama: st?.level || 1,
      level_baru: newLevel,
      alasan: "manual by guru"
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("API update level error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
