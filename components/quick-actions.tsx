"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store"
import { Plus, FileText, Users, BarChart3, Settings } from "lucide-react"

export function QuickActions() {
  const router = useRouter()
  const { user } = useAuthStore()

  const role = user?.role || ""
  const isAdmin = role === "Director-General" || role === "System Administrator"

  const actions = [
    {
      title: "Create Appraisal",
      icon: Plus,
      onClick: () => router.push("/create-appraisal"),
      show: true,
    },
    {
      title: "My Appraisals",
      icon: FileText,
      onClick: () => router.push("/appraisals"),
      show: true,
    },
    {
      title: "Team Appraisals",
      icon: Users,
      onClick: () => router.push("/team-appraisals"),
      show: true,
    },
    // {
    //     title: "Analytics",
    //     icon: BarChart3,
    //     onClick: () => router.push("/analytics"),
    //     show: isAdmin,
    // },
    {
      title: "Settings",
      icon: Settings,
      onClick: () => router.push("/admin"),
      show: isAdmin,
    },
  ].filter((action) => action.show)

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100/60 h-full flex flex-col justify-center">
      <h3 className="text-sm font-bold mb-3 px-1">Quick Actions</h3>
      <div className="flex items-center gap-2">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Button
              key={index}
              variant="ghost"
              className="flex-col h-auto py-3 px-2 gap-2 hover:bg-slate-100/80 rounded-xl transition-all duration-200 group w-24"
              onClick={action.onClick}
            >
              <Icon className="size-8 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 leading-tight text-center">
                {action.title}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
