# Everdantia Project Documentation

## 🌳 Project Overview

**Everdantia** is a mystical digital forest NFT project built with Astro, featuring unique tree NFTs that support real-world conservation efforts. The project combines beautiful digital art with environmental storytelling and community building.

### Key Features
- **Digital Forest NFTs**: Unique tree collections with mystical lore
- **Conservation Focus**: Real-world environmental impact
- **Community-Driven**: Interactive storytelling and events
- **Performance Optimized**: WebP images, responsive design, high Lighthouse scores
- **Analytics Dashboard**: Custom Supabase-powered analytics

---

## 🛠 Tech Stack

- **Framework**: Astro (SSR mode)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS with modern features
- **Images**: WebP + JPG fallbacks, responsive srcsets
- **Analytics**: Custom implementation with Supabase
- **Deployment**: Netlify
- **Performance**: Optimized for Core Web Vitals

---

## 🚀 **FIRST TIME SETUP - REQUIRED STEPS**

### **1. Add Node.js to PATH (Required for every new session)**
```powershell
# Add Node.js to current PowerShell session PATH
$env:PATH += ";C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64"

# Verify Node.js is working
node --version  # Should show v22.17.1
npm --version   # Should show npm version
```

**IMPORTANT**: These PATH changes are temporary and need to be added every time you open a new PowerShell/terminal session.

### **2. Project Dependencies**
```bash
# Install dependencies (after adding Node.js to PATH)
npm install

# Verify Python is available for image optimization
python --version  # Should show Python 3.x
```

### **3. Environment Setup**
```bash
# Copy environment template
cp .env.example .env

# Add your Supabase credentials to .env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### **4. Start Development**
```bash
# Start dev server (after PATH is set)
npm run dev

# The site will be available at http://localhost:4321
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Analytics.astro          # Custom analytics tracking
│   ├── SEO.astro               # SEO component with structured data
│   └── PerformanceOptimization.astro
├── layouts/
│   ├── Layout.astro            # Base layout
│   └── BlogLayout.astro        # Blog post layout
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── pages/
│   ├── index.astro            # Homepage
│   ├── about.astro            # About page
│   ├── blog.astro             # Blog index
│   ├── blog/
│   │   ├── heartwood-chronicles-founding-trees.astro  # Main blog post
│   │   └── draft-heartwood-chronicles-founding-trees.astro  # Draft version
│   ├── collection.astro       # Collection coming soon page
│   ├── community.astro        # Community page
│   └── api/
│       ├── analytics.ts       # Analytics API endpoint
│       └── subscribe.ts       # Newsletter subscription
└── services/
    └── analytics.ts           # Analytics service layer

public/
├── images/
│   ├── blog/                  # Blog post images (WebP + JPG)
│   ├── trees/                 # Tree NFT images (responsive sizes)
│   ├── environment/           # Background/environment images
│   └── background/
├── favicon/                   # Favicon package
├── sw.js                      # Service worker
└── manifest.json             # PWA manifest

scripts/
├── convert_to_webp.py        # Python script for WebP conversion
├── check-404-errors.js       # 404 error detection
└── generate-responsive-images.js  # Responsive image generation
```

---

## 🎨 Design System

### Colors
- **Primary Green**: `#6b4f2a` (dark forest)
- **Secondary Green**: `#8bab5d` (sage)
- **Text Green**: `#4d6b3c` (forest text)
- **Background**: `#f8f6f2` (warm cream)
- **Accent**: `#8b6914` (golden)

### Typography
- **Headings**: 'Cormorant Garamond' (serif)
- **Body**: 'Inter' (sans-serif)
- **Responsive scaling**: `clamp()` functions

### Layout Principles
- **Mobile-first design**
- **Fluid typography and spacing**
- **Progressive enhancement**
- **Performance-optimized images**

---

## 🌟 Key Components

### Analytics System
```typescript
// Custom analytics with Supabase
- Visitor tracking with localStorage persistence
- Event tracking (page views, clicks, form submissions)
- Performance monitoring
- Privacy-focused (no third-party trackers)
```

### Image Optimization
```html
<!-- Responsive images with WebP fallback -->
<picture>
  <source srcset="image-small.webp 300w, image-medium.webp 600w, image-large.webp 800w" 
          type="image/webp"
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 800px" />
  <img src="image-medium.jpg" alt="Description" loading="lazy" />
</picture>
```

### SEO Structure
```astro
<!-- Every page includes comprehensive SEO -->
<SEO 
  title="Page Title"
  description="Meta description"
  keywords="relevant, keywords"
  ogImage="/images/social-image.jpg"
  structuredData={schemaData}
/>
```

---

## 🗃 Database Schema (Supabase)

### Analytics Events Table
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT,
  session_id TEXT,
  event_type TEXT,
  event_data JSONB,
  page_url TEXT,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Subscriptions Table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🚀 Performance Optimizations

### Image Strategy
- **WebP conversion**: 80%+ file size reduction
- **Responsive sizing**: Multiple breakpoints (300px, 600px, 800px)
- **Lazy loading**: Progressive image loading
- **Preloading**: Critical hero images

### Code Optimizations
- **Service Worker**: Caching for repeat visits
- **Font optimization**: Preconnect to Google Fonts
- **Critical CSS**: Inline critical styles
- **Minification**: Automatic via Astro

### Lighthouse Scores (Target)
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## 📝 Content Strategy

### Blog System
- **Main blog**: `/blog/heartwood-chronicles-founding-trees`
- **Draft system**: `/blog/draft-*` for preview/feedback
- **Featured posts**: Highlighted on blog index
- **Social sharing**: Twitter, Facebook, LinkedIn with optimized cards

