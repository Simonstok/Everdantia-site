---
// src/pages/api/subscribe.astro
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);

const req = Astro.request;
const body = await req.json();
const { email } = body;

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
---
