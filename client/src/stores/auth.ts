import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: { id: string; username: string } | null
  isAuthenticated: boolean
  setAuth: (token: string, user: { id: string; username: string }) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      clearAuth: () => set({ token: null, user: null, isAuthenticated: false })
    }),
    {
      name: 'auth-storage'
    }
  )
)

export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated)
export const useToken = () => useAuthStore(state => state.token)
export const useCurrentUser = () => useAuthStore(state => state.user)
