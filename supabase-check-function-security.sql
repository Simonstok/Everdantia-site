-- Verify all your schema functions have secure search_path settings
-- Run this to check current function security

-- List all functions in your public schema and their search_path settings
SELECT 
    schemaname,
    functionname,
    prosrc as function_definition,
    proconfig as config_settings
FROM pg_stat_user_functions 
JOIN pg_proc ON pg_stat_user_functions.funcid = pg_proc.oid
WHERE schemaname = 'public';

-- Alternative: Check specifically for functions without search_path set
SELECT 
    n.nspname as schema_name,
    p.proname as function_name,
    p.proconfig as settings
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND p.proname NOT LIKE 'pg_%'
  AND (p.proconfig IS NULL OR NOT EXISTS (
      SELECT 1 FROM unnest(p.proconfig) AS config 
      WHERE config LIKE 'search_path=%'
  ));

-- This will show any functions that need search_path fixes
