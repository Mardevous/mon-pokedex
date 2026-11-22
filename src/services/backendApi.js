import axios from 'axios'

const backendApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
})

export default backendApi