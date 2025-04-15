import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { BlogContext } from '../App'
import { getBlog } from '../services/blog'

function ViewBlog() {
  const { bId } = useContext(BlogContext)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (bId) {
      getData()
    }
    return () => {
    }
  }, [bId])

  const getData = async () => {
    const result = await getBlog(bId)
    if (result['status'] == 'success') {
      const blog = result['data'][0]
      setTitle(blog['title'])
      setCategory(blog['category'])
      setContent(blog['contents'])
      setAuthor(blog['author'])
      setDate(blog['date'])
    } else {
      toast.error(result['error'])
    }

  }


  return (
    <div>
      <Navbar />
      <h1 className="page-header">View Blog</h1>

      <div className='container'>

        <div className='mb-3'>
          <label htmlFor=''>Blog Id</label>
          <input type='number' className='form-control' value={bId} disabled />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Title</label>
          <input type='text' className='form-control' value={title} disabled />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Author</label>
          <input type='text' className='form-control' value={author} disabled />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Category</label>
          <input type='text' className='form-control' value={category} disabled />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Content</label>
          <textarea className='form-control' rows={5} value={content} disabled></textarea>
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Date</label>
          <input type='text' className='form-control' value={date} disabled />
        </div>

      </div>

    </div>
  )
}

export default ViewBlog
