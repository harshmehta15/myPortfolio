"use client"

import Link from "next/link"
import { useState } from "react"

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  
  const projects: Array<{ 
    title: string; 
    href?: string; 
    tags?: string[]; 
    description?: string;
    category?: string;
    year?: string;
    slug?: string;
  }> = [
    { 
      title: "Jungle.Baby - Kids Activity Booking Platform", 
      href: "https://www.jungle.baby/", 
      tags: ["Next.js", "Algolia", "Posthog", "Flutter", "Firebase"], 
      description: "Built for a fully funded startup in Singapore. End-to-end platform for discovering and booking kids' activities with web and mobile apps.",
      category: "Contribution",
      year: "2024",
      slug: "jungle-baby"
    },
    { 
      title: "Jungle Data Editors - Blog & Camp", 
      tags: ["React", "Firestore", "Automations"], 
      description: "Built in-house data editors powering Jungle.baby: Blog Editor and Camp Editor with real-time updates, bulk uploads, email automations, and backend content workflows.",
      category: "Contribution",
      year: "2024",
      slug: "jungle-data-editors"
    },
    { 
      title: "Sequester Green Brigade", 
      tags: ["Flutter", "Figma", "Firebase"], 
      description: "Mobile application developed for an associate of Council on Energy, Environment and Water (CEEW) and Sequester Environmental Services. Enables citizens to capture photos of unhygienic neighbourhoods and routes them for same‑day cleaning.",
      year: "2023",
      slug: "sequester-green-brigade"
    },
    { 
      title: "Jewellery Inventory System", 
      tags: ["Flutter", "Firebase"], 
      description: "Internal inventory management software jewellery shops. Staff record jewellery weights before/after services, sales and purchases; supports polishing and other gold servicing workflows. Later handed over to a jewellery shop in Mumbai - Sohan Enterprises.",
      year: "2023",
      slug: "jewellery-inventory-system"
    },
  ]

  const filteredProjects = projects
    .filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const yearA = parseInt(a.year || "0")
      const yearB = parseInt(b.year || "0")
      return sortOrder === "desc" ? yearB - yearA : yearA - yearB
    })

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-8 lg:px-16 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light mb-2">All Projects</h1>
              <p className="text-muted-foreground">A collection of my work and contributions</p>
            </div>
            <Link 
              href="/" 
              className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 inline-flex items-center gap-2 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 lg:px-16 py-16">
        {/* Search and Sort Controls */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search projects, technologies, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:border-muted-foreground/50 focus:ring-1 focus:ring-muted-foreground/20 transition-colors duration-300"
            />
          </div>
          
          {/* Sort Button */}
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-muted-foreground/50 hover:bg-muted-foreground/5 transition-all duration-300 group"
          >
            <span className="text-sm text-foreground">Date</span>
            <svg 
              className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${sortOrder === "desc" ? "rotate-0" : "rotate-180"}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <article 
              key={idx} 
              className="group relative overflow-hidden border border-border rounded-xl hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-2xl hover:shadow-foreground/5 bg-gradient-to-br from-background to-background/50"
            >
              {/* Project Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    {project.category ? (
                      <>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted-foreground/10 rounded-full border border-border">
                            {project.category}
                          </span>
                          {project.year && (
                            <span className="text-xs text-muted-foreground font-mono">
                              {project.year}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-medium mb-3 group-hover:text-foreground transition-colors duration-300">
                          {project.title}
                        </h2>
                      </>
                    ) : (
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-xl font-medium group-hover:text-foreground transition-colors duration-300">
                          {project.title}
                        </h2>
                        {project.year && (
                          <span className="text-xs text-muted-foreground font-mono">
                            {project.year}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {project.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                    {project.description}
                  </p>
                )}

                {/* Tech Stack */}
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-muted-foreground/5 border border-border rounded-lg hover:bg-muted-foreground/10 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:border-muted-foreground/50 hover:bg-muted-foreground/5 transition-all duration-300 group/link"
                  >
                    View Project
                    <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9" />
                    </svg>
                  </Link>
                  
                  {project.href ? (
                    <a 
                      href={project.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg hover:border-muted-foreground/50 hover:bg-muted-foreground/5 transition-all duration-300 group/link"
                    >
                      View Live URL
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9" />
                      </svg>
                    </a>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      </svg>
                      Private Repo
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              More projects and contributions coming soon
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}


