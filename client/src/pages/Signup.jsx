import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser } from '../services/user'

function Signup() {
  const [info, setInfo] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  })

  const navigate = useNavigate()

  const onRegister = async () => {
    if (info.email.length == 0) {
      toast.warn('Please enter email')
    } else if (info.password.length == 0) {
      toast.warn('Please enter password')
    } else if (info.fullName.length == 0) {
      toast.warn('Please enter name')
    } else if (info.phone.length == 0) {
      toast.warn('Please enter phone number')
    }
    else {
      const { email, password, fullName, phone } = info
      const result = await registerUser(
        fullName,
        email,
        password,
        phone
      )
      if (result['status'] == 'success') {
        toast.success('Successfully registered a user')
        navigate('/signin')
      }
    }
  }

  return (

    <div>
      <h1 className='page-header'>Register</h1>
      <div className='container'>
        <div className='mb-3'>
          <label htmlFor=''>Name</label>
          <input
            onChange={(e) => setInfo({ ...info, fullName: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor=''>Phone Number</label>
          <input
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
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
            Already have an account yet? Login <Link to='/signin'>here</Link>
          </div>
          <button
            onClick={onRegister}
            className='btn btn-success'
          >
            Register
          </button>
        </div>
      </div>
    </div>

  )
}

export default Signup
