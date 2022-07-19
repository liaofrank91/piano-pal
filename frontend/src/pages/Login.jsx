import * as React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Spinner from '../components/Spinner'


function Login() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in 
    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, user, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1 style={{ fontSize: 40 }}>Login</h1>
      <div className='flex flex-col items-center'>
        <form onSubmit={onSubmit}>
          <TextField id="standard-basic" type='email' label="Email" variant="standard" value={email} name='email' onChange={onChange} required />
          <br />
          <TextField id="standard-basic" label="Password" variant="standard" type='password' value={password} name='password' onChange={onChange} required />
          <br />
          <Button type='submit' variant="text">Login</Button>
        </form>

      </div>
    </>
  )
}

export default Login