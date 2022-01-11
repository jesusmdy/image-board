import axios from 'axios'

let token

if (typeof window !== "undefined") {
  token = localStorage.getItem('API_TOKEN')
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Authentication': token
  }
})

export default api
