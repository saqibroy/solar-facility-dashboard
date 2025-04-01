import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography
} from '@mui/material'
import { BarChart as ChartIcon, DeleteOutline as DeleteIcon } from '@mui/icons-material'
import { Facility, TabValue } from '../../types'
import { useFacilityActions, useSelectedFacilityId } from '../../stores/facility'

interface FacilitiesTableProps {
  facilities: Facility[]
  deleteLoading: boolean
  onDelete: (id: string) => void
}

export const FacilitiesTable = ({ facilities, deleteLoading, onDelete }: FacilitiesTableProps) => {
  const selectedFacilityId = useSelectedFacilityId()
  const { setSelectedFacilityId, setEditMode, setCurrentTab } = useFacilityActions()

  const handleSelectFacility = (id: string) => {
    setSelectedFacilityId(id)
    setEditMode(true)
  }

  const handleViewPerformance = (id: string) => {
    setSelectedFacilityId(id)
    setCurrentTab(TabValue.PERFORMANCE)
  }

  return (
    <TableContainer>
      <Table size='medium'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Nominal Power (kW)</TableCell>
            <TableCell align='right'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facilities.length > 0 ? (
            facilities.map(facility => (
              <TableRow
                key={facility.id}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    selectedFacilityId === facility.id ? 'rgba(63, 81, 181, 0.08)' : 'inherit',
                  '&:hover': {
                    backgroundColor:
                      selectedFacilityId === facility.id
                        ? 'rgba(63, 81, 181, 0.12)'
                        : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <TableCell onClick={() => handleSelectFacility(facility.id)}>
                  {facility.name}
                </TableCell>
                <TableCell onClick={() => handleSelectFacility(facility.id)}>
                  {facility.nominalPower}
                </TableCell>
                <TableCell align='right'>
                  <IconButton
                    color='primary'
                    onClick={() => handleViewPerformance(facility.id)}
                    title='View Performance Data'
                    sx={{ mr: 1 }}
                  >
                    <ChartIcon />
                  </IconButton>
                  <IconButton
                    color='error'
                    onClick={() => onDelete(facility.id)}
                    title='Delete Facility'
                    disabled={deleteLoading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align='center'>
                <Typography variant='body2' color='text.secondary' sx={{ py: 2 }}>
                  No facilities found. Create your first facility using the form.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
