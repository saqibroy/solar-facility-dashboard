import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { FacilityStore, SnackbarState, TabValue } from '../types'

const initialState = {
  selectedFacilityId: null,
  currentTab: TabValue.FACILITIES,
  sidebarOpen: true,
  editMode: false,
  snackbar: { open: false, message: '', severity: 'success' } as SnackbarState
}

export const useFacilityStore = create<FacilityStore>()(
  devtools(set => ({
    ...initialState,
    actions: {
      setSelectedFacilityId: id => set({ selectedFacilityId: id }),
      setCurrentTab: tab => set({ currentTab: tab }),
      toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen })),
      setEditMode: mode => set({ editMode: mode }),
      showSnackbar: (message, severity) => set({ snackbar: { open: true, message, severity } }),
      closeSnackbar: () => set(state => ({ snackbar: { ...state.snackbar, open: false } })),
      setSnackbar: snackbar => set({ snackbar })
    }
  }))
)

// Selector hooks
export const useSelectedFacilityId = () => useFacilityStore(state => state.selectedFacilityId)
export const useCurrentTab = () => useFacilityStore(state => state.currentTab)
export const useSidebarOpen = () => useFacilityStore(state => state.sidebarOpen)
export const useEditMode = () => useFacilityStore(state => state.editMode)
export const useSnackbar = () => useFacilityStore(state => state.snackbar)
export const useFacilityActions = () => useFacilityStore(state => state.actions)
