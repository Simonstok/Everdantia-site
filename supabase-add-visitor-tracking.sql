-- Add visitor tracking to analytics_events table
-- Run this in your Supabase SQL editor

-- Add visitor_id column
ALTER TABLE analytics_events 
ADD COLUMN visitor_id VARCHAR(50);

-- Add is_first_visit column
ALTER TABLE analytics_events 
ADD COLUMN is_first_visit BOOLEAN DEFAULT FALSE;

-- Create index for visitor_id for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON analytics_events(visitor_id);

-- Create index for first visits
CREATE INDEX IF NOT EXISTS idx_analytics_first_visit ON analytics_events(is_first_visit) WHERE is_first_visit = true;

-- Add comment explaining the new fields
COMMENT ON COLUMN analytics_events.visitor_id IS 'Persistent visitor identifier across sessions';
COMMENT ON COLUMN analytics_events.is_first_visit IS 'True if this is the visitors first pageview ever';

-- Verify the new structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'analytics_events' 
ORDER BY ordinal_position;
