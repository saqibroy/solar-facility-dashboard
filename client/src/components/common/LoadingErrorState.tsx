import { Box, Alert, CircularProgress } from '@mui/material'

interface LoadingErrorStateProps {
  loading: boolean
  error?: Error
  empty?: boolean
  emptyMessage?: string
}

export const LoadingErrorState = ({
  loading,
  error,
  empty = false,
  emptyMessage = 'No data available'
}: LoadingErrorStateProps) => {
  if (loading) {
    return (
      <Box display='flex' justifyContent='center' my={4}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Alert severity='error' sx={{ mb: 2 }}>
        Error: {error.message}
      </Alert>
    )
  }

  if (empty) {
    return (
      <Alert severity='info' sx={{ mb: 2 }}>
        {emptyMessage}
      </Alert>
    )
  }

  return null
}
