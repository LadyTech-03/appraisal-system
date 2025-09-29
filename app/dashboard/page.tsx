"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-foreground"></div>
      </div>
    )
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-blue-100 grid grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      {/* Sidebar - Fixed positioning, spans full height */}
      <div className="row-span-2 hidden md:block">
        <Sidebar />
      </div>

      {/* Topbar - Fixed at top, spans remaining width */}
      <div className="col-start-1 md:col-start-2 sticky top-0 z-10">
        <Topbar />
      </div>

      {/* Main content area - Scrollable */}
      <main className="col-start-1 md:col-start-2 overflow-y-auto p-4 md:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-blue-700 to-blue-800 p-6 md:p-8 text-white">
            <div className="relative z-10">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                  {getGreeting()}, {user.name.split(" ")[0]}!
                </h1>
                <p className="text-blue-100 text-lg mb-6">Welcome to your performance management dashboard</p>
              </div>

              {/* User Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {user.division && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-blue-200 text-sm font-medium mb-1">Division</div>
                    <div className="text-white font-semibold">{user.division}</div>
                  </div>
                )}
                {user.unit && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-blue-200 text-sm font-medium mb-1">Unit</div>
                    <div className="text-white font-semibold">{user.unit}</div>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1">Role</div>
                  <div className="text-white font-semibold">
                    {user.role}
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-blue-200 text-sm font-medium mb-1">Staff ID</div>
                  <div className="text-white font-semibold">{user.employeeId}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg shadow-lg"
                  onClick={() => router.push("/appraisals")}
                >
                  View Appraisals
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20 bg-transparent font-semibold px-8 py-3 rounded-lg"
                  onClick={() => router.push("/create-appraisal")}
                >
                  Start New Appraisal
                </Button>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-36 translate-x-36"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-28 -translate-x-28"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-white/3 rounded-full"></div>
          </div>

          {/* Stats Cards */}
          <DashboardStats />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent Activity - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <RecentActivity />
            </div>

            {/* Quick Actions - Takes 1 column */}
            <div className="xl:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

