'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await res.json()

      if (res.ok) {
        // Connexion réussie
        router.push('/admin/teams')
      } else {
        setError(data.error || 'Mot de passe incorrect')
        setLoading(false)
      }
    } catch (error) {
      console.error('Erreur:', error)
      setError('Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        {/* Logo/Titre */}
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-white hover:text-purple-400 transition">
             E-Sports Betting
          </Link>
          <h2 className="text-2xl font-bold text-white mt-6 mb-2"> Accès Admin</h2>
          <p className="text-gray-400">Entrez le mot de passe administrateur</p>
        </div>

        {/* Formulaire */}
        <div className="bg-gray-800 rounded-lg p-8 border border-purple-500/30">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-white font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 p-3 rounded-lg">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? ' Connexion...' : ' Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p> Accès réservé aux administrateurs</p>
        </div>
      </div>
    </div>
  )
}