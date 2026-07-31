import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subject = searchParams.get('subject');
  const kelas = searchParams.get('kelas');
  
  if (!subject || !kelas) {
    return Response.json({ error: 'subject and kelas required' }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .eq('subject_id', subject)
    .eq('kelas', kelas)
    .eq('is_active', true)
    .order('urutan'); // Note order_index vs urutan - db uses urutan!
  
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ data });
}
