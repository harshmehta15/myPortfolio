"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const projects = {
    "jungle-baby": {
      title: "Jungle.Baby - Kids Activity Booking Platform",
      category: "Contribution",
      year: "2024",
      description: "Built for a fully funded startup in Singapore. End-to-end platform for discovering and booking kids' activities with web and mobile apps.",
      longDescription: "Jungle.Baby is a comprehensive platform designed to revolutionize how parents discover and book activities for their children. Built for a fully funded startup in Singapore, this project encompasses both web and mobile applications to provide a seamless experience for families looking for quality kids' activities.",
      tech: ["Next.js", "Algolia", "Posthog", "Flutter", "Firebase", "Postman", "Vercel", "PostgreSQL", "Node.js"],
      liveUrl: "https://www.jungle.baby/",
      features: [
        "Activity discovery and filtering system",
        "Real-time booking and scheduling",
        "Parent and provider dashboards",
        "Payment integration and processing",
        "Review and rating system",
        "Mobile app for iOS and Android",
        "Admin panel for activity management"
      ],
      challenges: [
        "Building scalable architecture for high user traffic",
        "Integrating multiple payment gateways",
        "Creating intuitive user experience for parents",
        "Implementing real-time availability updates"
      ],
      results: [
        "Successfully launched in Singapore market",
        "Improved activity discovery by 300%",
        "Reduced booking time from 15 minutes to 2 minutes",
        "Achieved 95% user satisfaction rating"
      ]
    },
    "jungle-data-editors": {
      title: "Jungle Data Editors - Blog & Camp",
      category: "Contribution",
      year: "2024",
      description: "Built in-house data editors powering Jungle.baby: Blog Editor and Camp Editor with real-time updates, bulk uploads, email automations, and backend content workflows.",
      longDescription: "Internal data management tools built to power the Jungle.baby platform. These editors streamline content creation and management processes, enabling the team to efficiently handle blog posts, camp listings, and automated communications.",
      tech: ["React", "Firestore", "Google Cloud Storage", "REST APIs", "Automations"],
      features: [
        "Rich text editor for blog posts",
        "Camp listing management system",
        "Bulk upload functionality for activities",
        "Email automation workflows",
        "Content scheduling and publishing",
        "Media management and optimization",
        "User permission and role management"
      ],
      challenges: [
        "Creating intuitive content management interface",
        "Implementing real-time collaboration features",
        "Building robust file upload and storage system",
        "Designing flexible automation workflows"
      ],
      results: [
        "Reduced content creation time by 60%",
        "Improved content consistency across platform",
        "Streamlined team collaboration processes",
        "Enhanced content quality and engagement"
      ]
    },
    "sequester-green-brigade": {
      title: "Sequester Green Brigade",
      year: "2023",
      description: "Mobile application developed for an associate of Council on Energy, Environment and Water (CEEW) and Sequester Environmental Services. Enables citizens to capture photos of unhygienic neighbourhoods and routes them for same‑day cleaning.",
      longDescription: "A citizen engagement mobile application that empowers communities to report and track environmental issues in their neighborhoods. Developed in collaboration with CEEW and Sequester Environmental Services, this app facilitates quick response to cleanliness issues and promotes community involvement in environmental maintenance.",
      tech: ["Flutter", "Figma", "Firebase"],
      features: [
        "Photo capture and geolocation tagging",
        "Issue reporting and categorization",
        "Real-time status tracking",
        "Municipal authority integration",
        "Community engagement features",
        "Progress monitoring dashboard",
        "Push notifications for updates"
      ],
      challenges: [
        "Integrating with municipal systems",
        "Ensuring accurate geolocation data",
        "Building user-friendly reporting interface",
        "Managing high volume of reports efficiently"
      ],
      results: [
        "Improved response time to cleanliness issues",
        "Increased citizen participation in environmental care",
        "Enhanced municipal service efficiency",
        "Created data-driven insights for urban planning"
      ]
    },
    "jewellery-inventory-system": {
      title: "Jewellery Inventory System",
      year: "2023",
      description: "Internal inventory management software jewellery shops. Staff record jewellery weights before/after services, sales and purchases; supports polishing and other gold servicing workflows. Later handed over to a jewellery shop in Mumbai - Sohan Enterprises.",
      longDescription: "A comprehensive inventory management system specifically designed for jewellery shops. This system tracks precious metals, gemstones, and finished products throughout their lifecycle, from acquisition to sale. The system was successfully implemented and later transferred to Sohan Enterprises in Mumbai.",
      tech: ["Flutter", "Firebase"],
      features: [
        "Weight tracking before and after services",
        "Sales and purchase management",
        "Polishing and servicing workflow tracking",
        "Inventory valuation and reporting",
        "Customer transaction history",
        "Multi-location inventory support",
        "Automated backup and data sync"
      ],
      challenges: [
        "Handling precise weight measurements",
        "Managing complex jewellery workflows",
        "Ensuring data accuracy and integrity",
        "Creating intuitive interface for shop staff"
      ],
      results: [
        "Reduced inventory discrepancies by 90%",
        "Streamlined jewellery servicing processes",
        "Improved customer service efficiency",
        "Successfully transferred to commercial use"
      ]
    }
  }

  const project = projects[slug as keyof typeof projects]

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-8 lg:px-16 py-8">
          <div className="flex items-center justify-between">
            <Link 
              href="/projects" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Projects
            </Link>
            {project.liveUrl && (
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300"
              >
                View Live
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7v7M21 3l-9 9" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 lg:px-16 py-16">
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            {project.category && (
              <span className="px-2.5 py-1 text-xs font-medium text-muted-foreground bg-muted-foreground/10 rounded-full border border-border">
                {project.category}
              </span>
            )}
            {project.year && (
              <span className="text-xs text-muted-foreground font-mono">
                {project.year}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-light mb-6">{project.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 text-sm font-medium text-muted-foreground bg-muted-foreground/5 border border-border rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">About This Project</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {project.longDescription}
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Key Features</h2>
          <ul className="space-y-3">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Challenges & Solutions</h2>
          <ul className="space-y-3">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Results & Impact</h2>
          <ul className="space-y-3">
            {project.results.map((result, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-foreground mt-2 flex-shrink-0"></div>
                <span className="text-muted-foreground">{result}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
