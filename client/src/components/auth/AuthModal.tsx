import { Modal, Box, Typography, Button, Stack } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { TextField } from '@mui/material'
import { useMutation } from '@apollo/client'
import { SIGN_IN, SIGN_UP } from '../../graphql/mutations'
import { useAuthStore } from '../../stores/auth'
import { useState } from 'react'
import { AuthFormData } from '../../types'
import { useFacilityActions } from '../../stores/facility'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
}

export const AuthModal = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { setAuth } = useAuthStore()

  const { setSnackbar } = useFacilityActions()

  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: () => {
      setSnackbar({
        open: true,
        message: 'Signed in successfully',
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
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: () => {
      setSnackbar({
        open: true,
        message: 'Signed Up successfully',
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<AuthFormData>()

  const onSubmit = async (data: AuthFormData) => {
    try {
      const mutation = isLogin ? signIn : signUp
      const { data: response } = await mutation({
        variables: {
          username: data.username,
          password: data.password
        }
      })

      const authData = isLogin ? response.signIn : response.signUp
      setAuth(authData.token, authData.user)
    } catch (error) {
      reset()
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
    reset()
  }

  return (
    <Modal open={true}>
      <Box sx={style}>
        <Typography variant='h6' mb={2}>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              }}
              render={({ field }) => (
                <TextField
                  label='Username'
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              }}
              render={({ field }) => (
                <TextField
                  label='Password'
                  type='password'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...field}
                />
              )}
            />

            <Button type='submit' variant='contained' fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>

            <Button onClick={toggleAuthMode} color='secondary' disabled={isSubmitting}>
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  )
}
