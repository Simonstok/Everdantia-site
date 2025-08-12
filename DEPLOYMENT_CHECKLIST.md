# 🚀 Production Deployment Checklist

## ✅ Files Ready for Deployment
- `src/components/Analytics.astro` - Analytics tracking component
- `src/pages/api/analytics.ts` - API endpoint for data processing
- `src/pages/analytics.astro` - Analytics dashboard
- `src/lib/supabase.ts` - Supabase integration
- `supabase-schema.sql` - Database schema (already deployed)

## 🔧 Environment Variables to Set in Netlify

Go to your Netlify dashboard → Site settings → Environment variables:

```
ANALYTICS_SUPABASE_URL=https://vfwcdrwxvzjzzesktymq.supabase.co
ANALYTICS_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd2Nkcnd4dnpqenplc2t0eW1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDAxNTksImV4cCI6MjA3MDU3NjE1OX0.sR2iR7Huljia9NERc1zbGmQGdaNGs2flFQt7l7v5GOw
ANALYTICS_SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd2Nkcnd4dnpqenplc2t0eW1xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTAwMDE1OSwiZXhwIjoyMDcwNTc2MTU5fQ.wLslGGWGtpEcIfO0kpW-knncO7fc3NWxLIOQZDYQWgQ
ANALYTICS_SECRET=everdantia2025
```

**Note**: These are prefixed with `ANALYTICS_` to avoid conflicts with your existing newsletter Supabase variables.

## 🚀 Deployment Steps

1. **Push to Git**: Commit all changes and push to your repository
2. **Set Environment Variables**: Add the variables above in Netlify
3. **Deploy**: Netlify will automatically build and deploy
4. **Test**: Visit `https://everdantia.art/api/debug?secret=everdantia2025` to verify environment variables
5. **Test Analytics**: Navigate your site and check `https://everdantia.art/analytics?dev=everdantia2025`

## 🧪 Testing Production Analytics

After deployment:

1. **Visit your live site**: https://everdantia.art
2. **Navigate around** to generate analytics events
3. **Check the dashboard**: https://everdantia.art/analytics?dev=everdantia2025
4. **Verify database data**: Check Supabase dashboard → Table Editor → analytics_events

## 🔍 Troubleshooting

If analytics still shows "(Local)":
- Check Netlify environment variables are set correctly
- Visit the debug endpoint to verify configuration
- Check Netlify function logs for errors
- Verify Supabase RLS policies (run `supabase-fix-policies.sql` if needed)

## 📊 Expected Results

Once working, you should see:
- Real-time analytics data flowing to Supabase
- Dashboard showing data without "(Local)" labels
- Data persistence across browser sessions
- Performance metrics and user interactions tracked

The analytics system is designed to gracefully fallback to localStorage if the database connection fails, so the user experience won't be affected even if there are temporary issues.
