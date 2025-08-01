import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

export async function post({ request }) {
  const data = await request.json();
  const { email } = data;

  const { error } = await supabase
    .from('whitelist_emails')
    .insert({ email });

  if (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
}
