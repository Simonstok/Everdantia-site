// Comprehensive Analytics Test
// Run this in browser console at https://everdantia.art

async function fullAnalyticsTest() {
  console.log('🧪 Starting comprehensive analytics test...');
  
  // Test 1: Send multiple events
  console.log('📊 Sending test events...');
  const events = [
    { type: 'pageview', url: window.location.pathname, timestamp: Date.now(), sessionId: 'test-session-1' },
    { type: 'event', name: 'click', url: window.location.pathname, timestamp: Date.now(), sessionId: 'test-session-1' },
    { type: 'performance', url: window.location.pathname, timestamp: Date.now(), sessionId: 'test-session-1' }
  ];
  
  for (let event of events) {
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    const result = await response.json();
    console.log(`Event ${event.type}:`, response.status, result);
  }
  
  // Wait a moment for data to be processed
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Test 2: Check stats
  console.log('📈 Testing stats endpoint...');
  const statsResponse = await fetch('/api/analytics?type=stats&secret=everdantia2025&timeframe=24h');
  const stats = await statsResponse.json();
  console.log('Stats Response:', statsResponse.status, stats);
  
  // Test 3: Check events
  console.log('📋 Testing events endpoint...');
  const eventsResponse = await fetch('/api/analytics?type=events&secret=everdantia2025&limit=10');
  const eventsData = await eventsResponse.json();
  console.log('Events Response:', eventsResponse.status, eventsData);
  
  // Test 4: Check if dashboard API calls work
  console.log('🎛️ Testing dashboard refresh...');
  try {
    if (typeof refreshData === 'function') {
      refreshData();
      console.log('Dashboard refresh triggered');
    } else {
      console.log('Dashboard refresh function not available (normal if not on dashboard page)');
    }
  } catch (e) {
    console.log('Dashboard refresh error:', e);
  }
  
  console.log('✅ Test complete! Check the results above.');
}

// Run the test
fullAnalyticsTest();
