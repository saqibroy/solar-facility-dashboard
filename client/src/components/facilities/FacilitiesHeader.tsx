import { Box, Typography, Button } from '@mui/material'
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material'
import { useFacilityActions } from '../../stores/facility'

interface FacilitiesHeaderProps {
  loading: boolean
  onRefresh: () => void
}

export const FacilitiesHeader = ({ loading, onRefresh }: FacilitiesHeaderProps) => {
  const { setEditMode } = useFacilityActions()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}
    >
      <Typography variant='h6' color='primary' gutterBottom>
        Facilities
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='outlined' startIcon={<AddIcon />} onClick={() => setEditMode(false)}>
          New Facility
        </Button>
        <Button
          variant='outlined'
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>
    </Box>
  )
}
