"use client"

import Link from "next/link"

export default function ProjectsPage() {
  const projects: Array<{ title: string; href?: string; tags?: string[]; description?: string }> = [
    { title: "Jungle.Baby - Kids Activity Booking Platform", href: "https://www.jungle.baby/", tags: ["Next.js", "Algolia", "Posthog", "Flutter", "Firebase"], description: "End-to-end platform for discovering and booking kids' activities." },
    { title: "Jungle Data Editors - Blog & Camp", tags: ["React", "Firestore", "Automations"], description: "In-house data editors powering Jungle.baby workflows." },
    { title: "Sequester Green Brigade", tags: ["Flutter", "Figma", "Firebase"], description: "Citizen app to report and route unhygienic areas for cleaning." },
    { title: "Sohan Enterprises - Inventory System", tags: ["Flutter", "Firebase"], description: "Internal jewellery inventory and servicing flows with companion app." },
  ]

  return (
    <main className="max-w-4xl mx-auto px-8 lg:px-1 py-24">
      <div className="flex items-end justify-between mb-10">
        <h1 className="text-4xl font-light">All Projects</h1>
        <Link href="/" className="px-3 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300">Back to home</Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <article key={idx} className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
            <h2 className="text-lg font-medium mb-2">{p.title}</h2>
            {p.description && <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.description}</p>}
            {p.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs text-muted-foreground rounded">
                    {t}
                  </span>
                ))}
              </div>
            )}
            {p.href ? (
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="text-sm inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors">
                Visit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9" />
                </svg>
              </a>
            ) : (
              <span className="text-sm text-muted-foreground">Internal / private</span>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}


