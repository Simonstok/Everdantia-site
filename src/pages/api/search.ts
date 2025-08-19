import type { APIRoute } from 'astro';

// Search content data structure
const searchableContent = [
  // Blog posts
  {
    id: 'welcome-to-everdantia',
    type: 'blog',
    title: 'Welcome to Everdantia',
    description: 'Step into a living world where digital nature meets real conservation. Discover the magic of Everdantia.',
    content: 'Everdantia digital forest NFT conservation reforestation blockchain environmental nature trees sustainable living',
    url: '/blog/welcome-to-everdantia',
    category: 'Announcement',
    keywords: ['welcome', 'introduction', 'everdantia', 'forest', 'nft', 'conservation']
  },
  {
    id: 'genesis-collection',
    type: 'blog',
    title: 'Genesis Collection Unveiled',
    description: 'The first generation of Everdantia trees is here. Meet the founding guardians of our digital forest.',
    content: 'Genesis collection first generation trees founding guardians digital forest NFT mint launch',
    url: '/blog/genesis-collection-unveiled',
    category: 'Collection',
    keywords: ['genesis', 'collection', 'trees', 'mint', 'launch', 'guardians']
  },
  {
    id: 'conservation-innovation',
    type: 'blog',
    title: 'Conservation Through Innovation',
    description: 'How blockchain technology and NFTs can support real-world environmental conservation efforts.',
    content: 'conservation innovation blockchain technology NFT environmental real-world impact sustainability',
    url: '/blog/conservation-through-innovation',
    category: 'Conservation',
    keywords: ['conservation', 'innovation', 'blockchain', 'environmental', 'sustainability', 'impact']
  },
  {
    id: 'heartwood-chronicles-domains',
    type: 'blog',
    title: 'The Heartwood Chronicles: The Domains of Everdantia',
    description: 'Explore the living Domains of Everdantia — Forest, Hilltop, Clearing, Night Sky, Ancient Ruins, and Aurora Canopy.',
    content: 'heartwood chronicles domains forest hilltop clearing night sky ancient ruins aurora canopy lore worldbuilding',
    url: '/blog/draft-heartwood-chronicles-domains',
    category: 'Lore',
    keywords: ['domains', 'forest', 'hilltop', 'clearing', 'night sky', 'ruins', 'aurora', 'lore']
  },
  {
    id: 'founding-trees',
    type: 'blog',
    title: 'The Heartwood Chronicles: Founding Trees',
    description: 'Discover the ancient guardians and founding trees that shaped the world of Everdantia.',
    content: 'heartwood chronicles founding trees ancient guardians lore history worldbuilding everdantia',
    url: '/blog/heartwood-chronicles-founding-trees',
    category: 'Lore',
    keywords: ['founding trees', 'guardians', 'ancient', 'history', 'lore', 'chronicles']
  },
  
  // Main pages
  {
    id: 'home',
    type: 'page',
    title: 'Everdantia - Digital Forest NFTs Supporting Real Conservation',
    description: 'Join Everdantia, where digital nature protects the real one. Mint unique tree NFTs that support reforestation and forest conservation.',
    content: 'digital forest NFT conservation reforestation blockchain environmental nature trees mint collection community',
    url: '/',
    category: 'Main',
    keywords: ['home', 'everdantia', 'nft', 'trees', 'conservation', 'forest', 'mint']
  },
  {
    id: 'about',
    type: 'page',
    title: 'About Everdantia',
    description: 'Learn about our mission to bridge digital art and environmental conservation through innovative NFT technology.',
    content: 'about mission environmental conservation digital art NFT technology bridge innovation sustainability',
    url: '/about',
    category: 'Main',
    keywords: ['about', 'mission', 'team', 'conservation', 'innovation', 'sustainability']
  },
  {
    id: 'collection',
    type: 'page',
    title: 'Tree Collection',
    description: 'Explore the diverse collection of unique digital trees, each with its own story and conservation impact.',
    content: 'tree collection unique digital stories conservation impact diversity forest gallery showcase',
    url: '/collection',
    category: 'Collection',
    keywords: ['collection', 'trees', 'gallery', 'unique', 'showcase', 'diversity']
  },
  {
    id: 'faq',
    type: 'page',
    title: 'Frequently Asked Questions',
    description: 'Find answers to common questions about Everdantia, NFTs, conservation, and our community.',
    content: 'FAQ questions answers Everdantia NFT blockchain conservation mint community technical support help',
    url: '/faq',
    category: 'Main',
    keywords: ['faq', 'questions', 'answers', 'help', 'support', 'guide', 'information']
  },
  {
    id: 'community',
    type: 'page',
    title: 'Community',
    description: 'Join our growing community of forest guardians and conservation enthusiasts.',
    content: 'community forest guardians conservation enthusiasts discord social media join together',
    url: '/community',
    category: 'Community',
    keywords: ['community', 'discord', 'guardians', 'social', 'join', 'together']
  },

  // Tree types/collection items
  {
    id: 'whisperroot-hollow',
    type: 'tree',
    title: 'Whisperroot of the Hollow',
    description: 'In the quietest part of the forest, Whisperroot listens to the dreams of soil and draws stories from below.',
    content: 'whisperroot hollow quiet forest dreams soil stories roots aquifers ancient voices birds nest',
    url: '/collection#whisperroot',
    category: 'Tree',
    keywords: ['whisperroot', 'hollow', 'quiet', 'forest', 'ancient', 'dreams', 'roots']
  },
  {
    id: 'gloomshade-elder',
    type: 'tree',
    title: 'Gloomshade Elder',
    description: 'Veiled in perpetual twilight, the Gloomshade Elder blooms only during eclipses and induces visions.',
    content: 'gloomshade elder twilight eclipse bloom visions shimmer leaves scent changed eyes mirrors',
    url: '/collection#gloomshade',
    category: 'Tree',
    keywords: ['gloomshade', 'elder', 'twilight', 'eclipse', 'visions', 'mysterious', 'ancient']
  },
  {
    id: 'crown-return',
    type: 'tree',
    title: 'Crown of Return',
    description: 'A majestic tree that represents renewal, regeneration, and the eternal cycle of forest life.',
    content: 'crown return majestic renewal regeneration eternal cycle forest life rebirth growth',
    url: '/collection#crown-return',
    category: 'Tree',
    keywords: ['crown', 'return', 'renewal', 'regeneration', 'cycle', 'majestic', 'rebirth']
  }
];

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get('q')?.toLowerCase().trim();
  const type = url.searchParams.get('type')?.toLowerCase();
  const category = url.searchParams.get('category')?.toLowerCase();

  if (!query) {
    return new Response(JSON.stringify({ 
      error: 'Search query is required',
      results: [],
      total: 0 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Filter by type and category if specified
  let filteredContent = searchableContent;
  
  if (type) {
    filteredContent = filteredContent.filter(item => item.type === type);
  }
  
  if (category) {
    filteredContent = filteredContent.filter(item => 
      item.category.toLowerCase() === category
    );
  }

  // Search algorithm - multi-field weighted search
  const results = filteredContent
    .map(item => {
      let score = 0;
      const queryWords = query.split(' ').filter(word => word.length > 2);
      
      queryWords.forEach(word => {
        // Title match (highest weight)
        if (item.title.toLowerCase().includes(word)) {
          score += 10;
        }
        
        // Exact title match bonus
        if (item.title.toLowerCase() === query) {
          score += 20;
        }
        
        // Description match (medium weight)
        if (item.description.toLowerCase().includes(word)) {
          score += 5;
        }
        
        // Keywords match (medium-high weight)
        if (item.keywords.some(keyword => keyword.toLowerCase().includes(word))) {
          score += 7;
        }
        
        // Content match (lower weight)
        if (item.content.toLowerCase().includes(word)) {
          score += 2;
        }
        
        // Category match
        if (item.category.toLowerCase().includes(word)) {
          score += 3;
        }
      });
      
      return { ...item, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // Limit to top 20 results

  return new Response(JSON.stringify({
    query,
    results: results.map(({ score, ...item }) => item), // Remove score from response
    total: results.length,
    filters: { type, category }
  }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300' // 5 minute cache
    }
  });
};
