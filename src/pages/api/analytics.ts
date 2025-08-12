import type { APIRoute } from 'astro';

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
      serverTimestamp: Date.now(),
      // Anonymize IP by removing last octet
      ip: request.headers.get('x-forwarded-for')?.split('.').slice(0, 3).join('.') + '.0' || 'unknown'
    };

    // In production, you would:
    // 1. Send to your analytics service (like Google Analytics, Mixpanel, or custom DB)
    // 2. Store in database
    // 3. Process for real-time dashboards
    
    // For now, just log to console (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', JSON.stringify(analyticsEvent, null, 2));
    }

    // Example: Store in a database (uncomment when you have a DB setup)
    /*
    await db.analytics.create({
      data: analyticsEvent
    });
    */

    // Example: Send to external analytics service
    /*
    if (process.env.GOOGLE_ANALYTICS_ID) {
      await sendToGoogleAnalytics(analyticsEvent);
    }
    */

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

// Helper function to send to Google Analytics (example)
async function sendToGoogleAnalytics(event: any) {
  try {
    const response = await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.GOOGLE_ANALYTICS_ID}&api_secret=${process.env.GOOGLE_ANALYTICS_SECRET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: event.sessionId,
        events: [{
          name: event.name || event.type,
          params: {
            page_location: event.url,
            ...event.properties
          }
        }]
      })
    });
    
    if (!response.ok) {
      console.error('Failed to send to Google Analytics:', response.statusText);
    }
  } catch (error) {
    console.error('Google Analytics error:', error);
  }
}

// Example rate limiting (basic implementation)
const requestCounts = new Map();
const RATE_LIMIT = 100; // requests per minute
const RATE_WINDOW = 60000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter((time: number) => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return true;
  }
  
  // Add current request
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  
  return false;
}
