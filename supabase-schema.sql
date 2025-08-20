-- Supabase SQL Schema for Everdantia Analytics
-- Run this in your Supabase SQL editor to create the analytics table

CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  properties JSONB DEFAULT '{}',
  url TEXT NOT NULL,
  referrer TEXT,
  timestamp BIGINT NOT NULL,
  session_id VARCHAR(100) NOT NULL,
  user_agent TEXT,
  viewport JSONB,
  ip VARCHAR(15),
  server_timestamp BIGINT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX idx_analytics_events_type ON analytics_events(type);
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_url ON analytics_events(url);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);

-- Add a compound index for common queries
CREATE INDEX idx_analytics_events_type_timestamp ON analytics_events(type, timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting from your website
-- Performance-optimized with subqueries to prevent per-row re-evaluation
CREATE POLICY "Allow insert for analytics" ON analytics_events
  FOR INSERT WITH CHECK ((SELECT auth.role()) = 'service_role');

-- Create a policy for reading data (only for authenticated users or service role)
-- Performance-optimized with subqueries to prevent per-row re-evaluation
CREATE POLICY "Allow read for analytics dashboard" ON analytics_events
  FOR SELECT USING ((SELECT auth.role()) = 'service_role' OR (SELECT auth.jwt() ->> 'role') = 'admin');

-- Optional: Create a view for easier querying with proper security context
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

-- Optional: Create a function to get daily stats with secure search_path
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

-- Example usage of the function:
-- SELECT * FROM get_daily_analytics_stats(30); -- Get last 30 days

COMMENT ON TABLE analytics_events IS 'Stores all analytics events from the Everdantia website';
COMMENT ON COLUMN analytics_events.type IS 'Event type: pageview, event, performance, etc.';
COMMENT ON COLUMN analytics_events.name IS 'Specific event name for type=event';
COMMENT ON COLUMN analytics_events.properties IS 'Additional event properties in JSON format';
COMMENT ON COLUMN analytics_events.timestamp IS 'Client-side timestamp in milliseconds';
COMMENT ON COLUMN analytics_events.server_timestamp IS 'Server-side timestamp in milliseconds';
COMMENT ON COLUMN analytics_events.session_id IS 'Unique session identifier';
COMMENT ON COLUMN analytics_events.viewport IS 'Browser viewport dimensions';
COMMENT ON COLUMN analytics_events.ip IS 'Anonymized IP address (last octet removed)';
