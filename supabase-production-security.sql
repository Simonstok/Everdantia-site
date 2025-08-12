-- Production Security Setup for Analytics
-- Run this in your Supabase SQL editor to implement production-ready security

-- First, drop the overly permissive policies
DROP POLICY IF EXISTS "Allow anonymous insert for analytics" ON analytics_events;
DROP POLICY IF EXISTS "Allow read for analytics dashboard" ON analytics_events;
DROP POLICY IF EXISTS "Allow service role full access" ON analytics_events;
DROP POLICY IF EXISTS "Allow authenticated read" ON analytics_events;
DROP POLICY IF EXISTS "Allow anon read for dashboard" ON analytics_events;

-- Create production-ready policies

-- 1. Allow service role full access (for API operations)
CREATE POLICY "Service role full access" ON analytics_events
  FOR ALL 
  TO service_role
  WITH CHECK (true);

-- 2. Allow inserting analytics events only with valid data structure
CREATE POLICY "Analytics insert with validation" ON analytics_events
  FOR INSERT 
  TO service_role
  WITH CHECK (
    type IS NOT NULL 
    AND timestamp IS NOT NULL 
    AND session_id IS NOT NULL
    AND url IS NOT NULL
    AND length(session_id) > 5  -- Ensure session_id has minimum length
    AND timestamp > 0  -- Ensure valid timestamp
  );

-- 3. Allow reading analytics data only for service role (dashboard queries)
CREATE POLICY "Analytics read for service role" ON analytics_events
  FOR SELECT 
  TO service_role
  USING (true);

-- Optional: Add row-level filtering for data retention (auto-delete old data)
-- Uncomment this if you want to automatically hide data older than 1 year
-- CREATE POLICY "Hide old analytics data" ON analytics_events
--   FOR SELECT 
--   TO service_role
--   USING (created_at > NOW() - INTERVAL '1 year');

-- Create indexes for better performance (if not already created)
CREATE INDEX IF NOT EXISTS idx_analytics_created_at_desc ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp_desc ON analytics_events(timestamp DESC);

-- Add table comment for documentation
COMMENT ON TABLE analytics_events IS 'Analytics events for Everdantia website - Production secured with RLS policies';

-- Verify the new policies
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'analytics_events'
ORDER BY policyname;
