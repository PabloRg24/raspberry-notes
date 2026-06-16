import { useState, useEffect, useCallback } from 'react'
import NoteList from './components/NoteList'
import NoteEditor from './components/NoteEditor'
import SearchBar from './components/SearchBar'
import { getNotes, createNote, updateNote, deleteNote, searchNotes } from './services/notes'

export default function App() {
  const [notes, setNotes] = useState([])
  const [selected, setSelected] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const loadNotes = useCallback(async () => {
    const res = await getNotes()
    setNotes(res.data || [])
  }, [])

  useEffect(() => {
    loadNotes()
  }, [loadNotes])

  useEffect(() => {
    if (!searchQuery) { loadNotes(); return }
    const timer = setTimeout(async () => {
      const res = await searchNotes(searchQuery)
      setNotes(res.data || [])
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, loadNotes])

  useEffect(() => {
    if (!selected) return
    const timer = setTimeout(async () => {
      await updateNote(selected.id, selected)
      loadNotes()
    }, 800)
    return () => clearTimeout(timer)
  }, [selected, loadNotes])

  const handleNew = async () => {
    const res = await createNote({ title: '', content: '', tags: '' })
    await loadNotes()
    setSelected(res.data)
  }

  const handleDelete = async (id) => {
    await deleteNote(id)
    if (selected?.id === id) setSelected(null)
    loadNotes()
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="w-72 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800">📝 Pi Notes</h1>
        </div>
        <SearchBar onSearch={setSearchQuery} />
        <NoteList
          notes={notes}
          selectedId={selected?.id}
          onSelect={setSelected}
          onNew={handleNew}
          onDelete={handleDelete}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <NoteEditor note={selected} onChange={setSelected} />
      </div>
    </div>
  )
}