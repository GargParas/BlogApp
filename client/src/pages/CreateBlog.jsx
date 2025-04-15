import React, { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import { addBlog } from '../services/blog'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { getAllCategories } from '../services/category'

function CreateBlog() {

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
    return () => {
    }
  }, [])

  const getCategories = async () => {
    const result = await getAllCategories()
    if (result['status'] == 'success') {
      setCategories(result['data'])
    } else {
      toast.error(result['error'])
    }
  }

  const onAdd = async () => {
    if (title.length == 0) {
      toast.warn('Please enter title')
    } else if (category.length == 0) {
      toast.warn('please enter category')
    } else if (content.length == 0) {
      toast.warn('please enter content')
    }
    else {
      const result = await addBlog(title, content, category)
      if (result['status'] == 'success') {
        toast.success('Successfully added a blog')
        navigate('/myblogs')
      } else {
        toast.error(result['error'])
      }
    }
  }


  return (

    <div>
      <Navbar />
      <h1 className="page-header">Add a Blog</h1>

      <div className='container'>

        <div className='mb-3'>
          <label htmlFor=''>Title</label>
          <input onChange={(e) => {
            setTitle(e.target.value)
          }}
            type='text' className='form-control' />
        </div>

        <div className='mb-3'>
          <label htmlFor=''>Category</label>
          <select onChange={(e) => { setCategory(e.target.value) }} id="inputState" className="form-control">
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
            className='form-control' rows={5}></textarea>
        </div>

        <div className='mb-3'>
          <button onClick={onAdd} className='btn btn-success'> Add Blog </button>
        </div>

      </div>



    </div>
  )
}

export default CreateBlog
