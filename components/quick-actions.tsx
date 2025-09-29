"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Plus, FileText, Users, BarChart3, Calendar, Settings, Download } from "lucide-react"

export function QuickActions() {
  const router = useRouter()
  const { user } = useAuthStore()

  const role = user?.role || ""
  const isAdmin = role === "Director-General" || role === "System Administrator"

  const actions = [
    {
      title: "Start New Appraisal",
      description: "Create a comprehensive appraisal",
      icon: Plus,
      color: "bg-primary text-primary-foreground",
      onClick: () => router.push("/create-appraisal"),
      show: true,
    },
    {
      title: "View My Appraisals",
      description: "Check your performance reviews",
      icon: FileText,
      color: "bg-blue-500 text-white",
      onClick: () => router.push("/appraisals"),
      show: true,
    },
    {
      title: "Export Reports",
      description: "Download PDF appraisals",
      icon: Download,
      color: "bg-purple-500 text-white",
      onClick: () => router.push("/team-appraisals"),
      show: true,
    },
    {
      title: "Analytics Dashboard",
      description: "View performance analytics",
      icon: BarChart3,
      color: "bg-orange-500 text-white",
      onClick: () => router.push("/analytics"),
      show: isAdmin,
    },
    {
      title: "Appraisal History",
      description: "Browse past appraisals",
      icon: Calendar,
      color: "bg-teal-500 text-white",
      onClick: () => router.push("/history"),
      show: true,
    },
    {
      title: "User Management",
      description: "Manage system users",
      icon: Settings,
      color: "bg-red-500 text-white",
      onClick: () => router.push("/admin"),
      show: isAdmin,
    },
  ].filter((action) => action.show)

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow bg-transparent"
                onClick={action.onClick}
              >
                <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
