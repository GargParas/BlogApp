import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../App'
import { loginUser } from '../services/user'

function Signin() {

  const { setUser } = useContext(AuthContext)

  const [info, setInfo] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()


  const onLogin = async () => {
    if (info.email.length == 0) {
      toast.warn('Please enter email')
    } else if (info.password.length == 0) {
      toast.warn('Please enter password')
    } else {
      const { email, password } = info
      const result = await loginUser(email, password)
      if (result['status'] == 'success') {
        toast.success('Welcome to my Blog App')
        const { token, fullName } = result['data']
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('fullName', fullName)
        setUser({ fullName, email })
        navigate('/home')
      }
    }
  }

  return (
    <div>
      <h1 className='page-header'>Login</h1>
      <div className='container'>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            type='password'
            className='form-control'
          />
        </div>

        <div className='mb-3'>
          <div className='mb-3'>
            Don't have an account yet? Register <Link to='/signup'>here</Link>
          </div>
          <button
            onClick={onLogin}
            className='btn btn-success'
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Signin