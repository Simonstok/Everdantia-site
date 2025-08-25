// Enhanced robots.txt for optimal SEO
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://everdantia.art/sitemap.xml

# Block sensitive areas
Disallow: /analytics
Disallow: /admin/
Disallow: /api/
Disallow: /_astro/
Disallow: /node_modules/

# Allow important pages for SEO
Allow: /blog/
Allow: /about
Allow: /collection
Allow: /community
Allow: /terms
Allow: /privacy

# Crawl delay (be respectful)
Crawl-delay: 1

# Search engine specific optimizations
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: Slurp
Allow: /
Crawl-delay: 1

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /
Crawl-delay: 2

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

# Social media crawlers (important for NFT projects)
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

# NFT marketplace crawlers
User-agent: OpenSea
Allow: /

User-agent: SuperRare
Allow: /

# Performance note: This robots.txt optimized for NFT/crypto discovery`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
