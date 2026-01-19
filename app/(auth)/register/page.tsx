"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore, useAppStore } from "@/lib/store"

export default function RegisterPage() {
  const router = useRouter()
  const register = useAuthStore((state) => state.register)
  const errorMessage = useAuthStore((state) => state.error)
  const clearError = useAuthStore((state) => state.clearError)
  const roles = useAppStore((state) => state.roles)

  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    password: "",
    role: roles[0] ?? "Director-General",
    division: "",
    unit: "",
    manager_id: "",
    phone: "",
  })
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)
    clearError()
    setIsSubmitting(true)

    try {
      await register({
        employee_id: formData.employee_id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        division: formData.division || undefined,
        unit: formData.unit || undefined,
        manager_id: formData.manager_id || undefined,
        phone: formData.phone || undefined,
      })

      router.push("/login")
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        setFormError((error as { message: string }).message)
      } else {
        setFormError("Failed to submit request. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-2xl glass-card">
          <CardHeader className="text-center">
            <Image src="/logos/logo.png" alt="Appraisal System Logo" width={80} height={80} className="mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-primary">Request Access</CardTitle>
            <CardDescription>
              Submit your details for verification. An administrator will review your request and contact you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(formError || errorMessage) && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{formError || errorMessage}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee_id">Employee ID</Label>
                <Input
                  id="employee_id"
                  value={formData.employee_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, employee_id: e.target.value }))}
                  placeholder="Provide if available"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full border rounded-md p-2"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="division">Division</Label>
                <Input
                  id="division"
                  value={formData.division}
                  onChange={(e) => setFormData((prev) => ({ ...prev, division: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager_id">Manager ID</Label>
                <Input
                  id="manager_id"
                  value={formData.manager_id}
                  onChange={(e) => setFormData((prev) => ({ ...prev, manager_id: e.target.value }))}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Optional"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-3">
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-40 bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/modern-educational-workspace-with-books-laptop-and.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-700/30" />
      </div>
    </div>
  )
}

