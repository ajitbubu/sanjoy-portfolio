import { About } from '@/components/sections/About'
import { site } from '@/data/site'
import { pageKeywords, seoDescriptions } from '@/lib/keywords'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About ${site.name} — Principal Architect & Salesforce Expert`,
  description: seoDescriptions.about,
  keywords: pageKeywords.about,
  openGraph: {
    title: `About ${site.name} — Principal Architect & Salesforce Expert`,
    description: seoDescriptions.about,
    type: 'profile',
    images: ['/profile-pic.jpeg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${site.name} — Principal Architect & Salesforce Expert`,
    description: seoDescriptions.about,
    images: ['/profile-pic.jpeg'],
  },
}

export default function AboutPage() {
  return (
    <main>
      <About />
    </main>
  )
}