import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Navigation } from "@/components/navigation"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"], // Including Black weight for headings
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "MaxTeam Visual - Professional Audiovisual Production",
  description:
    "Award-winning audiovisual production company specializing in high-end video content, commercials, and creative storytelling.",
  generator: "MaxTeam Visual",
  keywords: ["audiovisual production", "video production", "commercial", "cinematography", "post-production"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}
