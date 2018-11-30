import axios from 'axios'

const API_URL = process.env.VUE_APP_BASE_API_URI

export default () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Content-type': 'application/json',
      'Authorization': localStorage.getItem('authToken')
    }
  })
}