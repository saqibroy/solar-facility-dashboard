import { Drawer, Toolbar, Divider, Box, Typography, IconButton } from '@mui/material'
import { Person as PersonIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material'
import { useSidebarOpen, useFacilityActions } from '../../stores/facility'
import { useCurrentUser } from '../../stores/auth'
import { SidebarNavigation } from '../common/SidebarNavigation'

export const DashboardSidebar = ({ isMobile }: { isMobile: boolean }) => {
  const sidebarOpen = useSidebarOpen()
  const { toggleSidebar } = useFacilityActions()

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={sidebarOpen}
      onClose={toggleSidebar}
      sx={{
        width: sidebarOpen ? 240 : 0,
        flexShrink: 0,
        pointerEvents: sidebarOpen ? 'auto' : 'none',
        ['& .MuiDrawer-paper']: {
          width: 240,
          boxSizing: 'border-box',
          position: isMobile ? 'fixed' : 'absolute',
          // physically move the drawer off-screen when closed
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: theme =>
            theme.transitions.create('transform', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            })
        }
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1]
        }}
      >
        <Typography variant='h6' noWrap sx={{ flexGrow: 1, ml: 2 }}>
          Facility App
        </Typography>
        <IconButton onClick={toggleSidebar}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            bgcolor: 'primary.light',
            borderRadius: '50%',
            display: 'flex',
            p: 1,
            mr: 1
          }}
        >
          <PersonIcon />
        </Box>
        <Box>
          <Typography variant='subtitle1'>{useCurrentUser()?.username}</Typography>
        </Box>
      </Box>
      <Divider />

      <SidebarNavigation />
    </Drawer>
  )
}
