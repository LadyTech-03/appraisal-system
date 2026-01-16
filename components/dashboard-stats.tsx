"use client"

import { useAuthStore } from "@/lib/store"
import { FileText, Clock, CheckCircle, Users, TrendingUp } from "lucide-react"
import { Skeleton } from "./ui/skeleton"

interface DashboardOverview {
  myAppraisals: number
  pendingAppraisals: number
  completedAppraisals: number
  averageRating: number
  teamMembers: number
  totalUsers: number

  appraisalsInProgress: number
  appraisalsSubmitted: number
  appraisalsCompleted: number
}

export function DashboardStats({ dashboardOverview }: { dashboardOverview: DashboardOverview | { [key: string]: any } }) {
  const { user } = useAuthStore()
  const isLoading = !dashboardOverview
  const pendingReviewAppraisals = dashboardOverview?.appraisalsInProgress + dashboardOverview?.appraisalsSubmitted + dashboardOverview?.appraisalsCompleted

  const isAdmin = user?.role === "Director-General" || user?.role === "System Administrator"

  const stats = [
    {
      title: "My Appraisals",
      value: dashboardOverview?.myAppraisals ?? 0,
      icon: FileText,
    },
    {
      title: "Pending Reviews",
      value: pendingReviewAppraisals ?? 0,
      icon: Clock,
    },
    {
      title: "Completed",
      value: dashboardOverview?.completedAppraisals ?? 0,
      icon: CheckCircle,
    },
    ...((dashboardOverview?.averageRating || 0) > 0
      ? [
        {
          title: "Avg Rating",
          value: (dashboardOverview?.averageRating || 0).toFixed(1),
          icon: TrendingUp,
        },
      ]
      : []),
    ...([
      {
        title: "Team Members",
        value: dashboardOverview?.teamMembers ?? 0,
        icon: Users,
      },
    ]),
    ...(isAdmin
      ? [
        {
          title: "Total Users",
          value: dashboardOverview?.totalUsers ?? 0,
          icon: Users,
        },
      ]
      : []),
  ]

  if (isLoading) {
    return <Skeleton className="h-24 w-full rounded-2xl bg-white/50" />
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/60 h-full flex flex-col justify-center">
      <h3 className="text-sm font-bold text-slate-800 mb-3 px-1">Overview</h3>
      <div className="flex items-center justify-between gap-2 px-2">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1 group w-24"
            >
              <span className="text-2xl font-bold tracking-tight leading-none mt-1">
                {stat.value}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-wide text-center">
                {stat.title}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
