"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"

export default function HomePage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const token = useAuthStore((state) => state.token)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    // Only redirect after Zustand persist has rehydrated the state
    if (!hasHydrated) return

    if (isAuthenticated && token) {
      console.log("Authenticated and token")
      router.replace("/dashboard")
    } else {
      router.replace("/appraisals")
    }
  }, [isAuthenticated, token, hasHydrated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
    </div>
  )
}
