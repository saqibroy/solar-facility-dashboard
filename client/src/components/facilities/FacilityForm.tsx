import { Paper, Typography, Box, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material'
import { useEditMode, useFacilityActions, useSelectedFacilityId } from '../../stores/facility'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_FACILITY, UPDATE_FACILITY } from '../../graphql/mutations'
import { GET_FACILITIES } from '../../graphql/queries'
import { Facility, FacilityFormData, TabValue } from '../../types'
import { useEffect, useMemo } from 'react'

export const FacilityForm = () => {
  const selectedFacilityId = useSelectedFacilityId()
  const editMode = useEditMode()
  const { setEditMode, setSnackbar, setSelectedFacilityId, setCurrentTab } = useFacilityActions()
  const { data: facilitiesData, refetch: refetchFacilities } = useQuery(GET_FACILITIES)

  // Use useMemo to stabilize the facilities reference
  const facilities: Facility[] = useMemo(
    () => facilitiesData?.facilities || [],
    [facilitiesData?.facilities]
  )

  const selectedFacility = useMemo(
    () => facilities.find(f => f.id === selectedFacilityId),
    [facilities, selectedFacilityId]
  )

  const [createFacility, { loading: createLoading }] = useMutation(CREATE_FACILITY, {
    onCompleted: () => {
      refetchFacilities()
      setCurrentTab(TabValue.FACILITIES)
      setSnackbar({
        open: true,
        message: 'Facility created successfully',
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

  const [updateFacility, { loading: updateLoading }] = useMutation(UPDATE_FACILITY, {
    onCompleted: () => {
      refetchFacilities()
      setSnackbar({
        open: true,
        message: 'Facility updated successfully',
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

  useEffect(() => {
    if (facilities.length > 0 && !selectedFacilityId) {
      setSelectedFacilityId(facilities[0].id)
    }
  }, [facilities, selectedFacilityId, setSelectedFacilityId])

  const { control, handleSubmit, reset } = useForm<FacilityFormData>({
    defaultValues: {
      name: selectedFacility?.name || '',
      nominalPower: selectedFacility?.nominalPower || 0
    }
  })

  useEffect(() => {
    if (selectedFacility && editMode) {
      reset({
        name: selectedFacility.name,
        nominalPower: selectedFacility.nominalPower
      })
    } else {
      reset({
        name: '',
        nominalPower: 0
      })
    }
  }, [selectedFacility, reset, editMode])

  const handleClickNew = () => {
    setEditMode(false)
    reset({ name: '', nominalPower: 0 })
  }

  const onSubmit = (data: FacilityFormData) => {
    const nominalPower = parseInt(data.nominalPower.toString())

    if (editMode) {
      // Update existing facility
      updateFacility({
        variables: {
          id: selectedFacilityId,
          name: data.name,
          nominalPower
        }
      })
    } else {
      // Create new facility
      createFacility({
        variables: {
          name: data.name,
          nominalPower
        }
      })
    }
  }

  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant='h6' color='primary' sx={{ mb: 2 }}>
        {editMode ? 'Edit Facility' : 'Add New Facility'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
          control={control}
          rules={{ required: 'Name is required' }}
          render={({ field, fieldState }) => (
            <TextField
              label='Facility Name'
              fullWidth
              margin='normal'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name='nominalPower'
          control={control}
          rules={{
            required: 'Power is required',
            validate: value => value > 0 || 'Power must be positive'
          }}
          render={({ field, fieldState }) => (
            <TextField
              label='Nominal Power (kW)'
              type='number'
              fullWidth
              margin='normal'
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            startIcon={editMode ? <EditIcon /> : <AddIcon />}
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? 'Saving...' : editMode ? 'Update' : 'Create'}
          </Button>
          {editMode && (
            <Button variant='outlined' onClick={handleClickNew}>
              New
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  )
}
