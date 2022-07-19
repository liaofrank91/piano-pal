import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

// useSelector hook is for retrieving things from global state

function Register() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    // Redirect when logged in 
    if (isSuccess || user ) {
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

    if (password !== password2) {
      toast.error('passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }

      dispatch(register(userData))
    }


  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <h1 style={{fontSize: 40}}>Register</h1>
      <div className='flex flex-col items-center'>
        <form onSubmit={onSubmit}>
          <TextField id="standard-basic" type='text' label="Name" variant="standard" value={name} onChange={onChange} name='name' required />
          <br />
          <TextField id="standard-basic" type='email' label="Email" variant="standard" value={email} name='email' onChange={onChange} required />
          <br />
          <TextField id="standard-basic" label="Password" variant="standard" type='password' value={password} name='password' onChange={onChange} required />
          <br />
          <TextField id="standard-basic" label="Confirm password" variant="standard" type='password' value={password2} name='password2' onChange={onChange} required />
          <br />
          <Button type='submit' variant="text">Register</Button>
        </form>

      </div>
    </>
  )
}

export default Register