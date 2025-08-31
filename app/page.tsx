"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "education", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-8 lg:px-16">
        <div
          role="navigation"
          aria-label="Primary"
          className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border"
        >
          <div className="flex items-center justify-between py-3">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">Harsh Mehta's Portfoli0</div>
            <ul className="flex items-center gap-6 text-sm">
              {[
                { label: "Home", id: "intro" },
                { label: "Experience", id: "work" },
                { label: "Projects", id: "projects" },
                { label: "Education", id: "education" },
                { label: "Contact", id: "connect" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })}
                    className={`transition-colors ${
                      activeSection === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el }}
          className="min-h-screen flex items-center opacity-0 scroll-mt-24"
        >
          <div className="grid lg:grid-cols-5 gap-16 w-full">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-6xl lg:text-7xl font-light tracking-tight">
                  Harsh
                  <br />
                  <span className="text-muted-foreground">Mehta</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Software engineer crafting digital experiences at the intersection of
                  <span className="text-foreground"> design</span>,<span className="text-foreground"> technology</span>,
                  and
                  <span className="text-foreground"> human behavior</span>.
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Based in India</div>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/resume.pdf"
                    download
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Resume
                  </a>
                  <a
                    href="https://github.com/harshmehta15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 flex items-center gap-2"
                    aria-label="Open GitHub profile"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://leetcode.com/u/19it056/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 flex items-center gap-2"
                    aria-label="Open LeetCode profile"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    LeetCode
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">SDE</div>
                  <div className="text-muted-foreground">@ Loocafe</div>
                  <div className="text-xs text-muted-foreground">2023 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Flutter", "React", "Next.js", "Firebase", "Supabase", "GCP"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="work" ref={(el) => { sectionsRef.current[1] = el }} className="min-h-screen py-32 opacity-0">
          <div className="space-y-16">
            <div className="flex items-end justify-between">
              <h2 className="text-4xl font-light">Work Experience</h2>
              <div className="text-sm text-muted-foreground font-mono">2019 — 2025</div>
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "2023",
                  role: "Senior Frontend Engineer",
                  company: "Vercel",
                  description: "Leading frontend architecture for developer tools and AI-powered features.",
                  tech: ["React", "TypeScript", "Next.js"],
                },
                {
                  year: "2022",
                  role: "Frontend Engineer",
                  company: "Linear",
                  description: "Built performant interfaces for project management and team collaboration.",
                  tech: ["React", "GraphQL", "Framer Motion"],
                },
                {
                  year: "2021",
                  role: "Full Stack Developer",
                  company: "Stripe",
                  description: "Developed payment infrastructure and merchant-facing dashboard features.",
                  tech: ["Ruby", "React", "PostgreSQL"],
                },
                {
                  year: "2019",
                  role: "Software Engineer",
                  company: "Airbnb",
                  description: "Created booking flow optimizations and host management tools.",
                  tech: ["React", "Node.js", "MySQL"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
                            ref={(el) => { sectionsRef.current[2] = el }}
          className="min-h-screen py-32 opacity-0 scroll-mt-24"
        >
          <div className="space-y-16">
            <h2 className="text-4xl font-light">Projects</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Project One",
                  description: "Brief summary of what this project does and your impact. Link to code or demo.",
                  tech: ["Next.js", "React", "Firebase"],
                  href: "#",
                },
                {
                  title: "Project Two",
                  description: "Brief summary of the project with measurable outcomes or interesting technical detail.",
                  tech: ["Flutter", "Supabase", "GCP"],
                  href: "#",
                },
              ].map((proj) => (
                <a
                  key={proj.title}
                  href={proj.href}
                  className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t) => (
                        <span key={t} className="px-2 py-1 text-xs text-muted-foreground rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
                            ref={(el) => { sectionsRef.current[3] = el }}
          className="min-h-screen py-32 opacity-0 scroll-mt-24"
        >
          <div className="space-y-12">
            <h2 className="text-4xl font-light">Education and Certifications</h2>
            <div className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
              <div className="flex flex-col gap-1">
                <div className="text-lg">Bachelor of Engineering in Information Technology</div>
                <div className="text-sm text-muted-foreground">Gujarat Technological University (GTU)</div>
              </div>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Specialized in Information Technology with focus on software development, database management, and web technologies.
              </p>
            </div>

            <div className="border-t border-muted-foreground/20 mb-8"></div>

            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  name: "AWS Certified Cloud Practitioner",
                  issuer: "Amazon Web Services",
                  date: "2024",
                  description: "Foundational cloud computing concepts and AWS services"
                },
                {
                  name: "Google Cloud Platform Fundamentals",
                  issuer: "Google Cloud",
                  date: "2024",
                  description: "Core infrastructure and services on Google Cloud Platform"
                },
                {
                  name: "Microsoft Azure Fundamentals",
                  issuer: "Microsoft",
                  date: "2023",
                  description: "Cloud concepts and Azure services fundamentals"
                },
                {
                  name: "React Developer Certification",
                  issuer: "Meta",
                  date: "2023",
                  description: "Advanced React development and best practices"
                }
              ].map((cert, index) => (
                <div key={index} className="group p-6 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-medium">{cert.name}</div>
                      <button 
                        onClick={() => window.open(`/certificates/${cert.name.toLowerCase().replace(/\s+/g, '-')}.pdf`, '_blank')}
                        className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200 group-hover:bg-muted-foreground/20"
                        aria-label={`View ${cert.name} certificate`}
                      >
                        <svg
                          className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground">{cert.issuer} • {cert.date}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="thoughts" ref={(el) => { sectionsRef.current[4] = el }} className="min-h-screen py-32 opacity-0">
          <div className="space-y-16">
            <h2 className="text-4xl font-light">Recent Thoughts</h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "The Future of Web Development",
                  excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                  date: "Dec 2024",
                  readTime: "5 min",
                },
                {
                  title: "Design Systems at Scale",
                  excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "Performance-First Development",
                  excerpt: "Why performance should be a first-class citizen in your development workflow.",
                  date: "Oct 2024",
                  readTime: "6 min",
                },
                {
                  title: "The Art of Code Review",
                  excerpt: "Building better software through thoughtful and constructive code reviews.",
                  date: "Sep 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[5] = el }} className="py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:harshmehta1591@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-lg">harshmehta1591@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-2 gap-4">
                                  {[
                    { name: "GitHub", handle: "@harshmehta15", url: "https://github.com/harshmehta15" },
                    { name: "Twitter", handle: "@jordanchen", url: "#" },
                    { name: "LinkedIn", handle: "@harshmehta15", url: "https://www.linkedin.com/in/harshmehta15" },
                    { name: "LeetCode", handle: "@19it056", url: "https://leetcode.com/u/19it056/" },
                  ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Harsh Mehta. All rights reserved.</div>
              
            </div>

            <div className="flex items-center gap-4">
              

              <button className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
