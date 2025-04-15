import axios from 'axios'
import { config } from './config'

export async function loginUser(email, password) {
    try {
        // create url
        const url = `${config.serverUrl}/user/login`

        // create the body
        const body = {
            email,
            password,
        }

        // make the API call
        const response = await axios.post(url, body)

        // return response body
        return response.data
    } catch (ex) {
        console.error('exception: ', ex)
    }
}

export async function registerUser(fullName, email, password, phoneNumber) {
    try {
      // create url
      const url = `${config.serverUrl}/user/register`
  
      // create the body
      const body = {
        fullName, email, password, phoneNumber
      }
  
      // make the API call
      const response = await axios.post(url, body)
  
      // return response body
      return response.data
    } catch (ex) {
      console.error('exception: ', ex)
    }
  }