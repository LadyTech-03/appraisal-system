"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"

export default function HomePage() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const bootstrap = useAuthStore((state) => state.bootstrap)
  const token = useAuthStore((state) => state.token)
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        await bootstrap()
      } finally {
        setIsBootstrapping(false)
      }
    }

    run()
  }, [bootstrap])

  useEffect(() => {
    if (isBootstrapping) return

    if (isAuthenticated) {
      router.replace("/dashboard")
    } else {
      router.replace("/login")
    }
  }, [isAuthenticated, isBootstrapping, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
    </div>
  )
}
