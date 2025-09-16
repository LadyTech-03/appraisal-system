import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Appraisal, AuthState, AppState, AccessRequest } from "./types"

// Mock organizational data based on the provided hierarchy
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    staffId: "DG001",
    email: "dg@appraisal.gov",
    role: "Director-General",
    passwordHash: "admin123", // In production, this would be properly hashed
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Michael Chen",
    staffId: "DDG001",
    email: "michael.chen@appraisal.gov",
    role: "Deputy Director – General, Management Services",
    managerId: "1",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Jennifer Williams",
    staffId: "DDG002",
    email: "jennifer.williams@appraisal.gov",
    role: "Deputy Director – General, Operations",
    managerId: "1",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Robert Davis",
    staffId: "HR001",
    email: "robert.davis@appraisal.gov",
    role: "HR Management & Development Division Head",
    managerId: "2",
    division: "Management Services",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Lisa Thompson",
    staffId: "FIN001",
    email: "lisa.thompson@appraisal.gov",
    role: "Finance Division Head",
    managerId: "2",
    division: "Management Services",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "David Wilson",
    staffId: "CA001",
    email: "david.wilson@appraisal.gov",
    role: "Corporate Affairs Head",
    managerId: "1",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Maria Rodriguez",
    staffId: "IA001",
    email: "maria.rodriguez@appraisal.gov",
    role: "Internal Audit Head",
    managerId: "1",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "James Anderson",
    staffId: "LS001",
    email: "james.anderson@appraisal.gov",
    role: "Legal Services Head",
    managerId: "1",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Emily Brown",
    staffId: "ADM001",
    email: "emily.brown@appraisal.gov",
    role: "Administration Division Head",
    managerId: "2",
    division: "Management Services",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Thomas Lee",
    staffId: "RIM001",
    email: "thomas.lee@appraisal.gov",
    role: "Research, Innovation, Monitoring & Evaluation Division Head",
    managerId: "2",
    division: "Management Services",
    passwordHash: "password123",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const MOCK_APPRAISALS: Appraisal[] = [
  {
    id: "1",
    employeeId: "4",
    appraiserId: "2",
    periodStart: "2024-01-01",
    periodEnd: "2024-12-31",
    status: "draft",
    employeeInfo: {
      title: "Mr.",
      surname: "Davis",
      firstName: "Robert",
      otherNames: "",
      gender: "Male",
      grade: "Grade 15",
      position: "HR Management & Development Division Head",
      department: "Management Services",
      appointmentDate: "2020-01-15",
    },
    appraiserInfo: {
      title: "Mr.",
      surname: "Chen",
      firstName: "Michael",
      otherNames: "",
      position: "Deputy Director – General, Management Services",
    },
    trainingReceived: [],
    keyResultAreas: [
      {
        id: "1",
        area: "HR Process Improvement",
        targets: "Reduce processing time by 25%",
        resourcesRequired: "HR software upgrade, staff training",
      },
    ],
    endOfYearReview: {
      targets: [],
      totalScore: 0,
      averageScore: 0,
      weightedScore: 0,
    },
    coreCompetencies: {
      organizationManagement: {
        planOrganizeWork: { weight: 0.3, score: 0 },
        workSystematically: { weight: 0.3, score: 0 },
        manageOthers: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      innovationStrategicThinking: {
        supportChange: { weight: 0.3, score: 0 },
        thinkBroadly: { weight: 0.3, score: 0 },
        originalityThinking: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      leadershipDecisionMaking: {
        initiateAction: { weight: 0.3, score: 0 },
        acceptResponsibility: { weight: 0.3, score: 0 },
        exerciseJudgment: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      developingImproving: {
        organizationDevelopment: { weight: 0.3, score: 0 },
        customerSatisfaction: { weight: 0.3, score: 0 },
        personnelDevelopment: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      communication: {
        communicateDecisions: { weight: 0.3, score: 0 },
        negotiateManageConflict: { weight: 0.3, score: 0 },
        relateNetwork: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      jobKnowledgeTechnicalSkills: {
        mentalPhysicalSkills: { weight: 0.3, score: 0 },
        crossFunctionalAwareness: { weight: 0.3, score: 0 },
        buildingApplyingExpertise: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      supportingCooperating: {
        workEffectively: { weight: 0.3, score: 0 },
        showSupport: { weight: 0.3, score: 0 },
        adhereEthics: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      maximizingProductivity: {
        motivateInspire: { weight: 0.3, score: 0 },
        acceptChallenges: { weight: 0.3, score: 0 },
        managePressure: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      budgetCostManagement: {
        financialAwareness: { weight: 0.3, score: 0 },
        businessProcesses: { weight: 0.3, score: 0 },
        resultBasedActions: { weight: 0.3, score: 0 },
        total: 0,
        average: 0,
        comments: "",
      },
      coreCompetenciesAverage: 0,
    },
    nonCoreCompetencies: {
      developStaff: {
        developOthers: { weight: 0.1, score: 0 },
        provideGuidance: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      personalDevelopment: {
        eagernessForDevelopment: { weight: 0.1, score: 0 },
        innerDrive: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      deliveringResults: {
        customerSatisfaction: { weight: 0.1, score: 0 },
        qualityService: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      followingInstructions: {
        regulations: { weight: 0.1, score: 0 },
        customerFeedback: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      respectCommitment: {
        respectSuperiors: { weight: 0.1, score: 0 },
        commitmentWork: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      teamWork: {
        functionInTeam: { weight: 0.1, score: 0 },
        workInTeam: { weight: 0.1, score: 0 },
        total: 0,
        average: 0,
      },
      nonCoreCompetenciesAverage: 0,
    },
    overallAssessment: {
      performanceScore: 0,
      coreCompetenciesScore: 0,
      nonCoreCompetenciesScore: 0,
      overallTotal: 0,
      overallPercentage: 0,
      overallRating: 3,
      ratingDescription: "Met all Expectations",
    },
    appraiserComments: "",
    trainingDevelopmentPlan: "",
    assessmentDecision: "suitable",
    appraiseeComments: "",
    hodComments: "",
    hodName: "",
    hodSignature: "",
    hodDate: "",
    appraiserSignature: "",
    appraiserSignatureDate: "",
    appraiseeSignature: "",
    appraiseeSignatureDate: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: async (emailOrStaffId: string, password: string, role: string) => {
        const { users } = useAppStore.getState()
        const user = users.find(
          (u) =>
            (u.email === emailOrStaffId || u.staffId === emailOrStaffId) &&
            u.passwordHash === password &&
            u.role === role,
        )

        if (user) {
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      logout: () => set({ user: null, isAuthenticated: false }),
      impersonate: (userId: string) => {
        const { users } = useAppStore.getState()
        const user = users.find((u) => u.id === userId)
        if (user) {
          set({ user, isAuthenticated: true })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: MOCK_USERS,
      appraisals: MOCK_APPRAISALS,
      accessRequests: [],
      roles: [
        "Director-General",
        "Deputy Director – General, Management Services",
        "Deputy Director – General, Operations",
        "Corporate Affairs Head",
        "Internal Audit Head",
        "Legal Services Head",
        "HR Management & Development Division Head",
        "Finance Division Head",
        "Administration Division Head",
        "Research, Innovation, Monitoring & Evaluation Division Head",
        "EduTech Division Head",
        "Infrastructure Planning & Development Division Head",
        "Apprenticeship Division Head",
        "Partnerships, WEL & Inclusion Division Head",
        "Training, Assessment & Quality Assurance Division Head",
        "Regional Director",
        "Unit Head",
        "Staff Member",
      ],
      orgHierarchy: {
        "1": ["2", "3", "6", "7", "8"], // DG manages both Deputy DGs and direct reports
        "2": ["4", "5", "9", "10"], // DDG Management Services
        "3": [], // DDG Operations (would manage other division heads)
      },
      getReports: (managerId: string) => {
        const state = get()
        return state.users.filter((user) => user.managerId === managerId)
      },
      filteredUsers: (query: string) => {
        const state = get()
        if (!query.trim()) return state.users

        const searchTerm = query.toLowerCase()
        return state.users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.staffId.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm) ||
            (user.division && user.division.toLowerCase().includes(searchTerm)) ||
            (user.email && user.email.toLowerCase().includes(searchTerm)),
        )
      },
      addUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ users: [...state.users, newUser] }))

        if (userData.managerId && userData.managerId !== "none") {
          set((state) => ({
            orgHierarchy: {
              ...state.orgHierarchy,
              [userData.managerId]: [...(state.orgHierarchy[userData.managerId] || []), newUser.id],
            },
          }))
        }
      },
      updateUser: (id, updates) => {
        set((state) => {
          const updatedUsers = state.users.map((user) =>
            user.id === id ? { ...user, ...updates, updatedAt: new Date().toISOString() } : user,
          )

          const updatedOrgHierarchy = { ...state.orgHierarchy }
          const oldUser = state.users.find((u) => u.id === id)

          if (oldUser?.managerId && oldUser.managerId !== "none") {
            updatedOrgHierarchy[oldUser.managerId] = (updatedOrgHierarchy[oldUser.managerId] || []).filter(
              (userId) => userId !== id,
            )
          }

          if (updates.managerId && updates.managerId !== "none") {
            updatedOrgHierarchy[updates.managerId] = [...(updatedOrgHierarchy[updates.managerId] || []), id]
          }

          return {
            users: updatedUsers,
            orgHierarchy: updatedOrgHierarchy,
          }
        })
      },
      deleteUser: (id) => {
        set((state) => {
          const userToDelete = state.users.find((u) => u.id === id)
          const updatedUsers = state.users.filter((user) => user.id !== id)

          const updatedOrgHierarchy = { ...state.orgHierarchy }

          if (userToDelete?.managerId && userToDelete.managerId !== "none") {
            updatedOrgHierarchy[userToDelete.managerId] = (updatedOrgHierarchy[userToDelete.managerId] || []).filter(
              (userId) => userId !== id,
            )
          }

          delete updatedOrgHierarchy[id]

          return {
            users: updatedUsers,
            orgHierarchy: updatedOrgHierarchy,
          }
        })
      },
      addAppraisal: (appraisalData) => {
        const newAppraisal: Appraisal = {
          ...appraisalData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ appraisals: [...state.appraisals, newAppraisal] }))
      },
      updateAppraisal: (id, updates) => {
        set((state) => ({
          appraisals: state.appraisals.map((appraisal) =>
            appraisal.id === id ? { ...appraisal, ...updates, updatedAt: new Date().toISOString() } : appraisal,
          ),
        }))
      },
      addAccessRequest: (requestData) => {
        const newRequest: AccessRequest = {
          ...requestData,
          id: Date.now().toString(),
          status: "pending",
          submittedAt: new Date().toISOString(),
        }
        set((state) => ({ accessRequests: [...state.accessRequests, newRequest] }))
      },
      updateAccessRequest: (id, updates) => {
        set((state) => ({
          accessRequests: state.accessRequests.map((request) =>
            request.id === id ? { ...request, ...updates } : request,
          ),
        }))
      },
      approveAccessRequest: (id, managerId) => {
        const state = get()
        const request = state.accessRequests.find((r) => r.id === id)
        if (!request) return

        // Create new user from approved request
        const newUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
          name: request.name,
          email: request.email,
          staffId: request.staffId || `STAFF${Date.now()}`,
          role: request.role,
          division: request.division,
          managerId: managerId || "1", // Default to DG if no manager specified
          passwordHash: "password123", // Default password
        }

        // Add user to system
        get().addUser(newUser)

        // Update request status
        set((state) => ({
          accessRequests: state.accessRequests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "approved" as const,
                  reviewedAt: new Date().toISOString(),
                  reviewedBy: "1", // DG ID
                }
              : request,
          ),
        }))
      },
      rejectAccessRequest: (id) => {
        set((state) => ({
          accessRequests: state.accessRequests.map((request) =>
            request.id === id
              ? {
                  ...request,
                  status: "rejected" as const,
                  reviewedAt: new Date().toISOString(),
                  reviewedBy: "1", // DG ID
                }
              : request,
          ),
        }))
      },
      exportData: () => {
        const state = get()
        return JSON.stringify(
          {
            users: state.users,
            appraisals: state.appraisals,
            orgHierarchy: state.orgHierarchy,
            accessRequests: state.accessRequests,
          },
          null,
          2,
        )
      },
      importData: (data) => {
        try {
          const parsed = JSON.parse(data)
          set({
            users: parsed.users || [],
            appraisals: parsed.appraisals || [],
            orgHierarchy: parsed.orgHierarchy || {},
            accessRequests: parsed.accessRequests || [],
          })
        } catch (error) {
          console.error("Failed to import data:", error)
        }
      },
    }),
    {
      name: "app-storage",
    },
  ),
)
