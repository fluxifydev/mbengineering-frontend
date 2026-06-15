import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/search', '/firebase-test', '/cloudinary-test'],
    },
    sitemap: 'https://www.mbengineering.online/sitemap.xml',
  };
}
