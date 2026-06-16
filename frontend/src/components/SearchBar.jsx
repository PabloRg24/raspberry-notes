export default function SearchBar({ onSearch }) {
  return (
    <div className="p-4 border-b border-gray-200">
      <input
        type="text"
        placeholder="Buscar notas..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-400 text-sm"
      />
    </div>
  )
}