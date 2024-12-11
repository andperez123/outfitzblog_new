/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Outfitz AI Personal Stylist',
  author: 'Outfitz Team',
  headerTitle: 'Outfitz AI',
  description: 'Discover the ultimate AI-powered personal stylist for effortless fashion and confidence. Outfitz AI helps you curate your perfect wardrobe with style tips, recommendations, and more.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://outfitz.ai',
  siteRepo: 'https://github.com/andperez123/outfitzblog_new',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/outfitz-logo.png`, // Replace with your logo
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/outfitz-banner.png`, // Replace with your banner image
  mastodon: '',
  email: 'support@outfitz.ai',
  github: '',
  x: '',
  facebook: '',
  youtube: '',
  linkedin: '',
  threads: '',
  instagram: '',
  medium: '',
  bluesky: '',
  locale: 'en-US',
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      umamiWebsiteId: process.env.NEXT_UMAMI_ID,
    },
  },
  newsletter: {
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus',
    giscusConfig: {
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname',
      reactions: '1',
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  seo: {
    metaDescription:
      'Outfitz AI Personal Stylist: Your trusted AI assistant for curating personalized outfits, improving your style, and discovering the latest fashion trends.',
    metaKeywords:
      'AI personal stylist, outfit recommendations, personalized fashion, Outfitz AI, wardrobe styling, fashion blog, style tips, AI wardrobe assistant, curated fashion',
    openGraph: {
      title: 'Outfitz AI Personal Stylist',
      description:
        'Explore AI-powered fashion recommendations and personalized outfit styling with Outfitz AI. Discover confidence through style.',
      image: `${process.env.BASE_PATH || ''}/static/images/outfitz-banner.png`,
      url: 'https://outfitz.ai',
      type: 'website',
    },
    twitterCard: {
      card: 'summary_large_image',
      title: 'Outfitz AI Personal Stylist',
      description:
        'Discover confidence through personalized AI-powered fashion recommendations with Outfitz AI.',
      image: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
    },
  },
};
module.exports = siteMetadata