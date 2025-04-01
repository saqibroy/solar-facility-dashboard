import { Box, Grid, useTheme, useMediaQuery } from '@mui/material'
import { Toolbar } from '@mui/material'
import { FacilitiesTab } from '../facilities/FacilitiesTab'
import { PerformanceTab } from '../performance/PerformanceTab'
import { FacilityForm } from '../facilities/FacilityForm'
import { DashboardTabs } from './DashboardTabs'
import { TabValue } from '../../types'
import { useCurrentTab } from '../../stores/facility'

interface MainContentProps {
  isMobile: boolean
}

export const MainContent = ({ isMobile }: MainContentProps) => {
  const theme = useTheme()
  const currentTab = useCurrentTab()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'hidden',
        p: 3,
        width: '100%',
        transition: theme.transitions.create(['margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        })
      }}
    >
      <Toolbar />
      <Grid
        container
        spacing={3}
        sx={{
          height: isLargeScreen ? 'calc(100vh - 64px - 24px)' : 'auto',
          overflow: 'hidden'
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <DashboardTabs currentTab={currentTab} isMobile={isMobile} />
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.grey[400],
                borderRadius: '3px'
              }
            }}
          >
            {currentTab === TabValue.FACILITIES ? <FacilitiesTab /> : <PerformanceTab />}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            height: '100%',
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '6px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[400],
              borderRadius: '3px'
            }
          }}
        >
          <FacilityForm />
        </Grid>
      </Grid>
    </Box>
  )
}
