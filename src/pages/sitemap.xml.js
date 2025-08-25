// Sitemap.xml generator for enhanced SEO
export async function GET() {
  const baseUrl = 'https://everdantia.art';

  // Blog posts
  const posts = [
    { slug: 'welcome-to-everdantia', date: '2025-01-01' },
    { slug: 'genesis-collection', date: '2025-01-15' },
    { slug: 'conservation-through-innovation', date: '2025-01-20' },
    { slug: 'behind-the-scenes-growing-our-impact', date: '2025-01-25' }
  ];

  // Static pages with SEO-optimized priorities
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0', lastmod: '2025-08-21' },
    { url: '/about', changefreq: 'monthly', priority: '0.9', lastmod: '2025-08-21' },
    { url: '/collection', changefreq: 'weekly', priority: '0.9', lastmod: '2025-08-21' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: '2025-08-21' },
    { url: '/community', changefreq: 'weekly', priority: '0.7', lastmod: '2025-08-21' },
    { url: '/terms', changefreq: 'yearly', priority: '0.3', lastmod: '2025-08-21' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.3', lastmod: '2025-08-21' },
    { url: '/seo-dashboard', changefreq: 'monthly', priority: '0.2', lastmod: '2025-08-21' },
  ];

  // Dynamic blog pages
  const blogPages = posts.map(post => ({
    url: `/blog/${post.slug}`,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: post.date || new Date().toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <mobile:mobile/>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
