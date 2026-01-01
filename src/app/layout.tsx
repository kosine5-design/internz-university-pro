import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Internz University Pro | AI-Powered Music Education",
  description:
    "Learn music production from Grammy-nominated producer Kosine. Get personalized AI mentorship, exclusive courses, and sound kits to level up your craft.",
  keywords: [
    "music production",
    "beat making",
    "mixing",
    "producer courses",
    "AI mentorship",
    "sound kits",
    "Kosine",
    "Da Internz",
  ],
  authors: [{ name: "Kosine", url: "https://internzuniversity.pro" }],
  openGraph: {
    title: "Internz University Pro | AI-Powered Music Education",
    description:
      "Learn music production from Grammy-nominated producer Kosine.",
    type: "website",
    locale: "en_US",
    siteName: "Internz University Pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internz University Pro",
    description:
      "Learn music production from Grammy-nominated producer Kosine.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-[#1A1A1A] text-[#FFFEF2]`}>
        {children}
      </body>
    </html>
  )
}
