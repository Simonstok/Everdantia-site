// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Client for public operations (client-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for server-side operations (API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database schema types
export interface AnalyticsEvent {
  id?: string;
  type: string;
  name?: string;
  properties?: any;
  url: string;
  referrer?: string;
  timestamp: number;
  session_id: string;
  user_agent?: string;
  viewport?: {
    width: number;
    height: number;
  };
  ip?: string;
  server_timestamp?: number;
  created_at?: string;
}

// Analytics service class
export class AnalyticsService {
  static async saveEvent(event: AnalyticsEvent) {
    try {
      const { data, error } = await supabaseAdmin
        .from('analytics_events')
        .insert([{
          type: event.type,
          name: event.name,
          properties: event.properties,
          url: event.url,
          referrer: event.referrer,
          timestamp: event.timestamp,
          session_id: event.session_id,
          user_agent: event.user_agent,
          viewport: event.viewport,
          ip: event.ip,
          server_timestamp: event.server_timestamp
        }]);

      if (error) {
        console.error('Supabase analytics error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Analytics service error:', error);
      return { success: false, error };
    }
  }

  static async getEvents(limit = 100) {
    try {
      const { data, error } = await supabaseAdmin
        .from('analytics_events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Supabase query error:', error);
        return { success: false, error };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Analytics query error:', error);
      return { success: false, error };
    }
  }

  static async getStats(timeframe = '24h') {
    try {
      const now = new Date();
      const timeframeMs = timeframe === '24h' ? 24 * 60 * 60 * 1000 : 
                         timeframe === '7d' ? 7 * 24 * 60 * 60 * 1000 :
                         timeframe === '30d' ? 30 * 24 * 60 * 60 * 1000 :
                         24 * 60 * 60 * 1000;
      
      const since = new Date(now.getTime() - timeframeMs);

      const { data, error } = await supabaseAdmin
        .from('analytics_events')
        .select('type, name, session_id')
        .gte('timestamp', since.getTime());

      if (error) {
        console.error('Supabase stats error:', error);
        return { success: false, error };
      }

      // Calculate stats
      const stats = {
        totalEvents: data.length,
        pageViews: data.filter(e => e.type === 'pageview').length,
        clicks: data.filter(e => e.type === 'event' && e.name === 'click').length,
        errors: data.filter(e => e.type === 'event' && e.name?.includes('error')).length,
        uniqueSessions: Array.from(new Set(data.map(e => e.session_id))).length
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error('Analytics stats error:', error);
      return { success: false, error };
    }
  }
}
