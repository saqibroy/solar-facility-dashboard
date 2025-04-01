import { AppBar, Toolbar, IconButton, Typography, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useFacilityActions } from '../../stores/facility'

export const DashboardAppBar = () => {
  const { toggleSidebar } = useFacilityActions()
  const theme = useTheme()

  const handleMenuClick = () => {
    toggleSidebar()
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        zIndex: theme.zIndex.drawer + 2,
        width: '100%',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='toggle sidebar'
          onClick={handleMenuClick}
          sx={{
            marginRight: '36px'
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
          Facility Management Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
