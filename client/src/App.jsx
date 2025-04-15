import {ToastContainer} from 'react-toastify'
import React, { useState,createContext } from 'react'
import {Route,Routes} from 'react-router-dom'


import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Home from './pages/Home'
import MyBlogs from './pages/MyBlogs'
import AllBlogs from './pages/AllBlogs'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import ViewBlog from './pages/ViewBlog'
import SearchBlog from './pages/SearchBlog'
import Category from './pages/Category'

export const AuthContext = createContext()
export const BlogContext = createContext()

function App() {
  
  const [user,setUser] = useState(null)
  const [bId,setBId] = useState(0)

  return (
    <div>
      
      <AuthContext.Provider value={{ user, setUser }}>
        <BlogContext.Provider value={{ bId, setBId }}>

        <Routes>
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/myblogs' element={<MyBlogs />} />
          <Route path='/allblogs' element={<AllBlogs />} />
          <Route path='/category' element={<Category />} />
          <Route path='/add' element={<CreateBlog />} />
          <Route path='/edit' element={<EditBlog />} />
          <Route path='/view' element={<ViewBlog />} />
          <Route path='/search' element={<SearchBlog />} />
        </Routes>
        
        </BlogContext.Provider>
      </AuthContext.Provider>
    
    <ToastContainer />
    </div>
   
  )
}

export default App
