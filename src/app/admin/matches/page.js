'use client'

import { useState, useEffect } from 'react'

export default function AdminMatches() {
  const [matches, setMatches] = useState([])
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    homeTeamId: '',
    awayTeamId: '',
    game: '',
    tournament: '',
    matchDate: '',
    homeOdds: '2.0',
    awayOdds: '2.0',
    status: 'upcoming'
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [matchesRes, teamsRes] = await Promise.all([
        fetch('/api/matches'),
        fetch('/api/teams')
      ])
      const matchesData = await matchesRes.json()
      const teamsData = await teamsRes.json()
      
      setMatches(matchesData)
      setTeams(teamsData)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = '/api/matches'
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
        alert(editingId ? 'Match modifié !' : 'Match créé !')
        setFormData({
          homeTeamId: '',
          awayTeamId: '',
          game: '',
          tournament: '',
          matchDate: '',
          homeOdds: '2.0',
          awayOdds: '2.0',
          status: 'upcoming'
        })
        setEditingId(null)
        fetchData()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'opération')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce match ?')) return

    try {
      const res = await fetch(`/api/matches?id=${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        alert('Match supprimé !')
        fetchData()
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression')
    }
  }

  const handleEdit = (match) => {
    setFormData({
      homeTeamId: match.homeTeamId.toString(),
      awayTeamId: match.awayTeamId.toString(),
      game: match.game,
      tournament: match.tournament || '',
      matchDate: new Date(match.matchDate).toISOString().slice(0, 16),
      homeOdds: match.homeOdds.toString(),
      awayOdds: match.awayOdds.toString(),
      status: match.status
    })
    setEditingId(match.id)
  }

  if (loading) return <div className="p-8 text-white">Chargement...</div>

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8"> Gestion des Matchs</h1>

      {/* Formulaire */}
      <div className="bg-gray-800 p-6 rounded-lg mb-8 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">
          {editingId ? '✏️ Modifier' : ' Créer'} un match
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Équipe domicile *</label>
              <select
                required
                value={formData.homeTeamId}
                onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="">Choisir une équipe</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.game})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Équipe extérieure *</label>
              <select
                required
                value={formData.awayTeamId}
                onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              >
                <option value="">Choisir une équipe</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.name} ({team.game})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2">Jeu *</label>
            <select
              required
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="">Choisir un jeu</option>
              <option value="League of Legends">League of Legends</option>
              <option value="CS:GO">CS:GO</option>
              <option value="Valorant">Valorant</option>
              <option value="Dota 2">Dota 2</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Tournoi</label>
            <input
              type="text"
              value={formData.tournament}
              onChange={(e) => setFormData({ ...formData, tournament: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
              placeholder="Ex: World Championship 2025"
            />
          </div>

          <div>
            <label className="block mb-2">Date et heure du match *</label>
            <input
              type="datetime-local"
              required
              value={formData.matchDate}
              onChange={(e) => setFormData({ ...formData, matchDate: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Cote équipe domicile</label>
              <input
                type="number"
                step="0.1"
                value={formData.homeOdds}
                onChange={(e) => setFormData({ ...formData, homeOdds: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>

            <div>
              <label className="block mb-2">Cote équipe extérieure</label>
              <input
                type="number"
                step="0.1"
                value={formData.awayOdds}
                onChange={(e) => setFormData({ ...formData, awayOdds: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Statut</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full p-2 bg-gray-700 rounded"
            >
              <option value="upcoming">À venir</option>
              <option value="live">En cours</option>
              <option value="finished">Terminé</option>
            </select>
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
                  setFormData({
                    homeTeamId: '',
                    awayTeamId: '',
                    game: '',
                    tournament: '',
                    matchDate: '',
                    homeOdds: '2.0',
                    awayOdds: '2.0',
                    status: 'upcoming'
                  })
                }}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Liste des matchs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4"> Liste des matchs ({matches.length})</h2>
        
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold">{match.homeTeam.name}</span>
                    <span className="text-gray-400">VS</span>
                    <span className="text-2xl font-bold">{match.awayTeam.name}</span>
                  </div>
                  
                  <p className="text-gray-400">{match.game}</p>
                  {match.tournament && <p className="text-gray-500"> {match.tournament}</p>}
                  <p className="text-gray-500"> {new Date(match.matchDate).toLocaleString('fr-FR')}</p>
                  
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm bg-blue-600 px-2 py-1 rounded">
                      {match.homeTeam.name}: {match.homeOdds}x
                    </span>
                    <span className="text-sm bg-blue-600 px-2 py-1 rounded">
                      {match.awayTeam.name}: {match.awayOdds}x
                    </span>
                    <span className="text-sm bg-purple-600 px-2 py-1 rounded">
                      {match.status === 'upcoming' ? ' À venir' : 
                       match.status === 'live' ? ' En cours' : ' Terminé'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(match)}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
                  >
                     Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
                  >
                     Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}