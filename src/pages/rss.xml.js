import rss from '@astrojs/rss';

export async function GET(context) {
  // Static blog posts for now (until content collection is set up)
  const posts = [
    {
      title: 'Welcome to Everdantia',
      slug: 'welcome-to-everdantia',
      date: new Date('2025-01-01'),
      description: 'Discover the magical world of Everdantia, where digital art meets environmental conservation.',
      author: 'Everdantia',
      tags: ['Sustainability', 'Environment', 'NFT']
    },
    {
      title: 'The Genesis Collection',
      slug: 'genesis-collection',
      date: new Date('2025-01-15'),
      description: 'Learn about our first collection of 100 unique digital trees, each with its own story.',
      author: 'Everdantia',
      tags: ['Collection', 'Art', 'Trees']
    }
  ];
  
  return rss({
    title: 'Everdantia Blog',
    description: 'Latest insights on sustainable living, environmental conservation, and green technology from Everdantia.',
    site: context.site || 'https://everdantia.art',
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.date,
      link: `/blog/${post.slug}/`,
      author: post.author || 'Everdantia',
      categories: post.tags || ['Sustainability', 'Environment'],
    })),
    customData: `<language>en-us</language>
    <managingEditor>everdantia@gmail.com (Everdantia)</managingEditor>
    <webMaster>everdantia@gmail.com (Everdantia)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Everdantia</copyright>
    <image>
      <url>https://everdantia.art/favicon/favicon.svg</url>
      <title>Everdantia Blog</title>
      <link>https://everdantia.art</link>
    </image>`,
  });
}
