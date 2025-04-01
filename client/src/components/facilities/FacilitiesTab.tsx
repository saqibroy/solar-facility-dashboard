import { Card } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { GET_FACILITIES } from '../../graphql/queries'
import { useFacilityActions, useSelectedFacilityId } from '../../stores/facility'
import { Facility } from '../../types'
import { DELETE_FACILITY } from '../../graphql/mutations'
import { FacilitiesHeader } from './FacilitiesHeader'
import { FacilitiesTable } from './FacilitiesTable'
import { LoadingErrorState } from '../common/LoadingErrorState'

export const FacilitiesTab = () => {
  const {
    data: facilitiesData,
    loading: facilitiesLoading,
    error: facilitiesError,
    refetch
  } = useQuery(GET_FACILITIES)
  const { setSelectedFacilityId, setEditMode, setSnackbar } = useFacilityActions()
  const selectedFacilityId = useSelectedFacilityId()

  const [deleteFacility, { loading: deleteLoading }] = useMutation(DELETE_FACILITY, {
    onCompleted: () => {
      refetch()
      setSnackbar({
        open: true,
        message: 'Facility deleted successfully',
        severity: 'success'
      })
    },
    onError: error => {
      setSnackbar({
        open: true,
        message: `Error: ${error.message}`,
        severity: 'error'
      })
    }
  })

  const facilities: Facility[] = facilitiesData?.facilities || []

  const handleDelete = (id: string) => {
    deleteFacility({ variables: { id } })

    // If we're deleting the selected facility
    if (selectedFacilityId === id) {
      // Find the next facility to select
      const index = facilities.findIndex(f => f.id === id)
      if (index > 0) {
        setSelectedFacilityId(facilities[index - 1].id)
      } else if (facilities.length > 1) {
        setSelectedFacilityId(facilities[1].id)
      } else {
        setSelectedFacilityId(null)
        setEditMode(false)
      }
    }
  }

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <FacilitiesHeader loading={facilitiesLoading} onRefresh={() => refetch()} />

      <LoadingErrorState loading={facilitiesLoading} error={facilitiesError} />

      <FacilitiesTable
        facilities={facilities}
        deleteLoading={deleteLoading}
        onDelete={handleDelete}
      />
    </Card>
  )
}
