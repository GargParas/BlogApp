import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/navbar'
import { getMyBlogs, deleteBlog } from '../services/blog'
import { toast } from 'react-toastify'
import { BlogContext } from '../App'

function MyBlogs() {

  const [blogs, setBlogs] = useState([])
  const { setBId } = useContext(BlogContext)

  const navigate = useNavigate()

  const getBlogs = async () => {
    const result = await getMyBlogs()
    if (result['status'] == 'success') {
      setBlogs(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  const onDeleteBlog = async (bid) => {
    const result = await deleteBlog(bid)
    if (result['status'] == 'success') {
      toast.success('Successfully deleted the blog')
      getBlogs()
    } else {
      toast.error(result['error'])
    }
  }

  const onEditBlog = async () => {
    navigate('/edit')
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
      <h1 className='page-header'>Show My Blogs</h1>

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
                    <td>
                      <button onClick={() => {
                        onDeleteBlog(blog['bId'])
                      }}
                        className='btn btn-danger btn-sm'> delete
                      </button>
                      &nbsp;
                      &nbsp;
                      <button onClick={() => {
                        setBId(blog['bId'])
                        onEditBlog()
                      }}
                        className='btn btn-secondary btn-sm'> edit
                      </button>
                      &nbsp;
                      &nbsp;
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

export default MyBlogs
