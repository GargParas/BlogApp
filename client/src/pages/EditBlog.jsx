import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { editBlog, getBlog } from '../services/blog'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { getAllCategories } from '../services/category'
import { BlogContext } from '../App'

function EditBlog() {
  const { bId } = useContext(BlogContext)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (bId) {
      getData()
      getCategories()
    }
    return () => {
    }
  }, [bId])

  const getData = async () => {
    const result = await getBlog(bId)
    if (result['status'] == 'success') {
      const blog = result['data'][0]
      setTitle(blog['title'])
      setCategory(blog['cId'])
      setContent(blog['contents'])
    } else {
      toast.error(result['error'])
    }

  }

  const getCategories = async () => {
    const result = await getAllCategories()
    if (result['status'] == 'success') {
      setCategories(result['data'])
    } else {
      toast.error(result['error'])
    }
  }


  const onUpdate = async () => {
    if (title.length == 0) {
      toast.warn('Please enter title')
    } else if (category.length == 0) {
      toast.warn('please enter category')
    } else if (content.length == 0) {
      toast.warn('please enter content')
    }
    else {
      const result = await editBlog(title, content, category, bId)
      if (result['status'] == 'success') {
        toast.success('Successfully updated a blog')
        navigate('/myblogs')
      } else {
        toast.error(result['error'])
      }
    }
  }

  return (
    <div>
      <Navbar />
      <h1 className="page-header">Edit a Blog</h1>

      <div className='container'>

        <div className='mb-3'>
          <label htmlFor=''>Blog Id</label>
          <input type='number' className='form-control' value={bId} disabled />
        </div>


        <div className='mb-3'>
          <label htmlFor=''>Title</label>
          <input onChange={(e) => {
            setTitle(e.target.value)
          }}
            type='text' className='form-control' value={title} />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Category</label>
          <select onChange={(e) => { setCategory(e.target.value) }} id="inputState" className="form-control" value={category} >
            <option value={0}>Select Category</option>
            {categories.map((category, index) => {
              return (
                <option key={category['cId']} value={category['cId']}>{category['title']}</option>
              )
            })}

          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Content</label>
          <textarea onChange={(e) => {
            setContent(e.target.value)
          }}
            className='form-control' rows={5} value={content}></textarea>
        </div>

        <div className='mb-3'>
          <button onClick={onUpdate} className='btn btn-success'> Update Blog </button>
        </div>

      </div>



    </div>
  )
}

export default EditBlog
