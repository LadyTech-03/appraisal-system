"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppStore, useAuthStore } from "@/lib/store"
import type { User } from "@/lib/types"
import { Plus, Upload, Download, Edit, Trash2, UserPlus, FileText, Search, Clock, Loader2 } from "lucide-react"
import { OrgChart } from "./org-chart"
import { AccessRequestsPanel } from "./access-requests-panel"
import { usersApi } from "@/lib/api/users"
import { toast } from "sonner"

interface UserFormData {
  // Personal Information
  title: string
  first_name: string
  surname: string
  other_names: string
  gender: string
  
  // Employment Details
  employee_id: string
  email: string
  position: string
  role: string
  division: string
  unit: string
  grade: string
  notch: string
  appointment_date: string
  phone: string
  manager_id: string
}

export function UserManagement() {
  const { users, roles, addUser, updateUser, deleteUser, exportData, importData, filteredUsers, accessRequests } = useAppStore()
  const allowedRoles = ["Director-General", "System Administrator"]
  const { user: currentUser, impersonate } = useAuthStore()
  const [activeTab, setActiveTab] = useState<"list" | "add" | "bulk" | "org" | "requests">("list")
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState<UserFormData>({
    title: "",
    first_name: "",
    surname: "",
    other_names: "",
    gender: "",
    employee_id: "",
    email: "",
    position: "",
    role: "",
    division: "",
    unit: "",
    grade: "",
    notch: "",
    appointment_date: "",
    phone: "",
    manager_id: "",
  })
  const [csvData, setCsvData] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [createdUserOtp, setCreatedUserOtp] = useState<string | null>(null)

  const displayedUsers = filteredUsers(searchQuery)
  const pendingRequestsCount = accessRequests.filter((req) => req.status === "pending").length

  const resetForm = () => {
    setFormData({
      title: "",
      first_name: "",
      surname: "",
      other_names: "",
      gender: "",
      employee_id: "",
      email: "",
      position: "",
      role: "",
      division: "",
      unit: "",
      grade: "",
      notch: "",
      appointment_date: "",
      phone: "",
      manager_id: "",
    })
    setEditingUser(null)
    setCreatedUserOtp(null)
  }

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for API - filter out empty manager_id
      const userData = {
        ...formData,
        manager_id: formData.manager_id && formData.manager_id !== "none" ? formData.manager_id : undefined,
      }

      if (editingUser) {
        // Update existing user
        await usersApi.updateUser(editingUser.id, userData)
        toast.success("User updated successfully!")
        setMessage({ type: "success", text: "User updated successfully!" })
        resetForm()
        setActiveTab("list")
      } else {
        // Create new user - API returns temp_password (OTP)
        const result = await usersApi.createUser(userData)
        
        if (result.temp_password) {
          // Show OTP in the form instead of navigating away
          setCreatedUserOtp(result.temp_password)
          setMessage({ type: "success", text: `User ${result.first_name} ${result.surname} created! OTP shown below.` })
          toast.success(`User created! Share the OTP with the user.`)
          // Clear form but stay on same tab to show OTP
          setFormData({
            title: "",
            first_name: "",
            surname: "",
            other_names: "",
            gender: "",
            employee_id: "",
            email: "",
            position: "",
            role: "",
            division: "",
            unit: "",
            grade: "",
            notch: "",
            appointment_date: "",
            phone: "",
            manager_id: "",
          })
          setEditingUser(null)
        } else {
          toast.success("User created successfully!")
          setMessage({ type: "success", text: "User added successfully!" })
          resetForm()
          setActiveTab("list")
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save user. Please try again."
      toast.error(errorMessage)
      setMessage({ type: "error", text: errorMessage })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      title: user.title || "",
      first_name: user.first_name || "",
      surname: user.surname || "",
      other_names: user.other_names || "",
      gender: user.gender || "",
      employee_id: user.employee_id,
      email: user.email || "",
      position: user.position || "",
      role: user.role,
      division: user.division || "",
      unit: user.unit || "",
      grade: user.grade || "",
      notch: user.notch || "",
      appointment_date: user.appointment_date ? user.appointment_date.slice(0, 10) : "",
      phone: user.phone || "",
      manager_id: user.manager_id || "",
    })
    setActiveTab("add")
  }

  const handleDelete = (user_id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(user_id)
      setMessage({ type: "success", text: "User deleted successfully!" })
    }
  }

  const handleBulkImport = () => {
    try {
      const lines = csvData.trim().split("\n")
      const headers = lines[0].split(",").map((h) => h.trim())

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map((v) => v.trim())
        const userData: any = {}

        headers.forEach((header, index) => {
          userData[header] = values[index] || ""
        })

        if (userData.name && userData.employee_id && userData.role) {
          addUser(userData)
        }
      }

      setMessage({ type: "success", text: `Successfully imported ${lines.length - 1} users!` })
      setCsvData("")
      setActiveTab("list")
    } catch (error) {
      setMessage({ type: "error", text: "Failed to import users. Please check your CSV format." })
    }
  }

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "appraisal-data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImpersonate = (user: User) => {
    if (confirm(`Impersonate ${user.first_name}? You will be logged in as this user.`)) {
      impersonate(user.id)
      setMessage({ type: "success", text: `Now logged in as ${user.first_name}` })
    }
  }

  const managerOptions = users.filter((u) => allowedRoles.includes(u.role))

  return (
    <div className="space-y-6">
      {message && (
        <Alert variant={message.type === "error" ? "destructive" : "default"}>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-2 border-b">
        {[
          { key: "list", label: "User List", icon: FileText },
          { key: "add", label: editingUser ? "Edit User" : "Add User", icon: editingUser ? Edit : Plus },
          { key: "bulk", label: "Bulk Import", icon: Upload },
          { key: "org", label: "Org Chart", icon: UserPlus },
          {
            key: "requests",
            label: `Access Requests${pendingRequestsCount > 0 ? ` (${pendingRequestsCount})` : ""}`,
            icon: Clock,
          },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeTab === key ? "default" : "ghost"}
            onClick={() => setActiveTab(key as any)}
            className="flex items-center space-x-2 relative"
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            {key === "requests" && pendingRequestsCount > 0 && (
              <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs min-w-[1.25rem] h-5">
                {pendingRequestsCount}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* User List Tab */}
      {activeTab === "list" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">All Users ({displayedUsers.length})</h3>
            <div className="flex space-x-2">
              <Button onClick={handleExport} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button onClick={() => setActiveTab("add")}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, staff ID, role, or division..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:bg-background focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="grid gap-4">
            {displayedUsers.length === 0 ? (
              <div className="text-center py-8">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? "No users found matching your search" : "No users found"}
                </p>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your search terms or{" "}
                    <button onClick={() => setSearchQuery("")} className="text-primary hover:underline">
                      clear the search
                    </button>
                  </p>
                )}
              </div>
            ) : (
              displayedUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                          {user.first_name}
                        </div>
                        <div>
                          <h4 className="font-semibold">{user.first_name}</h4>
                          <p className="text-sm text-muted-foreground">{user.role}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{user.employee_id}</Badge>
                            {user.email && <Badge variant="secondary">{user.email}</Badge>}
                            {user.division && <Badge>{user.division}</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {allowedRoles.includes(currentUser?.role || "") && user.id !== currentUser?.id && (
                          <Button variant="outline" size="sm" onClick={() => handleImpersonate(user)}>
                            Impersonate
                          </Button>
                        )}
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Add/Edit User Tab */}
      {activeTab === "add" && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUser ? "Edit User" : "Add New User"}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* OTP Display Alert */}
            {createdUserOtp && (
              <Alert className="mb-4 border-green-500 bg-green-50">
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold text-green-800">✅ User created successfully!</p>
                    <p className="text-green-700">Temporary Password (OTP):</p>
                    <code className="block bg-white px-4 py-2 rounded border text-2xl font-bold tracking-widest text-center">
                      {createdUserOtp}
                    </code>
                    <p className="text-sm text-green-600">
                      Share this OTP with the user. They will be prompted to change their password on first login.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Select
                      value={formData.title}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, title: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                        <SelectItem value="Dr">Dr</SelectItem>
                        <SelectItem value="Prof">Prof</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, first_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="other_names">Other Names</Label>
                    <Input
                      id="other_names"
                      value={formData.other_names}
                      onChange={(e) => setFormData((prev) => ({ ...prev, other_names: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Employment Details</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employee_id">Staff ID *</Label>
                    <Input
                      id="employee_id"
                      value={formData.employee_id}
                      onChange={(e) => setFormData((prev) => ({ ...prev, employee_id: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="division">Division</Label>
                    <Input
                      id="division"
                      value={formData.division}
                      onChange={(e) => setFormData((prev) => ({ ...prev, division: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData((prev) => ({ ...prev, unit: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      value={formData.grade}
                      onChange={(e) => setFormData((prev) => ({ ...prev, grade: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notch">Notch</Label>
                    <Input
                      id="notch"
                      value={formData.notch}
                      onChange={(e) => setFormData((prev) => ({ ...prev, notch: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="appointment_date">Appointment Date</Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      value={formData.appointment_date}
                      onChange={(e) => setFormData((prev) => ({ ...prev, appointment_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manager_id">Manager/Reporting Authority</Label>
                    <Select
                      value={formData.manager_id}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, manager_id: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select manager" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Manager</SelectItem>
                        {managerOptions.map((manager) => (
                          <SelectItem key={manager.id} value={manager.id}>
                            {manager.first_name} {manager.surname} - {manager.role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4 border-t">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingUser ? "Update User" : "Add User"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={isSubmitting}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Bulk Import Tab */}
      {activeTab === "bulk" && (
        <Card>
          <CardHeader>
            <CardTitle>Bulk Import Users</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csvData">CSV Data</Label>
              <Textarea
                id="csvData"
                value={csvData}
                onChange={(e) => setCsvData(e.target.value)}
                placeholder="name,employee_id,email,role,manager_id,division,region,passwordHash&#10;John Doe,STF001,john@example.com,Staff Member,,HR,,password123"
                rows={10}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Format: name,employee_id,email,role,manager_id,division,region,passwordHash</p>
              <p>Required fields: name, employee_id, role</p>
            </div>
            <Button onClick={handleBulkImport} disabled={!csvData.trim()}>
              <Upload className="h-4 w-4 mr-2" />
              Import Users
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Organizational Chart Tab */}
      {activeTab === "org" && (
        <Card>
          <CardHeader>
            <CardTitle>Organizational Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <OrgChart onUserSelect={handleEdit} />
          </CardContent>
        </Card>
      )}

      {activeTab === "requests" && <AccessRequestsPanel />}
    </div>
  )
}
