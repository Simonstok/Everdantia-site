import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  
  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  
  return rss({
    title: 'Everdantia Blog',
    description: 'Latest insights on sustainable living, environmental conservation, and green technology from Everdantia.',
    site: context.site || 'https://everdantia.art',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.slug}/`,
      author: post.data.author || 'Everdantia',
      categories: post.data.tags || ['Sustainability', 'Environment'],
    })),
    customData: `<language>en-us</language>
    <managingEditor>everdantia@gmail.com (Everdantia)</managingEditor>
    <webMaster>everdantia@gmail.com (Everdantia)</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} Everdantia</copyright>
    <image>
      <url>https://everdantia.art/favicon.svg</url>
      <title>Everdantia Blog</title>
      <link>https://everdantia.art</link>
    </image>`,
  });
}
