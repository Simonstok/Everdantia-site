import type { APIRoute } from 'astro';
import { AnalyticsService } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Log environment check
    console.log('🔧 Environment check:', {
      hasUrl: !!process.env.ANALYTICS_SUPABASE_URL,
      hasServiceKey: !!process.env.ANALYTICS_SUPABASE_SERVICE_KEY,
      urlStart: process.env.ANALYTICS_SUPABASE_URL?.substring(0, 20)
    });

    const data = await request.json();
    console.log('📥 Received analytics data:', data);
    
    // Validate the incoming data
    if (!data.type || !data.timestamp) {
      console.error('❌ Invalid data format:', data);
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

    console.log('💾 Attempting to save event to Supabase:', analyticsEvent);

    // Save to Supabase
    const result = await AnalyticsService.saveEvent(analyticsEvent);
    
    console.log('🔄 Supabase save result:', result);
    
    if (!result.success) {
      console.error('❌ Failed to save analytics event:', result.error);
      
      // Return the actual error to help with debugging
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Database save failed',
        details: result.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.log('✅ Successfully saved analytics event');
    }

    return new Response(JSON.stringify({ success: true, saved: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('💥 Analytics API Error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }), {
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
