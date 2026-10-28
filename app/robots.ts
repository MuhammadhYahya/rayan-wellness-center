import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Always the www address — the same one used for canonicals and the sitemap.
  const baseUrl = 'https://www.rayanwellness.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

