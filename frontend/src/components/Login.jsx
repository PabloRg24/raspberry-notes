import { useState } from 'react'
import axios from 'axios'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const handleSubmit = async () => {
    try {
      if (isRegister) {
        await axios.post('/auth/register', { username: username.trim(), password: password.trim() })
        setIsRegister(false)
        setError('')
        setUsername('')
        setPassword('')
      } else {
        const res = await axios.post('/auth/login', { username: username.trim(), password: password.trim() })
        localStorage.setItem('token', res.data.token)
        onLogin(res.data.token)
      }
    } catch (e) {
      if (isRegister) {
        setError('El usuario ya existe')
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-80">
        <h1 className="text-xl font-semibold text-gray-800 mb-6">📝 Pi Notes</h1>
        <h2 className="text-sm font-medium text-gray-600 mb-4">
          {isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:border-blue-400"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-4 focus:outline-none focus:border-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 mb-3"
        >
          {isRegister ? 'Registrarse' : 'Entrar'}
        </button>
        <button
          onClick={() => { setIsRegister(!isRegister); setError('') }}
          className="w-full text-sm text-gray-400 hover:text-gray-600"
        >
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  )
}