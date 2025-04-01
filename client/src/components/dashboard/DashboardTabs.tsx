import { Tabs, Tab, Paper } from '@mui/material'
import { Home as HomeIcon, BarChart as ChartIcon } from '@mui/icons-material'
import { TabValue } from '../../types'
import { useFacilityActions } from '../../stores/facility'

interface DashboardTabsProps {
  currentTab: TabValue
  isMobile: boolean
}

export const DashboardTabs = ({ currentTab, isMobile }: DashboardTabsProps) => {
  const { setCurrentTab } = useFacilityActions()
  return (
    <Paper sx={{ mb: 3 }}>
      <Tabs
        value={currentTab}
        onChange={(_event, newValue) => setCurrentTab(newValue)}
        aria-label='dashboard tabs'
        variant={isMobile ? 'fullWidth' : 'standard'}
      >
        <Tab
          icon={<HomeIcon />}
          label='Facilities'
          iconPosition='start'
          value={TabValue.FACILITIES}
        />
        <Tab
          icon={<ChartIcon />}
          label='Performance Data'
          iconPosition='start'
          value={TabValue.PERFORMANCE}
        />
      </Tabs>
    </Paper>
  )
}
