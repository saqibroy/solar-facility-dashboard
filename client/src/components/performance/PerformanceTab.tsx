import { Card, CardContent } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_FACILITIES, GET_PERFORMANCE_DATA } from '../../graphql/queries'
import { useFacilityActions, useFacilityStore } from '../../stores/facility'
import { Facility, PerformanceData } from '../../types'
import { PerformanceHeader } from './PerformanceHeader'
import { PerformanceChart } from './PerformanceChart'
import { LoadingErrorState } from '../common/LoadingErrorState'
import { useAuthStore } from '../../stores/auth'

export const PerformanceTab = () => {
  const { selectedFacilityId } = useFacilityStore()
  const { setSnackbar } = useFacilityActions()
  const { token } = useAuthStore()

  const { data: facilitiesData } = useQuery(GET_FACILITIES)
  const facilities: Facility[] = facilitiesData?.facilities || []
  const selectedFacility = facilities.find(f => f.id === selectedFacilityId)

  const {
    loading: performanceLoading,
    error: performanceError,
    data: performanceData,
    refetch: refetchPerformance
  } = useQuery(GET_PERFORMANCE_DATA, {
    variables: { facilityId: selectedFacilityId },
    skip: !selectedFacilityId,
    fetchPolicy: 'network-only'
  })

  const chartData: PerformanceData[] = performanceData?.performanceData || []

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedFacilityId) return

    const formData = new FormData()
    formData.append('file', file)
    const apiuri = import.meta.env.VITE_GRAPHQL_URL
    fetch(`${apiuri.replace(/graphql$/, 'upload-performance-data/')}${selectedFacilityId}`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Upload failed')
        return response.json()
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Data uploaded successfully',
          severity: 'success'
        })
        if (selectedFacilityId) {
          refetchPerformance()
        }
      })
      .catch(error => {
        setSnackbar({
          open: true,
          message: `Error: ${error.message}`,
          severity: 'error'
        })
      })

    event.target.value = ''
  }

  return (
    <Card>
      <CardContent>
        <PerformanceHeader
          selectedFacility={selectedFacility}
          onFileUpload={handleFileUpload}
          loading={performanceLoading}
          isEmpty={chartData.length === 0}
        />

        <LoadingErrorState
          loading={performanceLoading}
          error={performanceError}
          empty={chartData.length === 0}
          emptyMessage='No performance data available. Upload a CSV file to see the chart.'
        />

        {!performanceLoading && !performanceError && chartData.length > 0 && (
          <PerformanceChart data={chartData} />
        )}
      </CardContent>
    </Card>
  )
}
