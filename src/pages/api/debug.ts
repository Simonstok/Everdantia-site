import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  // Debug endpoint to check environment variables
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  // Only allow access with secret
  if (secret !== 'everdantia2025') {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const debug = {
    hasSupabaseUrl: !!process.env.ANALYTICS_SUPABASE_URL,
    hasAnonKey: !!process.env.ANALYTICS_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.ANALYTICS_SUPABASE_SERVICE_KEY,
    supabaseUrlStart: process.env.ANALYTICS_SUPABASE_URL?.substring(0, 20) + '...',
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    envKeys: Object.keys(process.env).filter(key => key.startsWith('ANALYTICS_SUPABASE'))
  };

  return new Response(JSON.stringify(debug, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
