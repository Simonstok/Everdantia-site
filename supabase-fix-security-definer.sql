-- Fix for Supabase Security Issue: Remove SECURITY DEFINER from analytics_summary view
-- and fix search_path for get_daily_analytics_stats function
-- Run this in your Supabase SQL editor to resolve the security warnings

-- First, drop the existing view
DROP VIEW IF EXISTS analytics_summary;

-- Drop and recreate the function with secure search_path
DROP FUNCTION IF EXISTS get_daily_analytics_stats(INTEGER);

-- Recreate the view with explicit SECURITY INVOKER (default, but explicit for clarity)
-- This ensures the view uses the permissions of the user executing the query, not the creator
CREATE VIEW analytics_summary 
WITH (security_invoker = true)
AS
SELECT 
  DATE_TRUNC('hour', to_timestamp(timestamp / 1000)) as hour,
  type,
  COUNT(*) as event_count,
  COUNT(DISTINCT session_id) as unique_sessions
FROM analytics_events
GROUP BY hour, type
ORDER BY hour DESC;

-- Recreate the function with secure search_path to prevent SQL injection
CREATE OR REPLACE FUNCTION get_daily_analytics_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  date DATE,
  page_views BIGINT,
  unique_sessions BIGINT,
  total_events BIGINT,
  error_count BIGINT
) 
LANGUAGE SQL
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    DATE(to_timestamp(timestamp / 1000)) as date,
    COUNT(*) FILTER (WHERE type = 'pageview') as page_views,
    COUNT(DISTINCT session_id) as unique_sessions,
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE type = 'event' AND name LIKE '%error%') as error_count
  FROM analytics_events
  WHERE to_timestamp(timestamp / 1000) >= CURRENT_DATE - (days_back || ' days')::INTERVAL
  GROUP BY DATE(to_timestamp(timestamp / 1000))
  ORDER BY date DESC;
$$;

-- Add proper RLS policy for the view if needed
-- Since analytics is removed from your site, you might want to restrict access further
DROP POLICY IF EXISTS "analytics_summary_read_policy" ON analytics_events;

CREATE POLICY "analytics_summary_read_policy" ON analytics_events
  FOR SELECT 
  USING (
    -- Only allow reading analytics data for admin users or service role
    -- Use subquery to prevent re-evaluation for each row (performance optimization)
    (SELECT auth.role()) = 'service_role' OR 
    (SELECT auth.jwt() ->> 'role') = 'admin'
  );

-- Alternative: If you want to completely remove analytics (since it's disabled on your site)
-- Uncomment these lines to drop everything analytics-related:

-- DROP VIEW IF EXISTS analytics_summary;
-- DROP FUNCTION IF EXISTS get_daily_analytics_stats(INTEGER);
-- DROP POLICY IF EXISTS "Allow insert for analytics" ON analytics_events;
-- DROP POLICY IF EXISTS "Allow read for analytics dashboard" ON analytics_events;
-- DROP POLICY IF EXISTS "analytics_summary_read_policy" ON analytics_events;
-- DROP TABLE IF EXISTS analytics_events;

-- Or, if you want to keep the table but make it more secure:
-- Remove the permissive policies and add stricter ones

-- DROP POLICY IF EXISTS "Allow insert for analytics" ON analytics_events;
-- DROP POLICY IF EXISTS "Allow read for analytics dashboard" ON analytics_events;

-- CREATE POLICY "analytics_service_only_insert" ON analytics_events
--   FOR INSERT 
--   WITH CHECK ((SELECT auth.role()) = 'service_role');

-- CREATE POLICY "analytics_admin_only_read" ON analytics_events
--   FOR SELECT 
--   USING ((SELECT auth.role()) = 'service_role' OR (SELECT auth.jwt() ->> 'role') = 'admin');

COMMENT ON VIEW analytics_summary IS 'Analytics summary view with proper security context (SECURITY INVOKER)';
