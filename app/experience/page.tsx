import { Experience } from '@/components/sections/Experience'
import { site } from '@/data/site'
import { pageKeywords, seoDescriptions } from '@/lib/keywords'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${site.name} Professional Experience — 16+ Years Salesforce & Pharmaceutical CRM`,
  description: seoDescriptions.experience,
  keywords: pageKeywords.experience,
  openGraph: {
    title: `${site.name} Professional Experience — 16+ Years Salesforce & Pharmaceutical CRM`,
    description: seoDescriptions.experience,
    type: 'profile',
  },
}

export default function ExperiencePage() {
  return (
    <main>
      <Experience />
    </main>
  )
}