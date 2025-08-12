# 📊 Analytics Setup Guide

Your Everdantia website now has a comprehensive analytics system! Here's how to complete the setup:

## 🎯 What's Already Done

✅ **Analytics Component**: Privacy-friendly tracking installed on all pages  
✅ **Dashboard**: Available at `/analytics?dev=everdantia2025`  
✅ **API Endpoints**: Server-side analytics processing  
✅ **Supabase Package**: Database integration ready  
✅ **Database Schema**: Complete SQL schema created  

## 🚀 Complete Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new account/login
3. Click "New Project"
4. Choose your organization and fill in project details
5. Wait for the project to be created (takes ~2 minutes)

### 2. Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 3. Set Up Environment Variables
1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
2. Edit `.env` and replace the placeholder values with your real Supabase credentials

### 4. Deploy Database Schema
1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `supabase-schema.sql`
3. Paste it into the SQL Editor and click **Run**
4. You should see "Success" messages for all operations

### 5. Test Everything
1. Start your development server:
   ```powershell
   npm run dev
   ```
2. Visit your website and click around to generate analytics events
3. Visit `/analytics?dev=everdantia2025` to see your data
4. Check your Supabase dashboard **Table Editor** → `analytics_events` to see stored data

## 🔧 Features Included

### 📈 **Tracking Capabilities**
- **Page Views**: Automatic tracking on all pages
- **User Interactions**: Click tracking with element details
- **Performance Metrics**: Core Web Vitals (CLS, LCP, FID)
- **Error Monitoring**: Automatic JavaScript error capture
- **Custom Events**: Easy-to-extend event system

### 🛡️ **Privacy-Friendly**
- No personal data collection
- No cookies or local storage of personal info
- Anonymous session tracking only
- GDPR/CCPA compliant by design

### 📊 **Dashboard Features**
- Real-time statistics (24-hour rolling window)
- Event timeline with details
- Performance monitoring
- Error tracking
- Raw data export (JSON)

### 🔒 **Security**
- Access controls for development only
- Row Level Security (RLS) enabled
- Secure API endpoints with secret keys
- Environment variable protection

## 🎛️ **Usage**

### View Analytics Dashboard
- **Development**: Visit `/analytics` (automatic access)
- **Production**: Visit `/analytics?dev=everdantia2025`

### Add Custom Events
Add this to any page to track custom events:
```javascript
// Track a custom event
window.EverdantiaAnalytics?.track('custom-event', {
  action: 'newsletter-signup',
  source: 'homepage'
});
```

### Database Queries
Access your analytics data directly:
```sql
-- Get page views for last 24 hours
SELECT url, COUNT(*) as views 
FROM analytics_events 
WHERE type = 'pageview' 
AND created_at > NOW() - INTERVAL '24 hours'
GROUP BY url
ORDER BY views DESC;

-- Get error summary
SELECT name, COUNT(*) as errors
FROM analytics_events 
WHERE type = 'event' AND name LIKE '%error%'
AND created_at > NOW() - INTERVAL '7 days'
GROUP BY name;
```

## 🔧 **Troubleshooting**

### Common Issues

**Analytics not working?**
- Check browser console for errors
- Verify `.env` file exists with correct values
- Make sure Supabase schema is deployed

**Dashboard showing no data?**
- Wait a few seconds after page visits
- Check if localStorage has events (fallback mode)
- Verify API endpoints are working: `/api/analytics`

**Database connection errors?**
- Double-check Supabase credentials in `.env`
- Ensure service role key is used (not anon key)
- Verify Supabase project is active

### Development Notes
- Analytics works in localStorage mode without Supabase
- Database integration enhances with persistent storage
- Dashboard auto-refreshes every 30 seconds
- Events are batched for performance

## 📚 **Next Steps**

Once everything is working, consider:
1. **Custom Dashboards**: Build specific reports for your needs
2. **Alerts**: Set up notifications for errors or traffic spikes  
3. **Performance Monitoring**: Track Core Web Vitals trends
4. **A/B Testing**: Add variation tracking for experiments
5. **Export Features**: Build CSV/PDF report exports

---

🌿 **Happy Analytics!** Your Everdantia website now has enterprise-grade analytics tracking.
