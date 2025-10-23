"use client"

import { trackPortfolioEvent } from '@/lib/useAnalytics'

interface LinkedInButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function LinkedInButton({ href, children, className }: LinkedInButtonProps) {
  const handleClick = () => {
    trackPortfolioEvent.clickExternalLink('LinkedIn', href)
  }

  return (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}