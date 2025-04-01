import { Snackbar, Alert } from '@mui/material'
import { useSnackbar, useFacilityActions } from '../../stores/facility'

export const Snack = () => {
  const { open, message, severity } = useSnackbar()
  const { closeSnackbar } = useFacilityActions()

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={closeSnackbar} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
