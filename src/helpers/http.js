import axios from "axios"

const http = (token) => {
  const headers = {}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const instance = axios.create({
    baseURL: "http://localhost:8080",
    headers,
  })
  return instance
}

export default http