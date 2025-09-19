import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Harsh Mehta's Portfolio",
  description: "Software Engineer helping Change Poor Perception of Public toilets in India, One toilet at a Time.",
  icons: {
    icon: "/favicon-32x32.png",
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Harsh Mehta's Portfolio",
    description:
      "Software Engineer helping Change Poor Perception of Public toilets in India, One toilet at a Time.",
    images: [
      {
        url: "/ogimg.JPG",
        width: 1200,
        height: 630,
        alt: "Harsh Mehta - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Mehta's Portfolio",
    description:
      "Software Engineer helping Change Poor Perception of Public toilets in India, One toilet at a Time.",
    images: ["/ogimg.JPG"],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
