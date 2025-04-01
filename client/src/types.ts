// types.ts
export interface Facility {
  id: string
  name: string
  nominalPower: number
}

export interface PerformanceData {
  id: string
  timestamp: string
  activePower: number
  energy: number
}

export interface FacilityFormData {
  name: string
  nominalPower: number
}

export interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error'
}

export enum TabValue {
  FACILITIES = 0,
  PERFORMANCE = 1
}

export type AuthFormData = {
  username: string
  password: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    username: string
  }
}

export interface FacilityStore {
  // State
  selectedFacilityId: string | null
  currentTab: TabValue
  sidebarOpen: boolean
  editMode: boolean
  snackbar: SnackbarState
  // Actions
  actions: {
    setSelectedFacilityId: (id: string | null) => void
    setCurrentTab: (tab: TabValue) => void
    toggleSidebar: () => void
    setEditMode: (mode: boolean) => void
    showSnackbar: (message: string, severity: 'success' | 'error') => void
    closeSnackbar: () => void
    setSnackbar: (snackbar: SnackbarState) => void
  }
}
