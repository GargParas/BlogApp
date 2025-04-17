import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import { getToken } from '../services/config'
import { useNavigate } from 'react-router'
import '../App.css'

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
      <div className="home-page">
        <div className="container text-center text-light">
        </div>
      </div>
    </div>
  )
}

export default Home