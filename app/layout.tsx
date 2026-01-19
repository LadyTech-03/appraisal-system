"use client"

import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "sonner"
// export const metadata: Metadata = {
//   title: "Appraisal Platform - Performance Management System",
//   description: "Comprehensive performance appraisal and management platform for organizations",
//   generator: "v0.app",
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
            {children}
          <Analytics />
          <Toaster position="top-center" richColors />
        </Suspense>
      </body>
    </html>
  )
}
