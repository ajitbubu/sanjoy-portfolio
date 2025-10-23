import { Contact } from '@/components/sections/Contact'
import { site } from '@/data/site'
import { pageKeywords, seoDescriptions } from '@/lib/keywords'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Contact ${site.name} — Salesforce & Pharmaceutical CRM Consulting`,
  description: seoDescriptions.contact,
  keywords: pageKeywords.contact,
  openGraph: {
    title: `Contact ${site.name} — Salesforce & Pharmaceutical CRM Consulting`,
    description: seoDescriptions.contact,
    type: 'profile',
  },
}

export default function ContactPage() {
  return (
    <main>
      <Contact />
    </main>
  )
}