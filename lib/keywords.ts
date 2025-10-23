// SEO Keywords Configuration for Sanjoy Mukherjee Portfolio

export const seoKeywords = {
  // Primary keywords - highest priority
  primary: [
    'Sanjoy Mukherjee',
    'Principal Architect',
    'Salesforce Architect',
    'Pharmaceutical CRM',
    'Veeva CRM',
    'Enterprise Architect'
  ],

  // Secondary keywords - medium priority  
  secondary: [
    'Salesforce implementation',
    'pharmaceutical technology',
    'CRM architecture',
    'enterprise solutions',
    'pharma sales automation',
    'relationship marketing',
    'SOA implementation',
    'Apex development',
    'Lightning Platform',
    'healthcare CRM'
  ],

  // Long-tail keywords - specific searches
  longTail: [
    'Salesforce implementation for pharmaceutical companies',
    'Veeva CRM architecture best practices',
    'pharmaceutical sales process automation',
    'enterprise CRM integration patterns',
    'pharma relationship marketing campaigns',
    'Salesforce consulting services pharmaceutical',
    '16 years Salesforce experience',
    'pharmaceutical CRM consultant',
    'enterprise architecture for pharma sales'
  ],

  // Technical keywords
  technical: [
    'Apex programming',
    'Lightning Web Components',
    'REST API integration',
    'SOAP web services',
    'microservices architecture',
    'enterprise integration patterns',
    'API-first design',
    'cloud architecture',
    'scalable CRM solutions'
  ],

  // Industry-specific keywords
  industry: [
    'pharmaceutical CRM solutions',
    'pharma sales rep CRM',
    'pharmaceutical customer segmentation',
    'drug launch CRM strategy',
    'pharma compliance CRM',
    'medical affairs CRM',
    'pharmaceutical data integration',
    'healthcare digital transformation',
    'pharma technology consultant'
  ],

  // Service-based keywords
  services: [
    'CRM implementation expert',
    'pharmaceutical solutions architect',
    'Salesforce consulting services',
    'Veeva CRM implementation consultant',
    'enterprise integration consultant',
    'pharmaceutical CRM optimization',
    'CRM architecture design',
    'technical strategy consultant'
  ]
}

// Generate keyword strings for meta tags
export const getKeywordsString = (categories: (keyof typeof seoKeywords)[] = ['primary', 'secondary']) => {
  const keywords: string[] = []
  
  categories.forEach(category => {
    keywords.push(...seoKeywords[category])
  })
  
  return keywords.join(', ')
}

// Page-specific keyword configurations
export const pageKeywords = {
  home: getKeywordsString(['primary', 'secondary']),
  about: getKeywordsString(['primary', 'longTail', 'services']),
  experience: getKeywordsString(['primary', 'technical', 'industry']),
  projects: getKeywordsString(['technical', 'industry', 'services']),
  publications: getKeywordsString(['primary', 'industry', 'longTail']),
  conferences: getKeywordsString(['primary', 'services', 'industry']),
  contact: getKeywordsString(['primary', 'services'])
}

// SEO-optimized descriptions with keywords
export const seoDescriptions = {
  home: `Sanjoy Mukherjee - Principal Architect with 16+ years of Salesforce and Veeva CRM expertise. Specializing in pharmaceutical CRM solutions, enterprise architecture, and pharma sales automation.`,
  
  about: `Learn about Sanjoy Mukherjee's 16+ years of experience as a Principal Architect specializing in Salesforce implementation, Veeva CRM, and pharmaceutical technology solutions.`,
  
  experience: `Explore Sanjoy Mukherjee's professional journey from Technical Lead to Principal Architect, with extensive experience in Salesforce, Veeva CRM, and pharmaceutical enterprise solutions.`,
  
  projects: `Discover Sanjoy Mukherjee's portfolio of pharmaceutical CRM projects, including Salesforce implementations, Veeva architecture, and enterprise integration solutions.`,
  
  publications: `Read Sanjoy Mukherjee's research papers and technical articles on pharmaceutical CRM, Salesforce architecture, and enterprise integration patterns.`,
  
  conferences: `Sanjoy Mukherjee's speaking engagements at Salesforce World Tour, pharmaceutical technology conferences, and enterprise architecture summits.`,
  
  contact: `Contact Sanjoy Mukherjee for Salesforce consulting, pharmaceutical CRM implementation, Veeva architecture, and enterprise solutions consulting services.`
}