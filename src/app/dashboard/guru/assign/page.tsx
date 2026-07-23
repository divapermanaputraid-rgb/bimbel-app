import { createClient } from "@/lib/supabase/server";
import { WizardForm } from "./wizard-form";

export default async function AssignPage() {
  const supabase = await createClient();
  const { data: students } = await supabase.from("users").select("id, nama, kelas, level").eq("role", "siswa").order("nama");
  const { data: subjects } = await supabase.from("subjects").select("id, nama, kelas");
  const { data: materials } = await supabase.from("materials").select("id, judul, kelas, subject_id").order("urutan");

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-slate-800">Assign Tugas Baru</h2>
      <p className="text-slate-500 mb-8">Pilih siswa dan materi, sistem akan otomatis memilihkan soal yang sesuai dengan level mereka.</p>
      
      <WizardForm 
        students={students || []} 
        subjects={subjects || []} 
        materials={materials || []} 
      />
    </div>
  );
}
