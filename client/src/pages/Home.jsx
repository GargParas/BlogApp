import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { getToken } from '../services/config'
import { useNavigate } from 'react-router'

function Home() {

  const navigate = useNavigate()

  const validate = async () => {
    const result = await getToken()
    if (result['token'] == false) {
      navigate('/signin')
    }
  }

  useEffect(() => {
    validate()
    return () => {
    }
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className='page-header'>This is home page</h1>
    </div>
  )
}

export default Home