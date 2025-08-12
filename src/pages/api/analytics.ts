import type { APIRoute } from 'astro';
import { AnalyticsService } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Validate the incoming data
    if (!data.type || !data.timestamp) {
      return new Response(JSON.stringify({ error: 'Invalid data format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add server-side timestamp and IP (anonymized)
    const analyticsEvent = {
      ...data,
      server_timestamp: Date.now(),
      // Anonymize IP by removing last octet
      ip: request.headers.get('x-forwarded-for')?.split('.').slice(0, 3).join('.') + '.0' || 'unknown'
    };

    // Save to Supabase
    const result = await AnalyticsService.saveEvent(analyticsEvent);
    
    if (!result.success) {
      console.error('Failed to save analytics event:', result.error);
      // Still return success to client to avoid disrupting user experience
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log('📊 Analytics Event:', JSON.stringify(analyticsEvent, null, 2));
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Analytics API Error:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET endpoint to fetch analytics data for dashboard
export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const secret = searchParams.get('secret');
    const limit = parseInt(searchParams.get('limit') || '100');
    const type = searchParams.get('type') || 'events';

    // Verify access
    if (secret !== 'everdantia2025') {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (type === 'stats') {
      const timeframe = searchParams.get('timeframe') || '24h';
      const result = await AnalyticsService.getStats(timeframe);
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to fetch stats' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(result.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const result = await AnalyticsService.getEvents(limit);
      
      if (!result.success) {
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify(result.data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Analytics GET API Error:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
