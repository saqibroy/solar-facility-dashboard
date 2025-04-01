import { Box, Typography, IconButton, Button } from '@mui/material'
import { ArrowBack as ArrowBackIcon, Upload as UploadIcon } from '@mui/icons-material'
import { Facility, TabValue } from '../../types'
import { useFacilityActions } from '../../stores/facility'

interface PerformanceHeaderProps {
  selectedFacility: Facility | undefined
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  isEmpty: boolean
}

export const PerformanceHeader = ({
  selectedFacility,
  onFileUpload,
  loading,
  isEmpty
}: PerformanceHeaderProps) => {
  const { setCurrentTab } = useFacilityActions()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton
          color='primary'
          onClick={() => setCurrentTab(TabValue.FACILITIES)}
          sx={{ mr: 1 }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant='h6' component='div'>
          {selectedFacility
            ? `Performance: ${selectedFacility.name} (${selectedFacility.nominalPower} kW)`
            : 'Select a facility to view data'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant='outlined'
          component='label'
          startIcon={<UploadIcon />}
          size='small'
          disabled={loading || !isEmpty}
        >
          Upload CSV
          <input type='file' hidden accept='.csv' onChange={onFileUpload} />
        </Button>
      </Box>
    </Box>
  )
}
