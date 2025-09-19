"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [blogs, setBlogs] = useState<Array<{ id: string; title?: string; excerpt?: string; date?: string; readTime?: string }>>([])
  const [loadingBlogs, setLoadingBlogs] = useState(true)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const formatUrlEllipsis = (href: string) => {
    try {
      const u = new URL(href)
      const display = `${u.host}/…${u.pathname.slice(-14)}`
      return display
    } catch {
      return href
    }
  }

  const renderPoint = (text: string) => {
    const parts = text.split(/(@https?:\/\/\S+)/g)
    return parts.map((part, i) => {
      if (part.startsWith('@http')) {
        const href = part.slice(1)
        return (
          <a
            key={`link-${i}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:no-underline"
          >
            {formatUrlEllipsis(href)}
          </a>
        )
      }
      return <span key={`text-${i}`}>{part}</span>
    })
  }

  // No backend: stop fetching blogs from Firebase
  useEffect(() => {
    setBlogs([])
    setLoadingBlogs(false)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Left Side Navigation */}
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

      {/* Top Navigation Bar */}
      <div
        role="navigation"
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-b border-border"
      >
        <div className="max-w-4xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between py-3">
            <div className="text-sm text-muted-foreground font-mono tracking-wider">Harsh Mehta's Portfoli0</div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
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
              
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => {
                    if (theme === "system") {
                      // If system is dark, switch to light; if system is light, switch to dark
                      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                      setTheme(systemIsDark ? "light" : "dark")
                    } else if (theme === "light") {
                      setTheme("dark")
                    } else {
                      setTheme("light")
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
        
        {/* Side Menu */}
        <div
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-medium">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200"
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 p-6">
              <ul className="space-y-4">
                {[
                  { label: "Home", id: "intro" },
                  { label: "Experience", id: "work" },
                  { label: "Projects", id: "projects" },
                  { label: "Education", id: "education" },
                  { label: "Contact", id: "connect" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                        closeMobileMenu()
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-muted-foreground/20 text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10"
                      }`}
                      aria-current={activeSection === item.id ? "page" : undefined}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Theme Toggle */}
              {mounted && (
                <div className="mt-6 pt-6 border-t border-border">
                  <button
                    onClick={() => {
                      if (theme === "system") {
                        // If system is dark, switch to light; if system is light, switch to dark
                        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                        setTheme(systemIsDark ? "light" : "dark")
                      } else if (theme === "light") {
                        setTheme("dark")
                      } else {
                        setTheme("light")
                      }
                    }}
                    className="w-full text-left p-3 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 flex items-center gap-3"
                  >
                    {theme === "dark" ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light Mode
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark Mode
                      </>
                    )}
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 lg:px-1 pt-0">
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
                  Software Engineer helping <span className="text-foreground">Change Poor Perception</span> of
                  <span className="text-foreground"> Public toilets</span> in India,
                  <span className="text-foreground"> One toilet at a Time</span>.
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
                    href="https://docs.google.com/document/d/1SRGcODzKLN8_fbaXtBcRrmjV78lLNzeVoo8_v8gPkKc/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Resume
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
                    href="https://www.linkedin.com/in/harshmehta15"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 flex items-center gap-2"
                    aria-label="Open LinkedIn profile"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.3 8.25h4.4V23H.3V8.25zM8.6 8.25h4.215v2.01h.06c.587-1.113 2.02-2.285 4.158-2.285 4.448 0 5.267 2.928 5.267 6.733V23h-4.4v-6.53c0-1.558-.028-3.56-2.17-3.56-2.172 0-2.505 1.697-2.505 3.45V23H8.6V8.25z" />
                    </svg>
                    LinkedIn
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
                  <div className="text-foreground">Software Developer Engineer</div>
                  <div className="text-muted-foreground">@ <a href="https://www.loocafe.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:no-underline">Loocafe , India</a></div>
                  <div className="text-xs text-muted-foreground">2023 — Present</div>
                  <button
                    onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-2 px-3 py-2 text-xs border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 inline-flex items-center gap-2"
                  >
                    View Experience
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
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
              <div className="text-sm text-muted-foreground font-mono">2023 — Present</div>
            </div>

            <div className="space-y-12">
              {[
                {
                  year: "Aug 2023",
                  role: "Software Developer Engineer",
                  company: "Loocafe , India",
                  highlights: [
                    "Delivered Loocafe app from scratch with four interfaces; Play Store deployment of the app improved operational efficiency by 7x and reduced costs",
                    "Built React dashboard for managers and vertical heads with analytics for monitoring and decision-making",
                    "Loocafe app Play Store link: @https://play.google.com/store/apps/details?id=com.loocafe.toiletfinder",
                    "Developed Ixora Feedback App with GHMC and Hyderabad & Cyberabad Police; enabled live feedback at public sites (Charminar, Goshamahal, Secunderabad, Karwan, Santosh Nagar, etc.)",
                    "Created companion React dashboard to manage and analyze feedback data ",
                    "Feedback app Play Store link: @https://play.google.com/store/apps/details?id=com.ixoragroup.feedbackapp",
                    "Built Ixora Growth Points to track employee productivity and run a loyalty/reward program for 2,000+ employees across all branches of the company . Ixora Growth Points link: @https://ixoragrowthpoints.vercel.app/dashboard",
                    
                    
                    
                  ],
                  tech: ["Flutter", "Nextjs", "Firebase", "GCP"],
                  website: "https://www.loocafe.com/",
                  linkedin: "https://www.linkedin.com/company/loocafe",
                },
                {
                  year: "Feb - Aug 2023",
                  role: "Flutter Developer - Intern",
                  company: "Wrench USA Pvt Ltd , Bangalore",
                  highlights: [
                    "Implemented dynamic tooltips to enhance Maestro Studio detection and QA workflows",
                    "Developed AWS token generator to issue and manage ID/auth/refresh tokens for app consumers",
                    "Enhanced UI components and responsiveness; resolved cross-platform issues",
                    "Collaborated with QA to fix critical bugs; reduced testing time by 3x",
                    "Wrench mobile app App Store link: @https://apps.apple.com/us/app/wrench-mobile-car-mechanics/id1138373180",
                  ],
                  tech: ["Flutter", "AWS","Firebase","Dart", "Github"],
                  website: "https://wrench.com/",
                  linkedin: "https://www.linkedin.com/company/wrench-inc./",
                },
                {
                  year: "June - July 2022",
                  role: "Summer Intern",
                  company: "TatvaSoft , Ahmedabad",
                  highlights: [
                    "Built a full-stack bookstore web app using React, .NET API, and PostgreSQL",
                    "Implemented authentication, catalog management, and cart functionality",
                    "Ensured robust client–server integration and data flow",
                  ],
                  tech: [".Net", "Postgres", "ReactJs"],
                  website: "https://www.tatvasoft.com/",
                  linkedin: "https://www.linkedin.com/company/tatvasoft/",
                  document: "/experience/TatvaSoftExperience.pdf",
                },
              
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-8 py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-l font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground flex items-center gap-3 mt-2">
                        <span>{job.company}</span>
                        {(job as any).website && (
                          <a
                            href={(job as any).website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-1.5 rounded-md border border-border hover:border-muted-foreground/60 transition-colors"
                            aria-label="Company website"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <circle cx="12" cy="12" r="9" strokeWidth="2" />
                              <path d="M3 12h18" strokeWidth="2" />
                              <path d="M12 3c3 3 3 15 0 18" strokeWidth="2" />
                              <path d="M12 3c-3 3-3 15 0 18" strokeWidth="2" />
                            </svg>
                          </a>
                        )}
                        {(job as any).linkedin && (
                          <a
                            href={(job as any).linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-1.5 rounded-md border border-border hover:border-muted-foreground/60 transition-colors"
                            aria-label="Company LinkedIn"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                              <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.3 8.25h4.4V23H.3V8.25zM8.6 8.25h4.215v2.01h.06c.587-1.113 2.02-2.285 4.158-2.285 4.448 0 5.267 2.928 5.267 6.733V23h-4.4v-6.53c0-1.558-.028-3.56-2.17-3.56-2.172 0-2.505 1.697-2.505 3.45V23H8.6V8.25z" />
                            </svg>
                          </a>
                        )}
                        {(job as any).document && (
                          <button
                            onClick={() => window.open((job as any).document, '_blank')}
                            className="inline-flex p-1.5 rounded-md border border-border hover:border-muted-foreground/60 transition-colors"
                            aria-label="View experience document"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {Array.isArray((job as any).highlights) ? (
                      <ul className="list-disc pl-5 text-muted-foreground leading-relaxed space-y-2 max-w-lg">
                        {(job as any).highlights.map((point: string, i: number) => (
                          <li key={i}>{renderPoint(point)}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed max-w-lg">{(job as any).description}</p>
                    )}
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
          className="min-h-screen py-10 opacity-0 scroll-mt-24"
        >
          <div className="space-y-12 text-center lg:text-left">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="text-4xl font-light">Projects & Contributions</h2>
              <div className="flex items-center gap-4">
                
                <Link
                  href="/projects"
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  View all projects
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {[
                {
                  title: "Jungle.Baby - Kids Activity Booking Platform",
                  description: (
                    <>
                      Built for a <span className="text-foreground">fully funded startup in Singapore</span>. End-to-end platform for <span className="text-foreground">discovering and booking kids' activities</span> with <span className="text-foreground">web and mobile apps</span>.
                    </>
                  ),
                  tech: ["Next.js", 'Algolia',"Posthog", "Flutter", "Firebase", "Postman", "Vercel", "PostgreSQL", "Node.js"],
                  more: "#",
                  live: "https://www.jungle.baby/",
                  contribution: true,
                },
                {
                  title: "Jungle Data Editors - Blog & Camp",
                  description: (
                    <>
                      Built in-house data editors powering Jungle.baby: <span className="text-foreground">Blog Editor</span> and <span className="text-foreground">Camp Editor</span> with <span className="text-foreground">real-time updates</span>, <span className="text-foreground">bulk uploads</span>, <span className="text-foreground">email automations</span>, and <span className="text-foreground">backend content workflows</span>.
                    </>
                  ),
                  tech: ["React", "Firestore", "Google Cloud Storage", "REST APIs", "Automations"],
                  more: "#",
                  live: "",
                  contribution: true,
                  internal: true,
                },
                {
                  title: "Sequester Green Brigade",
                  description: (
                    <>
                      Mobile application developed for an associate of <span className="text-foreground">Council on Energy, Environment and Water (CEEW)</span> and <span className="text-foreground">Sequester Environmental Services</span>. Enables citizens to capture photos of unhygienic neighbourhoods and routes them for same‑day cleaning.
                    </>
                  ),
                  tech: ["Flutter", "Figma", "Firebase"],
                  more: "#",
                  live: "",
                  internal: true,
                },
                {
                  title: "Jewellery Inventory System",
                  description: (
                    <>
                      Internal inventory management software jewellery shops. Staff record jewellery <span className="text-foreground">weights before/after services, sales and purchases</span>; supports <span className="text-foreground">polishing</span> and other <span className="text-foreground">gold servicing workflows</span>. Later handed over to a <span className="text-foreground">jewellery shop in Mumbai - Sohan Enterprises</span>.
                    </>
                  ),
                  tech: ["Flutter", "Firebase"],
                  more: "#",
                  live: "",
                  internal: true,
                },
              ].map((project, index) => (
                <article
                  key={index}
                  className="group p-8 border border-muted-foreground/40 lg:border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    {((project as any).contribution) && (
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] uppercase tracking-wide rounded-full border border-border text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground"></span>
                        Contribution
                      </div>
                    )}
                    <h3 className="text-xl font-medium">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500 underline underline-offset-4"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className={`flex items-center gap-3 text-sm w-full ${((project as any).internal) ? 'justify-center lg:justify-start' : ''}`}>
                      <a
                        href={project.more}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 inline-flex items-center gap-2"
                      >
                        View more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                      {(project as any).internal ? (
                        <></>
                      ) : (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 border border-border rounded-lg hover:border-muted-foreground/50 transition-colors duration-300 inline-flex items-center gap-2"
                        >
                          View live URL
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9" />
                      </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="education"
          ref={(el) => { sectionsRef.current[3] = el }}
          className="min-h-screen pt-23 pb-10 opacity-0 scroll-mt-24"
        >
          <div className="space-y-12 text-center lg:text-left">
            <h2 className="text-4xl font-light">Education and Certifications</h2>
            <div className="group p-6 border border-muted-foreground/40 lg:border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-between">
                  <div className="text-lg">Bachelor of Engineering in Information Technology</div>
                  <button
                    onClick={() => window.open('/certifications/GTU_Degree.jpg', '_blank')}
                    className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200 group-hover:bg-muted-foreground/20 inline-flex items-center"
                    aria-label="View degree certificate"
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
                    <span className="ml-2 underline underline-offset-4 text-sm text-muted-foreground lg:hidden">View Document</span>
                  </button>
                </div>
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
                  name: "100x Devs Certified (Cohort 2)",
                  issuer: "100x Devs",
                  date: "2024",
                  description: "Full‑stack JS/TS: Node.js, Express, DBs, auth, APIs, Next.js, frontend patterns, Docker/DevOps; advanced backend & systems: queues, Redis/Kafka, design patterns, scalability, observability, Kubernetes, CI/CD; built real‑world projects."
                },
                {
                  name: "Google Cloud Platform Fundamentals",
                  issuer: "Google Cloud",
                  date: "2024",
                  description: "Core GCP services and architecture: IAM, Cloud Storage, Cloud Run, App Engine, Cloud Functions, Pub/Sub, Cloud SQL/Firestore, load balancing, monitoring with Cloud Logging/Monitoring."
                }
              ].map((cert, index) => (
                <div key={index} className="group p-6 border border-muted-foreground/40 lg:border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-center gap-2 lg:flex-row lg:justify-between">
                      <div className="text-lg font-medium">{cert.name}</div>
                      <button 
                        onClick={() => {
                          if (cert.name === "100x Devs Certified (Cohort 2)") {
                            window.open('/certifications/100xdevs.png', '_blank')
                          } else {
                            window.open(`/certificates/${cert.name.toLowerCase().replace(/\s+/g, '-')}.pdf`, '_blank')
                          }
                        }}
                        className="p-2 rounded-lg hover:bg-muted-foreground/10 transition-colors duration-200 group-hover:bg-muted-foreground/20 inline-flex items-center"
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
                        <span className="ml-2 underline underline-offset-4 text-sm text-muted-foreground lg:hidden">View Document</span>
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



        <section id="connect" ref={(el) => { sectionsRef.current[4] = el }} className="py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-16 text-center lg:text-left">
            <div className="space-y-8">
              <h2 className="text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:harshmehta1591@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300 w-fit mx-auto lg:mx-0"
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

            <div className="space-y-8 text-center lg:text-left">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@harshmehta15", url: "https://github.com/harshmehta15" },
                  { name: "X (formerly Twitter)", handle: "@harshmofficial", url: "https://x.com/harshmofficial" },
                  { name: "LinkedIn", handle: "@harshmehta15", url: "https://www.linkedin.com/in/harshmehta15" },
                  { name: "LeetCode", handle: "@19it056", url: "https://leetcode.com/u/19it056/" },
                  { name: "Discord", handle: "@harsh.mehta", url: "https://discord.com/users/harsh.mehta" },
                  { name: "Telegram", handle: "@harshmehta15", url: "https://t.me/harshmehta15" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-muted-foreground/40 lg:border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name === "X (formerly Twitter)" ? (
                          <>
                            <span className="lg:hidden">X (Twitter)</span>
                            <span className="hidden lg:inline">X (formerly Twitter)</span>
                          </>
                        ) : (
                          social.name
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 lg:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-center lg:text-left">
            <div className="space-y-2">
              <div className="text-sm ">© 2025 Harsh Mehta. All rights reserved.</div>
            </div>


          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-12 lg:h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
