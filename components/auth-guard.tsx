"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"

interface AuthGuardProps {
    children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter()
    const { user, isAuthenticated, hasHydrated } = useAuthStore()

    useEffect(() => {
        // Wait for store to hydrate before checking auth
        if (!hasHydrated) return

        if (!isAuthenticated) {
            router.push("/login")
        }
    }, [isAuthenticated, hasHydrated])

    // Show loading spinner while hydrating or if not authenticated
    if (!hasHydrated || !isAuthenticated || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
            </div>
        )
    }

    return <>{children}</>
}
