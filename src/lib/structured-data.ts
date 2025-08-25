---
// Advanced structured data for Everdantia
export interface StructuredDataProps {
  type: 'organization' | 'website' | 'nft-collection' | 'blog-post' | 'faq';
  data?: any;
}

export function generateStructuredData(type: string, customData: any = {}) {
  const baseUrl = 'https://everdantia.art';
  
  const schemas = {
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Everdantia",
      "url": baseUrl,
      "logo": `${baseUrl}/favicon/favicon.svg`,
      "description": "Digital forest NFTs supporting real-world conservation and reforestation efforts",
      "foundingDate": "2025",
      "founder": {
        "@type": "Person",
        "name": "JB",
        "jobTitle": "Founder & Environmental Advocate"
      },
      "sameAs": [
        "https://twitter.com/Everdantia",
        "https://instagram.com/EverdantiaNFT"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "everdantia@gmail.com",
        "contactType": "General Inquiry"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Global"
      },
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Environmental Conservation",
        "NFT Collections",
        "Blockchain Technology",
        "Digital Art",
        "Reforestation"
      ]
    },

    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Everdantia",
      "url": baseUrl,
      "description": "Digital forest NFTs supporting real-world conservation",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Everdantia"
      }
    },

    nftCollection: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "Everdantia Genesis Collection",
      "description": "100 unique tree NFTs supporting real-world conservation efforts",
      "creator": {
        "@type": "Person",
        "name": "JB",
        "affiliation": "Everdantia"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Everdantia",
        "url": baseUrl
      },
      "dateCreated": "2025",
      "genre": ["Digital Art", "NFT", "Environmental"],
      "keywords": "NFT, digital art, conservation, trees, environment, blockchain",
      "about": [
        {
          "@type": "Thing",
          "name": "Environmental Conservation"
        },
        {
          "@type": "Thing", 
          "name": "Reforestation"
        },
        {
          "@type": "Thing",
          "name": "Digital Art"
        }
      ],
      "numberOfItems": 100,
      "collectionSize": 100
    },

    blogPost: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": customData.title || "Everdantia Blog Post",
      "description": customData.description || "Environmental conservation through digital innovation",
      "author": {
        "@type": "Person",
        "name": "JB",
        "affiliation": "Everdantia"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Everdantia",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/favicon/favicon.svg`
        }
      },
      "datePublished": customData.datePublished || new Date().toISOString(),
      "dateModified": customData.dateModified || new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": customData.url || baseUrl
      },
      "image": customData.image || `${baseUrl}/og-image.png`,
      "articleSection": "Environmental Conservation",
      "keywords": customData.keywords || "conservation, NFT, digital art, environment"
    },

    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Everdantia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Everdantia is a digital forest where NFTs support real-world conservation efforts. Our genesis collection features 100 unique tree NFTs that contribute to reforestation and environmental protection."
          }
        },
        {
          "@type": "Question",
          "name": "How do NFTs support conservation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Each Everdantia NFT purchase directly funds real-world conservation projects including tree planting, forest protection, and ecosystem restoration through verified partnerships."
          }
        },
        {
          "@type": "Question",
          "name": "How many trees are in the genesis collection?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Everdantia genesis collection features 100 unique, hand-crafted tree NFTs, each with its own story and conservation impact."
          }
        },
        {
          "@type": "Question",
          "name": "What blockchain is Everdantia built on?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Everdantia is built on environmentally conscious blockchain technology, ensuring our digital impact aligns with our conservation mission."
          }
        }
      ]
    }
  };

  return { ...schemas[type], ...customData };
}

// SEO-optimized keywords for different pages
export const seoKeywords = {
  homepage: "NFT, digital art, conservation, environmental NFTs, tree NFTs, reforestation, blockchain conservation, eco-friendly NFTs, digital forest, green crypto",
  about: "Everdantia founder, conservation mission, environmental blockchain, NFT conservation project, digital art for nature, solo founder NFT",
  collection: "genesis collection, 100 trees NFT, conservation NFTs, unique tree art, environmental digital art, limited edition NFTs",
  blog: "conservation news, environmental updates, NFT insights, reforestation progress, digital art stories, blockchain sustainability",
  community: "environmental community, conservation advocates, NFT collectors, digital forest community, eco-conscious collectors"
};

// Local SEO data (if applicable for conservation partnerships)
export const localSEO = {
  businessType: "Environmental Technology Company",
  serviceArea: "Global",
  focuses: [
    "Digital Conservation",
    "NFT Collections", 
    "Environmental Art",
    "Blockchain Sustainability"
  ]
};
