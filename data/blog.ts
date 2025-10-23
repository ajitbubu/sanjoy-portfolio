export type Post = {
  slug: string
  title: string
  date: string
  summary: string
  content: string
}

export const posts: Post[] = [
  {
    slug: 'leading-crm-architectures',
    title: 'Leading CRM Architectures in Pharma',
    date: '2024-11-20',
    summary: 'Notes on designing scalable Salesforce/Veeva architectures for pharma field reps and marketing.',
    content:
      'Placeholder: Key patterns for account hierarchies, activity capture, and MDM integrations. Replace with your write-up.',
  },
  {
    slug: 'relationship-marketing-blueprints',
    title: 'Relationship Marketing Blueprints',
    date: '2025-02-10',
    summary: 'Campaign orchestration, segmentation, and multi-channel activation considerations.',
    content:
      'Placeholder: Architecture for RM campaigns—eligibility, suppression, consent, and channel execution.',
  },
]