### NFT Lore Structure
```markdown
# Tree Types (Rarity System)
1. Oak, Willow, Pine - Common (no rarity badge)
2. Emberwood - 5% Rarity (rare, orange badge)
3. Mystic Elder - 1% Rarity (legendary, animated purple badge)
```

### Messaging Tone
- **Mystical and poetic**: "Where digital brushstrokes bring nature's magic to life"
- **Environmental focus**: Conservation and reforestation themes
- **Community-driven**: "Growing through attention, not conquest"

---

## 🔧 Development Workflow

### Daily Startup Checklist
```bash
# 1. ALWAYS add Node.js to PATH first (required every session)
$env:PATH += ";C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64"

# 2. Verify setup
node --version && npm --version

# 3. Start development server
npm run dev

# 4. Open browser to http://localhost:4321
```

### Available Scripts
```json
{
  "dev": "astro dev",
  "start": "astro dev", 
  "build": "astro build",
  "preview": "astro preview",
  "optimize-images": "python scripts/convert_to_webp.py",
  "generate-responsive": "node scripts/generate-responsive-images.js",
  "check-404": "node scripts/check-404-errors.js",
  "validate-twitter": "node scripts/validate-twitter-cards.js"
}
```

### Troubleshooting Common Issues
```bash
# If "npm not found" or "node not found"
# Re-add the PATH (do this every new terminal session):
$env:PATH += ";C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64"

# If dependencies are missing
npm install

# If images need optimization
npm run optimize-images

# If 404 errors appear
npm run check-404
```

---

## 📦 Build & Deployment

### Deployment (Netlify)
- **Build command**: `npm run build`
- **Output directory**: `dist/`
- **Node version**: 18+
- **Auto-deploy**: On git push to main branch

---

## 🎯 Current Status & Roadmap

### ✅ Completed Features
- [x] Homepage with hero section and tree showcase
- [x] Responsive design (mobile-first)
- [x] Blog system with draft/live workflow
- [x] Image optimization (WebP + responsive)
- [x] Custom analytics system
- [x] SEO optimization
- [x] Performance optimization (Lighthouse 90+)
- [x] Social media sharing
- [x] Newsletter subscription
- [x] Collection coming soon page

### 🚧 In Progress
- [ ] Genesis NFT collection (100 unique trees)
- [ ] Minting functionality
- [ ] Community features
- [ ] Interactive forest map

### 🔮 Future Plans
- [ ] Seasonal events system
- [ ] Community voting mechanics
- [ ] Real-world conservation partnerships
- [ ] Mobile app companion

---

## 🐛 Known Issues & Solutions

### Common Issues
1. **"node not found" or "npm not found"**: Run the PATH command first (see startup checklist)
2. **Twitter sharing not showing image**: Ensure images use absolute URLs
3. **WebP not loading**: Provide JPG fallbacks in `<picture>` elements
4. **Analytics not tracking**: Check localStorage and Supabase connection
5. **Mobile navigation**: Ensure hamburger menu JavaScript is loaded

### Debugging Commands
```bash
# Always run first if Node.js commands don't work:
$env:PATH += ";C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64"

# Then run debugging commands:
npm run check-404          # Check for missing files
npm run validate-twitter    # Validate Twitter cards
npm run optimize-images     # Optimize images
npm run build && npm run preview  # Check performance
```

---

## 📞 Contact & Resources

### Important URLs
- **Live site**: https://everdantia.art
- **Analytics dashboard**: https://everdantia.art/analytics/?dev=everdantia2025
- **Draft blog**: https://everdantia.art/blog/draft-heartwood-chronicles-founding-trees

### Social Media
- **Discord**: https://discord.gg/enqAsyDU
- **Twitter**: https://twitter.com/Everdantia
- **Instagram**: https://instagram.com/EverdantiaNFT
- **Email**: everdantia@gmail.com

### Development Resources
- **Astro docs**: https://docs.astro.build
- **Supabase docs**: https://supabase.com/docs
- **WebP conversion**: https://developers.google.com/speed/webp

---

## 🔐 Security & Privacy

### Data Protection
- **Analytics**: First-party only, no tracking across sites
- **Email collection**: GDPR compliant, opt-in only
- **Image optimization**: No external CDN dependencies
- **API security**: Supabase RLS policies enabled

### Performance Monitoring
- **Core Web Vitals**: Monitored via custom analytics
- **Error tracking**: Browser console errors logged
- **Uptime**: Netlify monitoring

---

## 💡 Quick Reference

### Essential Commands (Copy-Paste Ready)
```powershell
# 1. Add Node.js to PATH (REQUIRED EVERY SESSION)
$env:PATH += ";C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64"

# 2. Start development
npm run dev

# 3. Common tasks
npm run optimize-images     # Convert images to WebP
npm run build              # Build for production
npm run check-404          # Find missing files
git add . && git commit -m "Update" && git push  # Deploy changes
```

### File Locations to Remember
- **Node.js**: `C:\Users\jb14\Downloads\node-v22.17.1-win-x64\node-v22.17.1-win-x64`
- **Main blog post**: `src/pages/blog/heartwood-chronicles-founding-trees.astro`
- **Homepage**: `src/pages/index.astro`
- **Environment variables**: `.env` (copy from `.env.example`)

---

*Last updated: August 17, 2025*
*Version: 1.0.0*

**🚨 REMEMBER: Always add Node.js to PATH first thing when opening a new terminal!**