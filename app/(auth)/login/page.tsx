"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/store"
import { Shield, BookOpen, GraduationCap, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ChangePasswordModal } from "@/components/change-password-modal"

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  const user = useAuthStore((state) => state.user)
  const [formData, setFormData] = useState({
    emailOrEmployeeId: "",
    password: "",
  })
  const errorMessage = useAuthStore((state) => state.error)
  const clearError = useAuthStore((state) => state.clearError)
  const [formError, setFormError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false)

  // Check if user needs to change password on mount/update
  // useEffect(() => {
  //   if (user?.password_change_required) {
  //     setShowPasswordChangeModal(true)
  //   }
  // }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)
    clearError()

    try {
      const result = await login(formData.emailOrEmployeeId, formData.password)
      console.log("User logged in successfully:", result)
      if (result) {
        // Check if user needs to change password
        const currentUser = useAuthStore.getState().user
        console.log("Current user:", currentUser)
        if (currentUser?.password_change_required) {
          setShowPasswordChangeModal(true)
        } else {
          router.push("/dashboard")
        }
      } else {
        setFormError("Invalid credentials. Please try again.")
      }
    } catch (error) {
      setFormError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChangeSuccess = () => {
    setShowPasswordChangeModal(false)
    // Update user in store to clear password_change_required
    const currentUser = useAuthStore.getState().user
    if (currentUser) {
      useAuthStore.setState({
        user: { ...currentUser, password_change_required: false }
      })
    }
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md glass-card">
          <CardHeader className="text-center">
            <Image src="/logos/logo.png" alt="Appraisal System Logo" width={80} height={80} className="mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-primary">STAFF PERFORMANCE AND APPRAISAL SYSTEM</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrEmployeeId">Email or Staff ID</Label>
                <Input
                  id="emailOrEmployeeId"
                  type="text"
                  placeholder="Enter your email or staff ID"
                  value={formData.emailOrEmployeeId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, emailOrEmployeeId: e.target.value }))}
                  required
                  className="bg-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  required
                  className="bg-input"
                />
              </div>

              {(formError || errorMessage) && (
                <Alert variant="destructive">
                  <AlertDescription>{formError || errorMessage}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="text-center">
                <Button asChild type="button" variant="link" className="text-sm text-muted-foreground hover:text-primary">
                  <Link href="/register">Don't have access? Request Access</Link>
                </Button>
              </div>
            </form>

          </CardContent>
        </Card>
      </div>

      {/* Right Column - Educational Theme Illustration */}
      <div className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-40 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/modern-educational-workspace-with-books-laptop-and.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-blue-700/30" />
      </div>

      {/* Password Change Modal for first-time login */}
      <ChangePasswordModal
        isOpen={showPasswordChangeModal}
        onSuccess={handlePasswordChangeSuccess}
      />
    </div>
  )
}
