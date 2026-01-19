"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"

interface GuestGuardProps {
    children: React.ReactNode
}

/**
 * GuestGuard - Protects auth routes from authenticated users
 * If user has a valid token/session, redirects to dashboard
 * Only allows unauthenticated users to access auth pages (login, register, etc.)
 */
export function GuestGuard({ children }: GuestGuardProps) {
    const router = useRouter()
    const { isAuthenticated, hasHydrated, bootstrap, token } = useAuthStore()

    useEffect(() => {
        // Wait for store to hydrate before checking
        if (!hasHydrated) return

        // If we have a token, try to verify it
        if (token && !isAuthenticated) {
            bootstrap().then(() => {
                // After bootstrap, check if authenticated
                const { isAuthenticated: isAuth } = useAuthStore.getState()
                if (isAuth) {
                    router.push("/dashboard")
                }
            }).catch(() => {
                // Token was invalid, stay on auth page
            })
        } else if (isAuthenticated) {
            // Already authenticated, redirect to dashboard
            router.push("/dashboard")
        }
    }, [hasHydrated, isAuthenticated, token, bootstrap, router])

    // Show loading while hydrating or if we have a token being verified
    if (!hasHydrated || (token && !isAuthenticated)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
            </div>
        )
    }

    // If authenticated after hydration, don't render children (will redirect)
    if (isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
            </div>
        )
    }

    // User is not authenticated, allow access to auth pages
    return <>{children}</>
}
