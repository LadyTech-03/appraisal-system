"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

export function AppraiserInfoForm({ 
  onDataChange, 
  initialData 
}: { 
  onDataChange: (data: any) => void
  initialData?: any
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    otherTitle: initialData?.otherTitle || "",
    surname: initialData?.surname || "",
    firstName: initialData?.firstName || "",
    otherNames: initialData?.otherNames || "",
    position: initialData?.position || ""
  })

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    onDataChange(newData)
  }

  const handleTitleChange = (title: string) => {
    const newData = { 
      ...formData, 
      title, 
      otherTitle: title === "other" ? formData.otherTitle : "" 
    }
    setFormData(newData)
    onDataChange(newData)
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <Badge variant="secondary" className="text-sm font-semibold">SECTION 1 - B: Appraiser Information</Badge>
        
        {/* Title */}
        <div className="space-y-2">
          <Label>Title</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="appraiser-mr"
                checked={formData.title === "Mr"}
                onCheckedChange={() => handleTitleChange("Mr")}
              />
              <Label htmlFor="appraiser-mr">Mr.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="appraiser-mrs"
                checked={formData.title === "Mrs"}
                onCheckedChange={() => handleTitleChange("Mrs")}
              />
              <Label htmlFor="appraiser-mrs">Mrs.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="appraiser-ms"
                checked={formData.title === "Ms"}
                onCheckedChange={() => handleTitleChange("Ms")}
              />
              <Label htmlFor="appraiser-ms">Ms.</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="appraiser-other"
                checked={formData.title === "other"}
                onCheckedChange={() => handleTitleChange("other")}
              />
              <Label htmlFor="appraiser-other">Other (Pls. specify):</Label>
            </div>
            {formData.title === "other" && (
              <Input
                className="w-32"
                value={formData.otherTitle}
                onChange={(e) => handleInputChange("otherTitle", e.target.value)}
                placeholder="Specify"
              />
            )}
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="appraiser-surname">Surname</Label>
            <Input
              id="appraiser-surname"
              value={formData.surname}
              onChange={(e) => handleInputChange("surname", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appraiser-firstName">First Name</Label>
            <Input
              id="appraiser-firstName"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Other Names */}
        <div className="space-y-2">
          <Label htmlFor="appraiser-otherNames">Other Name(s)</Label>
          <Input
            id="appraiser-otherNames"
            value={formData.otherNames}
            onChange={(e) => handleInputChange("otherNames", e.target.value)}
          />
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="appraiser-position">Position of Appraiser</Label>
          <Input
            id="appraiser-position"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            required
          />
        </div>
      </div>
    </Card>
  )
}
