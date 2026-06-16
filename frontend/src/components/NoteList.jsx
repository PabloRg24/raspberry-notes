export default function NoteList({ notes, selectedId, onSelect, onNew, onDelete }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={onNew}
          className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
        >
          + Nueva nota
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {notes.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-8">No hay notas</p>
        )}
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelect(note)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              selectedId === note.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            }`}
          >
            <p className="font-medium text-sm text-gray-800 truncate">
              {note.title || 'Sin título'}
            </p>
            <p className="text-xs text-gray-400 mt-1 truncate">{note.content}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-gray-300">
                {new Date(note.updated_at).toLocaleDateString()}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}
                className="text-xs text-red-400 hover:text-red-600"
              >
                borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}