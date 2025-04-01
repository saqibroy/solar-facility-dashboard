import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material'
import { Home as HomeIcon, Logout as LogoutIcon } from '@mui/icons-material'
import { useFacilityActions } from '../../stores/facility'
import { useAuthStore } from '../../stores/auth'

export const SidebarNavigation = () => {
  const { setSnackbar } = useFacilityActions()
  const { clearAuth } = useAuthStore()

  const handleLogout = () => {
    clearAuth()
    setSnackbar({
      open: true,
      message: 'Logged out successfully',
      severity: 'success'
    })
  }
  return (
    <List component='nav'>
      <ListItem disablePadding>
        <ListItemButton selected>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItemButton>
      </ListItem>
      <Divider sx={{ my: 1 }} />
      <ListItem disablePadding>
        <ListItemButton onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
