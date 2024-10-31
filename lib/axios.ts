'use client'

import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://janka-project.vercel.app/api'
  : 'http://localhost:3000/api'

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
})

export default axiosInstance 