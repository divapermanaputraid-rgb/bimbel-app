import { redirect } from "next/navigation";

/** Alias path baru → halaman siswa lama */
export default function GuruStudentsPage() {
  redirect("/dashboard/guru/siswa");
}
