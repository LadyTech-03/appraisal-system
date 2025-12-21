"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LockIcon, CalendarIcon, ArrowLeft } from "lucide-react"

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

  return (
    <div className="flex items-center justify-center min-h-[500px] w-full">
      <Card className="max-w-lg w-full p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <LockIcon className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Form Not Available</h2>
          <p className="text-lg font-medium text-muted-foreground">
            {getSectionDisplayName(sectionName)}
          </p>
        </div>

        <p className="text-muted-foreground">
          {message}
        </p>

        {opensAt && (
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Available from: {new Date(opensAt).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}

            </p>
          </div>
        )}

        {onBack && (
          <Button onClick={onBack} variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        )}
      </Card>
    </div>
  )
}
