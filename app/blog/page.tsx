import Link from 'next/link'
import { posts } from '@/data/blog'

export default function BlogPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-14 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">Blog</h1>
          <p className="mt-2 opacity-90">Writing and notes</p>
        </div>
      </header>
      <section className="section">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.slug} className="rounded-lg border p-4">
              <h2 className="text-lg font-semibold">
                <Link className="hover:text-primary-600" href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="mt-1 text-xs text-gray-500">{new Date(p.date).toLocaleDateString()}</p>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{p.summary}</p>
              <div className="mt-3">
                <Link className="text-sm underline hover:text-primary-600" href={`/blog/${p.slug}`}>Read more</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
