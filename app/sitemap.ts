import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.sanjoymukherjee.dev'
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/awards',
    '/blog',
    '/books',
    '/conferences',
    '/contact',
    '/experience',
    '/media',
    '/membership',
    '/newsletters',
    '/projects',
    '/publications',
    '/skills',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}