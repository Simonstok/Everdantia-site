// Test Supabase connection
// Run this in your browser console at http://localhost:4321

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase connection...');
  
  try {
    // Test the analytics API endpoint
    const response = await fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'test',
        name: 'connection_test',
        url: window.location.pathname,
        timestamp: Date.now(),
        sessionId: 'test-session-' + Date.now()
      })
    });
    
    const result = await response.text();
    console.log('📊 API Response Status:', response.status);
    console.log('📊 API Response:', result);
    
    if (response.ok) {
      console.log('✅ Supabase connection working!');
    } else {
      console.log('❌ Supabase connection failed:', result);
    }
    
    // Also test the stats endpoint
    const statsResponse = await fetch('/api/analytics?type=stats&secret=everdantia2025');
    const stats = await statsResponse.text();
    console.log('📈 Stats Response:', statsResponse.status, stats);
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

// Run the test
testSupabaseConnection();
