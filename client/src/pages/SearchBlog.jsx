import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { getAllBlogs } from '../services/blog'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { BlogContext } from '../App'

function SearchBlog() {
  const { setBId } = useContext(BlogContext)
  const navigate = useNavigate()

  const [allBlogs, setAllBlogs] = useState([])      // original list
  const [filteredBlogs, setFilteredBlogs] = useState([])  // display list
  const [searchTerm, setSearchTerm] = useState('')   // input

  const onViewBlog = async () => {
    navigate('/view')
  }

  const getBlogs = async () => {
    const result = await getAllBlogs()
    if (result.status === 'success') {
      setAllBlogs(result.data)
      setFilteredBlogs([]) // start with empty list
    } else {
      toast.error(result.error)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  const handleSearch = (value) => {
    setSearchTerm(value)
    if (value.trim() === '') {
      setFilteredBlogs([]) // show only headings
    } else {
      const filtered = allBlogs.filter(blog =>
        blog.title.toLowerCase().includes(value.toLowerCase()) ||
        (blog.content || '').toLowerCase().includes(value.toLowerCase())
      )      
      setFilteredBlogs(filtered)
    }
  }

  return (
    <div>
      <Navbar />
      <h1 className="page-header">Search blog</h1>

      <div className="container">
        <div className="row align-items-center mb-3">
          <div className="col-auto">
            <label htmlFor="searchInput" className="col-form-label">Search Blog:</label>
          </div>
          <div className="col">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                id="searchInput"
                placeholder="Search blog"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <span className="input-group-text bg-primary text-white" style={{ cursor: 'pointer' }}>
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog.bId}>
                <td>{blog.bId}</td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.date}</td>
                <td>{blog.author}</td>
                <td>
                  <button
                    onClick={() => {
                      setBId(blog.bId)
                      onViewBlog()
                    }}
                    className='btn btn-info btn-sm'
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SearchBlog