import { StudentNavbar } from "@/components/navbar/StudentNavbar";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {children}
      <StudentNavbar />
    </div>
  );
}
