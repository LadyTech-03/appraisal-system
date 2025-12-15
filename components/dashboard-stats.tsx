"use client"

import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useAppStore, useAuthStore } from "@/lib/store"
import { FileText, Clock, CheckCircle, Users, TrendingUp } from "lucide-react"
import { toast } from "sonner"
import { parseApiError } from "@/lib/api/api"
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
      description: "Total appraisals",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Reviews",
      value: pendingReviewAppraisals ?? 0,
      description: "Awaiting action",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed",
      value: dashboardOverview?.completedAppraisals ?? 0,
      description: "This period",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    // {
    //   title: "Comprehensive",
    //   value: comprehensiveAppraisals.length,
    //   description: "Full assessments",
    //   icon: Target,
    //   color: "text-purple-600",
    //   bgColor: "bg-purple-50",
    // },
    ...((dashboardOverview?.averageRating || 0) > 0
      ? [
          {
            title: "Avg Rating",
            value: (dashboardOverview?.averageRating || 0).toFixed(1),
            description: "Performance score",
            icon: TrendingUp,
            color: "text-emerald-600",
            bgColor: "bg-emerald-50",
          },
        ]
      : []),
    ...([
          {
            title: "Team Members",
            value: dashboardOverview?.teamMembers ?? 0,
            description: "Direct reports",
            icon: Users,
            color: "text-indigo-600",
            bgColor: "bg-indigo-50",
          },
        ]),
    ...(isAdmin
      ? [
          {
            title: "Total Users",
            value: dashboardOverview?.totalUsers ?? 0,
            description: "Organization wide",
            icon: Users,
            color: "text-slate-600",
            bgColor: "bg-slate-50",
          },
        ]
      : []),
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {isLoading && (
        <div className="col-span-4">
          <Skeleton className="h-64" />
        </div>
      )}
      {!isLoading && stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="glass-card hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
