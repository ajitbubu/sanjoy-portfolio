import { Publications } from '@/components/sections/Publications'
import { site } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Publications — ${site.name}`,
  description: 'Research papers, technical articles, and case studies contributing to the advancement of enterprise architecture and pharmaceutical technology.',
}

export default function PublicationsPage() {
  return (
    <main>
      <Publications />
    </main>
  )
}