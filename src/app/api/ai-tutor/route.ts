import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { groqChat, ChatMessage } from "@/lib/groq-client";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { message, materiId } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // 1. Get User Profile
    const { data: profile } = await supabase
      .from("users")
      .select("nama, kelas")
      .eq("id", user.id)
      .single();

    const studentName = profile?.nama || "Siswa";
    const studentClass = profile?.kelas || "SD";

    // 2. Get Material Context
    let materialContext = "";
    if (materiId) {
      const { data: material } = await supabase
        .from("materials")
        .select("judul, deskripsi")
        .eq("id", materiId)
        .single();

      if (material) {
        materialContext = `Topik yang sedang dipelajari: ${material.judul}. Deskripsi: ${material.deskripsi}.`;
      }
    }

    // 3. Build System Prompt
    const systemPrompt = `Kamu adalah Tutor AI pintar dan ramah bernama "Kak AI" yang membantu siswa SD belajar.
Nama siswa: ${studentName}.
Kelas: ${studentClass}.
${materialContext}

Aturan:
1. Jawab dengan bahasa Indonesia yang SANGAT mudah dipahami anak usia SD.
2. Gunakan emoji yang ramah dan ceria.
3. Jangan pernah memberikan jawaban langsung jika itu soal matematika/hitungan. Beri petunjuk atau langkah-langkah agar siswa berpikir.
4. Jawaban maksimal 2-3 paragraf pendek.
5. Bersikaplah suportif dan memotivasi.`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ];

    // 4. Call Groq
    const result = await groqChat(messages);

    // 5. Log to DB
    await supabase.from("ai_chat_logs").insert({
      student_id: user.id,
      material_id: materiId || null,
      pertanyaan: message,
      jawaban_ai: result.reply,
      model: result.model,
      tokens_used: result.tokensUsed
    });

    return NextResponse.json({ reply: result.reply });

  } catch (err: unknown) {
    console.error("AI Tutor Route Error:", err);
    return NextResponse.json({
      error: "Maaf ya, Kak AI sedang istirahat sebentar. Coba lagi nanti! 😴"
    }, { status: 500 });
  }
}
