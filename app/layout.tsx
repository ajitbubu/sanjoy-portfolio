import './globals.css'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@/lib/ga'
import { site } from '@/data/site'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { pageKeywords, seoDescriptions } from '@/lib/keywords'
import { personSchema, websiteSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: seoDescriptions.home,
  keywords: pageKeywords.home,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: seoDescriptions.home,
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/profile-pic.jpeg',
        width: 400,
        height: 400,
        alt: `${site.name} - Principal Architect`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: seoDescriptions.home,
    images: ['/profile-pic.jpeg'],
    creator: '@sanjoymukherjee',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  metadataBase: new URL(site.url),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <GoogleAnalytics />
        <main className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
