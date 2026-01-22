import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, Appraisal, AuthState, AppState, AccessRequest, DashboardOverview } from "./types"
import { authApi } from "./api/auth"
import { appraisalsApi } from "./api/appraisals"
import { setAuthToken, setUnauthorizedHandler, parseApiError } from "./api/api"

// Mock organizational data based on the provided hierarchy
const MOCK_USERS: User[] = []

const MOCK_APPRAISALS: Appraisal[] = []

interface AuthPersistState {
  token: string | null
}

export const useAuthStore = create<AuthState & AuthPersistState & {
  register: (data: { employee_id: string; email: string; password: string; name: string; role: string; division?: string; unit?: string; manager_id?: string; phone?: string }) => Promise<void>
  bootstrap: () => Promise<void>
  error: string | null
  hasHydrated: boolean
  clearError: () => void
}>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      error: null,
      hasHydrated: false,
      clearError: () => set({ error: null }),
      login: async (emailOrEmployeeId: string, password: string) => {
        try {
          set({ error: null })
          const payload = { employee_id: emailOrEmployeeId, password }
          const response = await authApi.login(payload)
          const { token, user } = response.data
          setAuthToken(token)
          set({ user, isAuthenticated: true, token })
          useAppStore.getState().setUsersFromServer([user])
          return true
        } catch (error) {
          const apiError = parseApiError(error)
          set({ error: apiError.message, isAuthenticated: false, token: null, user: null })
          return false
        }
      },
      register: async (data) => {
        try {
          set({ error: null })
          await authApi.register(data)
        } catch (error) {
          const apiError = parseApiError(error)
          set({ error: apiError.message })
          throw apiError
        }
      },
      logout: async () => {
        try {
          await authApi.logout()
        } catch (error) {
          console.error('Logout failed', error)
        } finally {
          setAuthToken(null)
          set({ user: null, isAuthenticated: false, token: null })
        }
      },
      bootstrap: async () => {
        const token = get().token
        if (!token) {
          setAuthToken(null)
          set({ user: null, isAuthenticated: false })
          return
        }

        setAuthToken(token)
        try {
          const response = await authApi.getProfile()
          const user = response.data
          set({ user, isAuthenticated: true })
          useAppStore.getState().setUsersFromServer([user])
        } catch (error) {
          console.error('Failed to bootstrap session', error)
          setAuthToken(null)
          set({ user: null, isAuthenticated: false, token: null })
        }
      },
      impersonate: (user_id: string) => {
        console.warn('Impersonation is disabled in production mode.')
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
      onRehydrateStorage: () => (state) => {
        // Mark that rehydration is complete
        if (state) {
          state.hasHydrated = true
        }

        // After rehydration, call bootstrap to restore user session
        if (state?.token) {
          setAuthToken(state.token)
          // Call bootstrap asynchronously to restore user profile
          state.bootstrap().catch(() => {
            // If bootstrap fails, clear the invalid token
            console.error('Session restoration failed')
          })
        }
      },
    },
  ),
)

setUnauthorizedHandler(() => {
  const { logout } = useAuthStore.getState()
  logout()
})

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
      dashboardOverview: null,
      getReports: (manager_id: string) => {
        const state = get()
        return state.users.filter((user) => user.manager_id === manager_id)
      },
      filteredUsers: (query: string) => {
        const state = get()
        if (!query.trim()) return state.users

        const searchTerm = query.toLowerCase()
        return state.users.filter(
          (user) =>
            user.first_name.toLowerCase().includes(searchTerm) ||
            user.employee_id.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm) ||
            (user.division && user.division.toLowerCase().includes(searchTerm)) ||
            (user.email && user.email.toLowerCase().includes(searchTerm)),
        )
      },
      addUser: () => {
        console.warn('addUser is managed via backend API')
      },
      updateUser: () => {
        console.warn('updateUser is managed via backend API')
      },
      deleteUser: () => {
        console.warn('deleteUser is managed via backend API')
      },
      addAppraisal: () => {
        console.warn('addAppraisal is managed via backend API')
      },
      updateAppraisal: () => {
        console.warn('updateAppraisal is managed via backend API')
      },
      addAccessRequest: () => {
        console.warn('addAccessRequest is managed via backend API')
      },
      updateAccessRequest: () => {
        console.warn('updateAccessRequest is managed via backend API')
      },
      approveAccessRequest: () => {
        console.warn('approveAccessRequest is managed via backend API')
      },
      rejectAccessRequest: () => {
        console.warn('rejectAccessRequest is managed via backend API')
      },
      exportData: () => {
        console.warn('exportData is managed via backend API')
        return JSON.stringify({})
      },
      importData: () => {
        console.warn('importData is managed via backend API')
      },
      setUsersFromServer: (users: User[]) => {
        set({ users })
      },
      setAppraisalsFromServer: (appraisals: Appraisal[]) => {
        set({ appraisals })
      },
      setAccessRequestsFromServer: (accessRequests: AccessRequest[]) => {
        set({ accessRequests })
      },
      setDashboardOverview: (dashboardOverview: DashboardOverview | null) => {
        set({ dashboardOverview })
      },
      fetchDashboardOverview: async () => {
        try {
          const overview = await appraisalsApi.getDashboardOverview()
          if (overview?.recentAppraisals) {
            set({ appraisals: overview.recentAppraisals })
          }
          set({ dashboardOverview: overview })
          return overview ?? null
        } catch (error) {
          const apiError = parseApiError(error)
          console.error("Failed to fetch dashboard overview", apiError)
          throw apiError
        }
      },
    }),
    {
      name: "app-storage",
    },
  ),
)
