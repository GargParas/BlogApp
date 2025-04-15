import axios from 'axios'
import { config } from './config'

export async function getAllBlogs() {
    try {
        // create url
        const url = `${config.serverUrl}/blog/viewAllBlogs`

        // get the token
        const token = sessionStorage.getItem('token')

        // make the API call
        const response = await axios.get(url, {
            headers: {
                token,
            },
        })

        // send the response
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function getMyBlogs() {
    try {
        // create url
        const url = `${config.serverUrl}/blog/viewMyBlogs`

        // get the token
        const token = sessionStorage.getItem('token')

        // make the API call
        const response = await axios.get(url, {
            headers: {
                token,
            },
        })

        // send the response
        return response.data
    } catch (ex) {
        console.log(`exception: `, ex)
    }
}

export async function deleteBlog(bid) {

    try {
        // create url
        const url = `${config.serverUrl}/blog/${bid}`
    
        // get the token
        const token = sessionStorage.getItem('token')
    
        // make the API call
        const response = await axios.delete(url, {
          headers: {
            token,
          },
        })
    
        // send the response
        return response.data
      } catch (ex) {
        console.log(`exception: `, ex)
      }

}


export async function addBlog(title,content,cId) {

    try {
        // create url
        const url = `${config.serverUrl}/blog/addBlog`
    
        // create body
        const body = {title,content,cId}
    
        // get the token
        const token = sessionStorage.getItem('token')
    
        // make the API call
        const response = await axios.post(url, body, {
          headers: {
            token, // sending the token here
          },
        })
    
        // send response
        return response.data
      } catch (ex) {
        console.log(`exception: `, ex)
      }

    
}

export async function editBlog(title, content, cId, bId) {
  try {
    // create url
    const url = `${config.serverUrl}/blog/editBlog`

    // create body
    const body = {title, content, cId, bId}

    // get the token
    const token = sessionStorage.getItem('token')

    // make the API call
    const response = await axios.put(url, body, {
      headers: {
        token, // sending the token here
      },
    })

    // send response
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }
}

export async function getBlog(bId) {
  try {
    // create url
    const url = `${config.serverUrl}/blog/${bId}`

    // create body
    // const body = {bId}

    // get the token
    const token = sessionStorage.getItem('token')

    // make the API call
    const response = await axios.get(url, {
      headers: {
        token, // sending the token here
      },
    })

    // send response
    return response.data
  } catch (ex) {
    console.log(`exception: `, ex)
  }

}