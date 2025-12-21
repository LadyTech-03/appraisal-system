"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore, useAppStore } from "@/lib/store"
import {
  Home,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  Calendar,
  Target,
  Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { getMyPersonalInfo } from "@/lib/api/personalInfo"

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
  badge?: string
  roles?: string[]
}

const ADMIN_ROLES = ["Director-General", "System Administrator"]

const menuItems: MenuItem[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FileText,
    label: "My Appraisals",
    href: "/appraisals",
  },
  {
    icon: Target,
    label: "Create Appraisal",
    href: "/create-appraisal",
  },
  {
    icon: Calendar,
    label: "Appraisal History",
    href: "/history",
  },
  {
    icon: UserCheck,
    label: "Team Appraisals",
    href: "/team-appraisals",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/analytics",
    roles: ADMIN_ROLES,
  },
  {
    icon: Users,
    label: "User Management",
    href: "/admin",
    roles: ADMIN_ROLES,
    // badge: "System Admin",
  },
  {
    icon: Settings,
    label: "Form Management",
    href: "/form-management",
    roles: ADMIN_ROLES,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
]

function SidebarContent() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const { users, appraisals } = useAppStore()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hasStartedAppraisal, setHasStartedAppraisal] = useState(false)

  // Check if user has started an appraisal
  useEffect(() => {
    const checkAppraisalStatus = async () => {
      try {
        const personalInfo = await getMyPersonalInfo()
        setHasStartedAppraisal(personalInfo && personalInfo.length > 0)
      } catch (error) {
        console.log("Error checking appraisal status:", error)
        setHasStartedAppraisal(false)
      }
    }
    
    if (user) {
      checkAppraisalStatus()
    }
  }, [user])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const filteredMenuItems = menuItems.filter((item) => !item.roles || item.roles.includes(user?.role || ""))

  const pendingAppraisals = appraisals.filter(
    (a) => a.status === "draft" && (a.employee_id === user?.id || a.appraiser_id === user?.id),
  ).length

  const comprehensiveAppraisals = appraisals.filter(
    (a) =>
      (a.employee_id === user?.id || a.appraiser_id === user?.id) &&
      a.competencies &&
      a.keyResultAreas &&
      a.keyResultAreas.length > 0,
  ).length

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-full`}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <Image src="/logos/logo.png" alt="Appraisal System Logo" width={40} height={40} />
              <div>
                <h2 className="text-sm font-semibold text-sidebar-foreground">APPRAISAL SYSTEM</h2>
                <p className="text-xs font-semibold text-sidebar-foreground/60">GTVET HR</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 h-8 w-8 hidden md:flex"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon
          const is_active = pathname === item.href
          
          // Dynamically change label for Create Appraisal
          const displayLabel = item.label === "Create Appraisal" && hasStartedAppraisal 
            ? "Continue Appraisal" 
            : item.label

          return (
            <Button
              key={item.href}
              variant={is_active ? "secondary" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? "px-2" : "px-3"}`}
              onClick={() => router.push(item.href)}
            >
              <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{displayLabel}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  {item.label === "My Appraisals" && pendingAppraisals > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {pendingAppraisals}
                    </Badge>
                  )}
                  {item.label === "Team Appraisals" && comprehensiveAppraisals > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {comprehensiveAppraisals}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* User Profile Section at Bottom */}
      {!isCollapsed && user && (
        <div className="p-2 border-t border-sidebar-border">
          <div 
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors group"
            onClick={() => {
              const dropdown = document.getElementById('user-dropdown')
              if (dropdown) {
                dropdown.classList.toggle('hidden')
              }
            }}
          >
            <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground font-semibold">
              {user.first_name}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sidebar-foreground truncate text-sm">{user.first_name} {user.surname}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                {user.role}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-sidebar-foreground/40 group-hover:text-sidebar-foreground transition-colors" />
          </div>
          
          {/* Dropdown Menu */}
          <div id="user-dropdown" className="hidden mt-2 bg-sidebar-accent rounded-lg overflow-hidden shadow-lg">
            <div className="p-3 border-b border-sidebar-border">
              <p className="text-xs text-sidebar-foreground/60">Signed in as</p>
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user.email}</p>
              <Badge variant="outline" className="text-xs mt-1">
                {user.employee_id}
              </Badge>
            </div>
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-none"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}

      {/* Collapsed state - just logout button */}
      {isCollapsed && (
        <div className="p-2 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-center text-destructive hover:text-destructive p-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="fixed top-4 left-4 z-50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:block h-screen sticky top-0">
        <SidebarContent />
      </div>
    </>
  )
}
