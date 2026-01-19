"use client"

import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Sidebar } from "@/components/sidebar"
import { Topbar } from "@/components/topbar"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { appraisalsApi } from "@/lib/api/appraisals"
import { fi } from "date-fns/locale"

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuthStore()

  const [dashboardOverview, setDashboardOverview] = useState(null)
  const [hasStartedAppraisal, setHasStartedAppraisal] = useState(false)



  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!user) return 

      try {
        const response = await appraisalsApi.getDashboardOverview()
        setDashboardOverview(response)
        // console.log(response, "Dashboard Overview Data")
        // Check if user has started an appraisal
        setHasStartedAppraisal(response.appraisalsInProgress > 0)
      } catch (error) {
        // console.error(error)
      } finally {
        // setIsLoading(false)
      }
    }

    fetchDashboardStats()

  }, [])

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
          {/* Premium Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e3a8a] to-blue-900 shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:32px_32px]" />
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-50 animate-pulse" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl opacity-50" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Left Column: Greeting & Status */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-medium text-white mb-4 backdrop-blur-md shadow-sm">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                      Active Session
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
                      {getGreeting()}, <span className="text-blue-100">{user?.first_name}</span>
                    </h1>
                    <p className="text-blue-100 text-lg max-w-xl leading-relaxed font-medium">
                      Welcome back.
                    </p>
                    <br></br>
                  </div>

                  {/* Primary Actions */}
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button
                      size="lg"
                      className="bg-white text-blue-700 hover:bg-blue-50 shadow-lg shadow-blue-900/20 border-0 font-bold px-8 h-12 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => router.push("/appraisals")}
                    >
                      My Appraisals
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/40 bg-white/10 hover:text-white text-white hover:bg-white/20 backdrop-blur-sm px-8 h-12 rounded-xl transition-all duration-300 font-semibold"
                      onClick={() => router.push("/create-appraisal")}
                    >
                      {hasStartedAppraisal ? "Continue Appraisal" : "Create Appraisal"}
                    </Button>
                  </div>
                </div>

                {/* Right Column: Key User Details Card */}
                <div className="lg:col-span-5 relative">
                  <div className="absolute inset-0 bg-black/20 rounded-2xl blur-xl" />
                  <div className="relative bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 lg:p-8 space-y-6 shadow-xl">

                    <div className="flex items-center justify-between border-b border-white/20 pb-4">
                      <div>
                        <p className="text-blue-100 text-sm font-bold uppercase tracking-wider">Employee Profile</p>
                        <p className="text-white font-bold text-lg">{user?.role}</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold text-sm shadow-md">
                        {user?.first_name?.[0]}{user?.surname?.[0]}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <p className="text-blue-200 text-xs font-semibold uppercase">Division</p>
                        <p className="text-white font-medium truncate" title={user?.division || "N/A"}>
                          {user?.division || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-blue-200 text-xs font-semibold uppercase">Unit</p>
                        <p className="text-white font-medium truncate" title={user?.unit || "N/A"}>
                          {user?.unit || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-blue-200 text-xs font-semibold uppercase">Staff ID</p>
                        <div className="inline-flex items-center bg-blue-900/30 rounded px-2 py-1 text-white text-sm font-mono border border-blue-500/30">
                          {user?.employee_id || "..."}
                        </div>
                      </div>
                      {/* <div className="space-y-1">
                        <p className="text-blue-200 text-xs font-semibold uppercase">Status</p>
                        <div className="flex items-center text-emerald-300 text-sm font-medium">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2" />
                           Active
                        </div>
                      </div> */}
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>


          {/* Stats & Actions Row */}
          <div className="flex flex-col xl:flex-row gap-6">
            <div className="flex-1 min-w-0">
              <DashboardStats dashboardOverview={dashboardOverview || {}} />
            </div>
            <div className="shrink-0 xl:w-auto">
              <QuickActions />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6" >
            {/* Recent Activity */}
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

