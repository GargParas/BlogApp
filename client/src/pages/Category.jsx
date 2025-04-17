import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { addCategory, getAllCategories, deleteCategory } from '../services/category'
import { toast } from 'react-toastify'

function Category() {

  const [categories, setCategories] = useState([])
  const [title, setTitle] = useState('')

  const onAdd = async () => {
    if (title.length == 0) {
      toast.warn('Please enter title')
    } else {
      const result = await addCategory(title)
      if (result['status'] == 'success') {
        toast.success('Successfully added a category')
        getCategories()
      } else {
        toast.error(result['error'])
      }
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

  const onDeleteCategory = async (cId) => {
    const result = await deleteCategory(cId)
    if (result['status'] == 'success') {
      toast.success('Successfully deleted the category')
      getCategories()
    } else {
      toast.error(result['error'])
    }
  }

  useEffect(() => {
    getCategories()
    return () => {
    }
  }, [])

  return (
    <div>
      <Navbar />
      <h1 className="page-header">Add Categories</h1>

      <div className='container'>

        <div className='mb-3'>
          <label htmlFor=''>Title</label>
          <input onChange={(e) => {
            setTitle(e.target.value)
          }}
            type='text' className='form-control' />
        </div>

        <div className='mb-3'>
          <button onClick={onAdd} className='btn btn-success'> Add Category </button>
        </div>

      </div>

      <div className='container'>
        {categories.length == 0 && (
          <h4>There are no categories available at the moment. Please add a new category.</h4>
        )}

        {categories.length > 0 && (
          <table className='table table-stripped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => {
                return (
                  <tr key={category['cId']}>
                    <td>{category['cId']}</td>
                    <td>{category['title']}</td>
                    <td>
                      <button onClick={() => {
                        onDeleteCategory(category['cId'])
                      }}
                        className='btn btn-danger btn-sm'> delete
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

export default Category
