"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HelpCircle, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StaffGuide } from "@/components/guide-notes/staff-guides"
import { GeneralGuideNotes } from "./general-guide-notes"

const staffCategories = [
  { value: "principal-of-tvet", label: "PRINCIPALS OF TVET INSTITUTES" },
  { value: "vice-principal-academic", label: "VICE PRINCIPAL, ACADEMIC" },
  { value: "vice-principal-administration", label: "VICE PRINCIPAL, ADMINISTRATION" },
  { value: "teaching", label: "TEMPLATE FOR TEACHING STAFF" },
  { value: "headquarters-technical", label: "HEADQUARTERS & REGIONAL OFFICE TECHNICAL STAFF" },
  { value: "accounting", label: "ACCOUNTING STAFF" },
  { value: "catering", label: "CATERING STAFF" },
  { value: "corporate-affairs", label: "CORPORATE AFFAIRS STAFF" },
  { value: "general-admin", label: "GENERAL ADMINISTRATIVE STAFF" },
  { value: "human-resource", label: "HUMAN RESOURCE STAFF" },
  { value: "procurement", label: "PROCUREMENT STAFF" },
  { value: "audit", label: "AUDIT STAFF" },
  { value: "security-drivers-laborers", label: "SECURITY, DRIVERS & LABOURERS STAFF" },
  { value: "admin-support", label: "ADMINISTRATIVE SUPPORT STAFF" },
]

interface GuideSidePanelProps {
  isOpen: boolean
  selectedCategory: string
  onCategoryChange: (value: string) => void
  onClose: () => void
}

function GuideSidePanel({ isOpen, selectedCategory, onCategoryChange, onClose }: GuideSidePanelProps) {
  const renderGuide = () => {
    if (!selectedCategory) {
      return (
        <div className="w-[500px]">
          <GeneralGuideNotes />
        </div>
      )
    }

    return <StaffGuide category={selectedCategory} />
  }

  if (!isOpen) return null

  return (
    <div className="w-[700px] overflow-auto border-l bg-primary/10 flex flex-col h-[100vh] mb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b shrink-0">
        <h3 className="font-semibold">Guide Notes</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Category Selector */}
      <div className="p-4 border-b shrink-0">
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Guide Notes</SelectItem>
            {staffCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Guide Content - scrollable */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {renderGuide()}
        </ScrollArea>
      </div>
    </div>
  )
}

interface GuideNotesContextType {
  isOpen: boolean
  selectedCategory: string
  openGuide: () => void
  closeGuide: () => void
  setCategory: (category: string) => void
}

export function useGuideNotes() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("general")

  return {
    isOpen,
    selectedCategory,
    openGuide: () => setIsOpen(true),
    closeGuide: () => {
      setIsOpen(false)
      setSelectedCategory("")
    },
    setCategory: setSelectedCategory,
  }
}

interface GuideNotesLayoutProps {
  children: React.ReactNode
  guideState: ReturnType<typeof useGuideNotes>
}

export function GuideNotesLayout({ children, guideState }: GuideNotesLayoutProps) {
  const { isOpen, selectedCategory, openGuide, closeGuide, setCategory } = guideState

  return (
    <div className="flex h-full">
      {/* Main Content - shrinks when guide is open */}
      <div className={`flex-1 overflow-auto transition-all duration-300 mb-10 scrollbar-none ${isOpen ? 'pr-0' : ''}`}>
        {children}
      </div>

      {/* Guide Side Panel */}
      <GuideSidePanel
        isOpen={isOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setCategory}
        onClose={closeGuide}
      />

      {/* Floating Help Button - only visible when panel is closed */}
      {!isOpen && (
        <Button
          title="Guide Notes"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-primary text-white hover:bg-primary/90 z-50"
          onClick={openGuide}
        >
          <HelpCircle className="size-6" />
        </Button>
      )}
    </div>
  )
}
