import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://but-lernfoerderung.de'

  // Main pages
  const routes = [
    '',
    '/bildung-und-teilhabe',
    '/impressum',
    '/datenschutz',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Add city pages (example - in production, generate from your cities list)
  const exampleCities = [
    'berlin',
    'hamburg',
    'muenchen',
    'koeln',
    'frankfurt',
    'stuttgart',
    'duesseldorf',
    'dortmund',
    'essen',
    'leipzig',
  ]

  const cityRoutes = exampleCities.map((city) => ({
    url: `${baseUrl}/nachhilfe/${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...cityRoutes]
}

