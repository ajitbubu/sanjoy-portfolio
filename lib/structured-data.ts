import { site } from '@/data/site'

// Person Schema for Sanjoy Mukherjee
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": site.name,
  "jobTitle": site.tagline,
  "description": site.description,
  "url": site.url,
  "email": site.contact.email,
  "sameAs": [
    site.socials.linkedin
  ],
  "image": `${site.url}/profile-pic.jpeg`,
  "knowsAbout": [
    "Salesforce Architecture",
    "Veeva CRM",
    "Pharmaceutical CRM",
    "Enterprise Architecture",
    "SOA Implementation",
    "Apex Development",
    "Lightning Platform",
    "Pharmaceutical Technology",
    "CRM Integration",
    "Relationship Marketing"
  ],
  "hasOccupation": {
    "@type": "Occupation",
    "name": "Principal Architect",
    "description": "Enterprise architect specializing in Salesforce and pharmaceutical CRM solutions",
    "skills": [
      "Salesforce",
      "Veeva CRM",
      "Enterprise Architecture",
      "Pharmaceutical CRM",
      "SOA",
      "API Integration",
      "Apex Programming",
      "Lightning Platform"
    ]
  },
  "alumniOf": {
    "@type": "Organization",
    "name": "Technology Education"
  },
  "award": [
    "Excellence in Enterprise Architecture 2023",
    "Salesforce Implementation Excellence 2022",
    "Innovation in Pharma Technology 2021"
  ]
}

// Professional Service Schema
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": `${site.name} - Salesforce & Pharmaceutical CRM Consulting`,
  "description": "Expert Salesforce and pharmaceutical CRM consulting services with 16+ years of experience",
  "provider": {
    "@type": "Person",
    "name": site.name,
    "jobTitle": site.tagline
  },
  "serviceType": [
    "Salesforce Architecture",
    "Veeva CRM Implementation",
    "Pharmaceutical CRM Solutions",
    "Enterprise Integration",
    "SOA Implementation",
    "CRM Consulting"
  ],
  "areaServed": "Global",
  "url": site.url,
  "email": site.contact.email,
  "sameAs": [site.socials.linkedin]
}

// Organization Schema (if representing as consultant/freelancer)
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": `${site.name} Consulting`,
  "description": "Salesforce and pharmaceutical CRM consulting services",
  "url": site.url,
  "email": site.contact.email,
  "founder": {
    "@type": "Person",
    "name": site.name
  },
  "sameAs": [site.socials.linkedin],
  "knowsAbout": [
    "Salesforce",
    "Veeva CRM",
    "Pharmaceutical Technology",
    "Enterprise Architecture",
    "CRM Implementation"
  ]
}

// Website Schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": `${site.name} Portfolio`,
  "description": site.description,
  "url": site.url,
  "author": {
    "@type": "Person",
    "name": site.name
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${site.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
}

// Breadcrumb Schema Generator
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

// Article Schema for Publications
export const generateArticleSchema = (article: {
  title: string
  description: string
  datePublished: string
  url: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.title,
  "description": article.description,
  "datePublished": article.datePublished,
  "author": {
    "@type": "Person",
    "name": site.name,
    "url": site.url
  },
  "publisher": {
    "@type": "Person",
    "name": site.name,
    "url": site.url
  },
  "url": article.url,
  "mainEntityOfPage": article.url
})

// FAQ Schema for common questions
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Sanjoy Mukherjee's expertise?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sanjoy Mukherjee is a Principal Architect with 16+ years of experience in Salesforce and Veeva CRM implementations, specializing in pharmaceutical CRM solutions and enterprise architecture."
      }
    },
    {
      "@type": "Question", 
      "name": "What services does Sanjoy Mukherjee offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Services include Salesforce architecture and implementation, Veeva CRM consulting, pharmaceutical CRM solutions, enterprise integration, SOA implementation, and technical strategy consulting."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Sanjoy Mukherjee work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primary focus on pharmaceutical and healthcare industries, with extensive experience in pharma sales automation, relationship marketing, and compliance-focused CRM solutions."
      }
    }
  ]
}