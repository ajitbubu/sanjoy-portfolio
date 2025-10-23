"use client"
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView } from './ga'

export function useAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      trackPageView(window.location.href, document.title)
    }
  }, [pathname])
}

// Custom tracking functions for portfolio-specific events
export const trackPortfolioEvent = {
  // Track when someone views a specific section
  viewSection: (sectionName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'view_section', {
        event_category: 'Portfolio',
        event_label: sectionName,
      })
    }
  },

  // Track when someone clicks on external links
  clickExternalLink: (linkType: string, destination: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'click_external_link', {
        event_category: 'Engagement',
        event_label: `${linkType}: ${destination}`,
      })
    }
  },

  // Track when someone downloads a resource
  downloadResource: (resourceType: string, resourceName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_resource', {
        event_category: 'Resources',
        event_label: `${resourceType}: ${resourceName}`,
      })
    }
  },

  // Track contact form interactions
  contactInteraction: (interactionType: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'contact_interaction', {
        event_category: 'Contact',
        event_label: interactionType,
      })
    }
  },

  // Track newsletter subscriptions
  newsletterSubscribe: (newsletterName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'newsletter_subscribe', {
        event_category: 'Engagement',
        event_label: newsletterName,
      })
    }
  },
}