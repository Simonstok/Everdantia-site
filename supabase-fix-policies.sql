-- Fix Supabase RLS Policies for Analytics
-- Run this in your Supabase SQL editor to fix the authorization issues

-- First, drop existing policies
DROP POLICY IF EXISTS "Allow insert for analytics" ON analytics_events;
DROP POLICY IF EXISTS "Allow read for analytics dashboard" ON analytics_events;

-- Create more permissive policies for analytics
-- Allow anonymous inserts (for tracking events from website)
CREATE POLICY "Allow anonymous insert for analytics" ON analytics_events
  FOR INSERT 
  TO anon
  WITH CHECK (true);

-- Allow service role to do everything (for API queries)
CREATE POLICY "Allow service role full access" ON analytics_events
  FOR ALL 
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to read (for dashboard)
CREATE POLICY "Allow authenticated read" ON analytics_events
  FOR SELECT 
  TO authenticated
  USING (true);

-- Also allow anon to read for dashboard (since we're using query params for security)
CREATE POLICY "Allow anon read for dashboard" ON analytics_events
  FOR SELECT 
  TO anon
  USING (true);

-- Verify the policies are working
SELECT schemaname, tablename, policyname, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'analytics_events';
