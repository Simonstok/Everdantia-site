-- Clean up any temporary functions that might be causing search_path warnings
-- Run this in Supabase SQL Editor if the pg_temp warning persists

-- This will terminate your current session and clean up temporary objects
SELECT pg_terminate_backend(pg_backend_pid());

-- Alternative: You can also simply refresh/close the SQL Editor tab
-- Temporary functions (pg_temp_*) are automatically cleaned up when sessions end
