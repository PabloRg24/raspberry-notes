import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const getNotes = () => api.get('/notes')
export const createNote = (note) => api.post('/notes', note)
export const updateNote = (id, note) => api.put(`/notes/${id}`, note)
export const deleteNote = (id) => api.delete(`/notes/${id}`)
export const searchNotes = (q) => api.get(`/notes/search?q=${q}`)