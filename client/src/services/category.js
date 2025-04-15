import axios from 'axios'
import { config } from './config'

export async function addCategory(title) {
    try {
        // create url
        const url = `${config.serverUrl}/category/add`
    
        // create body
        const body = {title}
    
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

export async function deleteCategory(cId){

    try {
        // create url
        const url = `${config.serverUrl}/category/${cId}`
    
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

export async function getAllCategories() {
    try {
        // create url
        const url = `${config.serverUrl}/category/`
    
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