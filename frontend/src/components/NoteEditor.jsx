import MDEditor from '@uiw/react-md-editor'

export default function NoteEditor({ note, onChange }) {
  if (!note) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Selecciona una nota o crea una nueva
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Título"
          value={note.title}
          onChange={(e) => onChange({ ...note, title: e.target.value })}
          className="w-full text-xl font-medium focus:outline-none text-gray-800"
        />
        <input
          type="text"
          placeholder="Tags (separados por comas)"
          value={note.tags}
          onChange={(e) => onChange({ ...note, tags: e.target.value })}
          className="w-full text-sm text-gray-400 mt-1 focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-auto">
        <MDEditor
          value={note.content}
          onChange={(val) => onChange({ ...note, content: val || '' })}
          height="100%"
          preview="live"
        />
      </div>
    </div>
  )
}