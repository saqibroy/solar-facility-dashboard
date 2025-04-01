import { CssBaseline, Box, useTheme, useMediaQuery } from '@mui/material'
import { DashboardAppBar } from './components/dashboard/DashboardAppBar'
import { DashboardSidebar } from './components/dashboard/DashboardSidebar'
import { Snack } from './components/common/Snack'
import { AuthModal } from './components/auth/AuthModal'
import { useIsAuthenticated } from './stores/auth'
import { MainContent } from './components/dashboard/MainContent'

const App = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isAuthenticated = useIsAuthenticated()

  return (
    <Box sx={{ display: 'flex' }}>
      <Snack />
      <CssBaseline />
      {isAuthenticated && (
        <>
          <DashboardAppBar />
          <DashboardSidebar isMobile={isMobile} />
        </>
      )}
      {isAuthenticated ? <MainContent isMobile={isMobile} /> : <AuthModal />}
    </Box>
  )
}

export default App
