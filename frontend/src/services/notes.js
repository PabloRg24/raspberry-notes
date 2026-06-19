import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const getNotes = () => api.get('/notes')
export const createNote = (note) => api.post('/notes', note)
export const updateNote = (id, note) => api.put(`/notes/${id}`, note)
export const deleteNote = (id) => api.delete(`/notes/${id}`)
export const searchNotes = (q) => api.get(`/notes/search?q=${q}`)

