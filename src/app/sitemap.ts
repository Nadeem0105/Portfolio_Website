import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Since we don't know the exact domain yet, we can use a generic or empty path
  // If a domain is acquired, it should replace the baseUrl
  const baseUrl = 'https://mohammadnadeem.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
