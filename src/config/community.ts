---
// Community Integration Configuration
// Discord and social media integration settings

export const communityConfig = {
  discord: {
    serverId: 'YOUR_DISCORD_SERVER_ID', // Replace with actual server ID
    inviteCode: 'gJzaprRj', // Your current invite code
    channelIds: {
      general: 'GENERAL_CHANNEL_ID',
      announcements: 'ANNOUNCEMENTS_CHANNEL_ID',
      nft_discussion: 'NFT_DISCUSSION_CHANNEL_ID'
    },
    widgetApiUrl: 'https://discord.com/api/guilds/YOUR_SERVER_ID/widget.json'
  },
  
  social: {
    twitter: {
      handle: '@Everdantia',
      hashtags: ['#Everdantia', '#NFT', '#Conservation', '#DigitalForest']
    },
    instagram: {
      handle: '@EverdantiaNFT'
    }
  },

  testimonials: [
    {
      id: 1,
      name: 'Alex Forest',
      role: 'Early Supporter',
      avatar: '/images/community/avatar1.jpg',
      quote: 'Everdantia perfectly combines my love for digital art and environmental conservation. The community is amazing!',
      featured: true
    },
    {
      id: 2,
      name: 'Maria Green',
      role: 'Community Member',
      avatar: '/images/community/avatar2.jpg',
      quote: 'Every tree tells a story, and I love being part of this magical forest journey.',
      featured: true
    },
    {
      id: 3,
      name: 'TreeLover_ETH',
      role: 'Discord Moderator',
      avatar: '/images/community/avatar3.jpg',
      quote: 'The art is stunning and knowing it supports real conservation makes it even more special.',
      featured: false
    }
  ],

  stats: {
    // These would be fetched from APIs in real implementation
    discordMembers: 847,
    newsletterSubscribers: 1234,
    twitterFollowers: 892,
    instagramFollowers: 445
  }
};
