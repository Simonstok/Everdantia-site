// Robots.txt for SEO optimization
export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://everdantia.art/sitemap.xml

# Block analytics dashboard
Disallow: /analytics

# Block admin areas (if any)
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /blog/
Allow: /about
Allow: /community

# Crawl delay (be nice to servers)
Crawl-delay: 1

# Common SEO optimization
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
