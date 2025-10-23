import { site } from '@/data/site'

export function Skills() {
  return (
    <section className="py-20" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Skills & Expertise
          </h2>
          <div className="mt-4 w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technical skills and domain expertise developed over 16+ years in enterprise architecture.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {site.skills.map((skillGroup) => (
              <div 
                key={skillGroup.group} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {skillGroup.group}
                  </h3>
                  <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  {skillGroup.items.map((skill) => (
                    <div 
                      key={skill}
                      className="flex items-center"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Core Competencies
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Specialized in designing and implementing enterprise-grade Salesforce and Veeva solutions for pharmaceutical companies, 
              with deep expertise in CRM architectures, relationship marketing platforms, and SOA implementations. 
              Proven track record in leading technical teams and delivering complex integrations from concept to production.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
