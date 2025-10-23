import { Skills as SkillsSection } from '@/components/sections/Skills'

export default function SkillsPage() {
  return (
    <main>
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 py-14 text-white">
        <div className="container">
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="mt-2 opacity-90">Technologies and expertise</p>
        </div>
      </header>
      <SkillsSection />
    </main>
  )
}
