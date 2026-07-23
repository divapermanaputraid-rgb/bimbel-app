import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { notificationId } = await req.json();

    if (!notificationId) {
      // Tandai semua sebagai telah dibaca
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("student_id", user.id)
        .eq("is_read", false);
    } else {
      // Tandai satu saja
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notificationId)
        .eq("student_id", user.id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("API Notifications Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
