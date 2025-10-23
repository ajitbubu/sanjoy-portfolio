import { Projects as ProjectsSection } from '@/components/sections/Projects'

export default function ProjectsPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-14 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 opacity-90">Selected work and initiatives</p>
        </div>
      </header>
      <ProjectsSection />
    </main>
  )
}
