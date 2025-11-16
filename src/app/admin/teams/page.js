'use client'

import { useState, useEffect } from 'react'
import { LogoutButton } from '@/components/LogoutButton'  // ← AJOUTER

export default function AdminTeams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    game: '',
    country: '',
    logo: ''
  })
  const [editingId, setEditingId] = useState(null)

  // Charger les équipes
  useEffect(() => {
    fetchTeams()
  }, [])

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams')
      const data = await res.json()
      setTeams(data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  // Créer ou modifier une équipe
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingId ? '/api/teams' : '/api/teams'
      const method = editingId ? 'PUT' : 'POST'
      
      const body = editingId 
        ? { ...formData, id: editingId }
        : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.ok) {
        alert(editingId ? 'Équipe modifiée !' : 'Équipe créée !')
        setFormData({ name: '', game: '', country: '', logo: '' })
        setEditingId(null)
        fetchTeams()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'opération')
    }
  }

  // Supprimer une équipe
  const handleDelete = async (id) => {
    if (!confirm('Supprimer cette équipe ?')) return

    try {
      const res = await fetch(`/api/teams?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        alert('Équipe supprimée !')
        fetchTeams()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  // Préparer l'édition
  const handleEdit = (team) => {
    setFormData({
      name: team.name,
      game: team.game,
      country: team.country || '',
      logo: team.logo || ''
    })
    setEditingId(team.id)
  }

  if (loading) return <div className="p-8 text-white">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
     <div className="flex justify-between items-center mb-8">
     <h1 className="text-4xl font-bold"> Gestion des Équipes</h1>
     <LogoutButton />
     </div>

      {/* Formulaire */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? ' Modifier' : ' Créer'} une équipe
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Nom de l'équipe *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="Ex: T1"
            />
          </div>

          <div>
            <label className="block mb-2">Jeu *</label>
            <select
            required
            value={formData.game}
            onChange={(e) => setFormData({ ...formData, game: e.target.value })}
            className="w-full p-2 bg-gray-700 rounded">
            <option value="">Choisir un sport</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Rugby">Rugby</option>
            <option value="Tennis">Tennis</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Pays</label>
            <input
              type="text"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="Ex: South Korea"
            />
          </div>

          <div>
            <label className="block mb-2">URL du logo</label>
            <input
              type="text"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="https://..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
            >
              {editingId ? 'Modifier' : 'Créer'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setFormData({ name: '', game: '', country: '', logo: '' })
                }}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des équipes */}
      <div>
        <h2 className="text-2xl font-semibold mb-4"> Liste des équipes ({teams.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="bg-gray-800 p-4 rounded-lg">
              {team.logo && (
                <img src={team.logo} alt={team.name} className="w-16 h-16 object-contain mb-2" />
              )}
              <h3 className="text-xl font-bold">{team.name}</h3>
              <p className="text-gray-400">{team.game}</p>
              {team.country && <p className="text-gray-500"> {team.country}</p>}
              
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(team)}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                >
                 Modifier
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}