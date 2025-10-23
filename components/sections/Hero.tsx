import { site } from '@/data/site'
import Link from 'next/link'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="py-20 md:py-32" id="hero">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                <span className="block text-gray-900 dark:text-white">
                  {site.name}
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-blue-600 dark:text-blue-400 mt-2">
                  {site.tagline}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {site.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Get in touch
              </Link>
              <a 
                href={site.socials.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                View LinkedIn
              </a>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/profile-pic.jpeg"
                  alt={`${site.name} profile picture`}
                  width={400}
                  height={400}
                  priority
                  className="h-auto w-[300px] sm:w-[350px] md:w-[400px] object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
