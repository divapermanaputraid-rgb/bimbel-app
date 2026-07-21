import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { QuizClient } from "./quiz-client";

export default async function LatihanPage({ params }: { params: { assignmentId: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Fetch assignment
  const { data: assignment } = await supabase
    .from("assignments")
    .select("student_id, question_ids, status, materials(judul)")
    .eq("id", params.assignmentId)
    .single();

  if (!assignment || assignment.student_id !== user.id) {
    redirect("/dashboard/siswa");
  }

  if (assignment.status === "completed") {
    return (
      <main className="min-h-screen max-w-lg mx-auto p-4 flex flex-col justify-center text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Tugas Selesai</h1>
        <p className="text-slate-500 mb-6">Kamu sudah mengerjakan latihan ini.</p>
        <a href="/dashboard/siswa" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl">Kembali</a>
      </main>
    );
  }

  // Fetch questions
  const { data: questions } = await supabase
    .from("questions")
    .select("id, soal, pilihan")
    .in("id", assignment.question_ids);

  type AssignmentData = {
    student_id: string;
    question_ids: number[];
    status: string;
    materials: { judul: string } | { judul: string }[] | null;
  };

  const typedAssignment = assignment as unknown as AssignmentData;

  const materialTitle = Array.isArray(typedAssignment.materials)
    ? typedAssignment.materials[0]?.judul
    : typedAssignment.materials?.judul || "Latihan";

  return (
    <main className="min-h-screen max-w-lg mx-auto p-4 bg-slate-50 pb-12">
      <QuizClient
        assignmentId={params.assignmentId}
        materialTitle={materialTitle}
        questions={questions || []}
      />
    </main>
  );
}
