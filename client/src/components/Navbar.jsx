import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'

function Navbar() {
  // get the logged in user info
  const { user, setUser } = useContext(AuthContext)


  // get the navigate function reference
  const navigate = useNavigate()

  // logout user
  const onLogout = () => {
    // clear the cache
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('fullName')

    // reset the context
    setUser(null)

    // redirect to login
    navigate('/signin')
  }

  return (
    <nav
      className='navbar navbar-expand-lg bg-dark bg-body-tertiary'
      data-bs-theme='dark'
    >
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/home'
        >
          MyBlogApp
        </Link>

        <div
          className='collapse navbar-collapse'
          id='navbarText'
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/home'
              >
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/myblogs'
              >
                My Blogs
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/allblogs'
              >
                All Blogs
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/category'
              >
                Categories
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/add'
              >
                Add Blog
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                aria-current='page'
                to='/search'
              >
                Search Blogs
              </Link>
            </li>
            <li className='nav-item'>
              <button
                onClick={onLogout}
                className='btn'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
