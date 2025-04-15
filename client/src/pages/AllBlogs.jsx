import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { getAllBlogs } from '../services/blog'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { BlogContext } from '../App'

function AllBlogs() {
  const { setBId } = useContext(BlogContext)
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    const result = await getAllBlogs()
    if (result['status'] == 'success') {
      setBlogs(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  const onViewBlog = async () => {
    navigate('/view')
  }

  useEffect(() => {
    getBlogs()
    return () => {
    }
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className='page-header'>Show All Blogs</h1>

      <div className='container'>
        {blogs.length == 0 && (
          <h4>There are no blogs available at the moment. Please add a new blog.</h4>
        )}

        {blogs.length > 0 && (
          <table className='table table-stripped'>
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
              {blogs.map((blog, index) => {
                return (
                  <tr key={blog['bId']}>
                    <td>{blog['bId']}</td>
                    <td>{blog['title']}</td>
                    <td>{blog['category']}</td>
                    <td>{blog['date']}</td>
                    <td>{blog['author']}</td>
                    <td>
                    <button onClick={() => {
                        setBId(blog['bId'])
                        onViewBlog()
                      }}
                        className='btn btn-info btn-sm'> view
                    </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AllBlogs