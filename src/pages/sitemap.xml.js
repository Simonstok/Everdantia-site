// Sitemap.xml generator for SEO
export async function GET() {
  const baseUrl = 'https://everdantia.art';

  // Static blog posts for now (until content collection is set up)
  const posts = [
    { slug: 'welcome-to-everdantia', date: '2025-01-01' },
    { slug: 'genesis-collection', date: '2025-01-15' }
  ];

  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'weekly', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
    { url: '/blog', changefreq: 'weekly', priority: '0.9' },
    { url: '/community', changefreq: 'weekly', priority: '0.7' },
    { url: '/seo-dashboard', changefreq: 'monthly', priority: '0.5' },
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
