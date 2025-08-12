import type { APIRoute } from 'astro';
import { AnalyticsService } from '../../lib/supabase';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Rate limiting check (simple implementation)
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';
    
    // Basic bot detection
    const botPatterns = /bot|crawler|spider|scraper/i;
    if (botPatterns.test(userAgent)) {
      return new Response(JSON.stringify({ error: 'Bot traffic detected' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify request comes from your domain (in production)
    if (process.env.NODE_ENV === 'production') {
      const allowedOrigins = ['https://everdantia.com', 'https://www.everdantia.com'];
      const origin = request.headers.get('origin');
      if (origin && !allowedOrigins.includes(origin)) {
        return new Response(JSON.stringify({ error: 'Invalid origin' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    const data = await request.json();
    
    // Enhanced validation with data sanitization
    if (!data.type || !data.timestamp || !(data.sessionId || data.session_id)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid data format'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize and validate data
    const sessionId = (data.sessionId || data.session_id || '').toString().slice(0, 50);
    const visitorId = (data.visitorId || data.visitor_id || '').toString().slice(0, 50);
    const eventType = data.type.toString().slice(0, 50);
    const url = (data.url || '').toString().slice(0, 500);
    
    if (sessionId.length < 6 || eventType.length < 1) {
      return new Response(JSON.stringify({ 
        error: 'Invalid data values'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Add server-side timestamp and IP (anonymized)
    const analyticsEvent = {
      type: eventType,
      name: data.name ? data.name.toString().slice(0, 100) : null,
      properties: typeof data.properties === 'object' ? data.properties : {},
      url: url,
      referrer: data.referrer ? data.referrer.toString().slice(0, 500) : null,
      timestamp: Math.max(0, parseInt(data.timestamp) || 0),
      session_id: sessionId,
      visitor_id: visitorId || null,
      is_first_visit: Boolean(data.isFirstVisit),
      user_agent: (data.userAgent || data.user_agent || '').toString().slice(0, 300),
      viewport: data.viewport && typeof data.viewport === 'object' ? data.viewport : null,
      server_timestamp: Date.now(),
      // Anonymize IP by removing last octet
      ip: request.headers.get('x-forwarded-for')?.split('.').slice(0, 3).join('.') + '.0' || 'unknown'
    };

    // Save to Supabase
    const result = await AnalyticsService.saveEvent(analyticsEvent);
    
    if (!result.success) {
      // Log error server-side but don't expose details to client
      console.error('Analytics save failed:', result.error);
      
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Database save failed'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Analytics API Error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error'
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
    const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 1000); // Cap at 1000
    const type = searchParams.get('type') || 'events';

    // Verify access with environment variable
    const expectedSecret = process.env.ANALYTICS_DASHBOARD_SECRET || 'everdantia2025';
    if (secret !== expectedSecret) {
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
