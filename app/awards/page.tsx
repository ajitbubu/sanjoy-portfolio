import { Awards } from '@/components/sections/Awards'
import { site } from '@/data/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Awards & Recognition — ${site.name}`,
  description: 'Recognition and awards for excellence in enterprise architecture, Salesforce implementations, and innovation in pharmaceutical technology.',
}

export default function AwardsPage() {
  return (
    <main>
      <Awards />
    </main>
  )
}