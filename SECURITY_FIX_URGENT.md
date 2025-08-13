# Security Fix Guide for Everdantia

## URGENT: Exposed Credentials Detected

### 1. Rotate All Keys Immediately

#### Supabase Analytics Project:
1. Go to https://supabase.com/dashboard
2. Select your analytics project
3. Go to Settings > API
4. Click "Reset" on service_role key
5. Update your .env file with new keys

#### Newsletter Supabase Project (if different):
1. Repeat same process for newsletter database
2. Generate new service role key

### 2. Clean Git History

```bash
# Remove sensitive files from git history
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch .env.example database.env' \
  --prune-empty --tag-name-filter cat -- --all

# Force push to remove from remote
git push origin --force --all
```

### 3. Fix .env.example File

Create a safe template:

```env
# Analytics Supabase Configuration
ANALYTICS_SUPABASE_URL=your_project_url_here
ANALYTICS_SUPABASE_ANON_KEY=your_anon_key_here  
ANALYTICS_SUPABASE_SERVICE_KEY=your_service_key_here

# Dashboard Security
ANALYTICS_DASHBOARD_SECRET=your_secure_secret_here
ENABLE_ANALYTICS=true
```

### 4. Update .gitignore

Add these files:
```
.env
.env.local
.env.production
database.env
*.env
```

### 5. Verify Repository is Clean

```bash
# Check no sensitive files are tracked
git ls-files | grep -E "\.(env|key|secret)"

# Should return empty
```

## Prevention for Future

1. NEVER commit real credentials
2. Use .env.example with placeholder values only
3. Always check .gitignore before committing
4. Use git hooks to prevent credential commits
5. Regular security scans of repository

## Test After Fix

1. Verify new keys work in application
2. Check that old keys are revoked
3. Confirm no sensitive data in repository
4. Test analytics still functions with new credentials
