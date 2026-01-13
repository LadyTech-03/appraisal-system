"use client"

import { Button } from "@/components/ui/button"
import { CalendarClock, Lock, MoveLeft } from "lucide-react"

interface FormUnavailableProps {
  sectionName: string
  message: string
  opensAt?: string
  onBack?: () => void
}

export function FormUnavailable({
  sectionName,
  message,
  opensAt,
  onBack
}: FormUnavailableProps) {
  const getSectionDisplayName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      personal_info: "Personal Information",
      performance_planning: "Performance Planning",
      mid_year_review: "Mid-Year Review",
      end_year_review: "End of Year Review",
      final_sections: "Final Sections"
    }
    return nameMap[name] || name
  }

  const formattedDate = opensAt ? new Date(opensAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : null

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="max-w-md w-full text-center space-y-8">

        {/* Icon Container */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse" />
          <div className="absolute inset-2 bg-white rounded-full shadow-sm flex items-center justify-center border border-gray-100">
            <Lock className="w-10 h-10 text-gray-400" strokeWidth={1.5} />
          </div>
          {opensAt && (
            <div className="absolute -bottom-2 -right-2 bg-blue-50 text-blue-600 p-2 rounded-full border border-blue-100 shadow-sm">
              <CalendarClock className="w-5 h-5" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            {getSectionDisplayName(sectionName)} is Locked
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>

        {/* Availability Badge */}
        {formattedDate && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-600">
            <CalendarClock className="w-4 h-4" />
            <span>Opens on <span className="font-medium text-gray-900">{formattedDate}</span></span>
          </div>
        )}

        {/* Action */}
        {onBack && (
          <div className="pt-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="group text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
              <MoveLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
