'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BetsPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [showBetForm, setShowBetForm] = useState(false)
  const [selectedBet, setSelectedBet] = useState(null)
  const [betAmount, setBetAmount] = useState('')

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches')
      const data = await res.json()
      // Filtrer uniquement les matchs à venir
      const upcomingMatches = data.filter(m => m.status === 'upcoming')
      setMatches(upcomingMatches)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  const openBetForm = (match, teamId, teamName, odds) => {
    setSelectedBet({ match, teamId, teamName, odds })
    setShowBetForm(true)
  }

  const handlePlaceBet = async (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      alert('Veuillez entrer votre nom')
      return
    }

    const amount = parseFloat(betAmount)
    if (amount <= 0) {
      alert('Montant invalide')
      return
    }

    try {
      const res = await fetch('/api/bets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName,
          matchId: selectedBet.match.id,
          teamId: selectedBet.teamId,
          amount,
          odds: selectedBet.odds,
          potentialWin: amount * selectedBet.odds
        })
      })

      if (res.ok) {
        alert(` Pari placé avec succès !\n\nVous avez parié ${amount}€ sur ${selectedBet.teamName}\nGain potentiel : ${(amount * selectedBet.odds).toFixed(2)}€`)
        setShowBetForm(false)
        setSelectedBet(null)
        setBetAmount('')
      } else {
        alert(' Erreur lors du placement du pari')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert(' Erreur lors du placement du pari')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">⏳ Chargement des matchs...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-purple-500/30 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition">
             E-Sports Betting
          </Link>
          <nav className="flex gap-4">
            <Link href="/bets" className="text-purple-400 font-semibold">
              Paris
            </Link>
            <Link href="/results" className="hover:text-purple-400 transition">
              Résultats
            </Link>
            <Link href="/my-bets" className="hover:text-purple-400 transition">
              Mes Paris
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2"> Placer un pari</h1>
          <p className="text-gray-400">Choisissez un match et pariez sur votre équipe favorite !</p>
        </div>

        {/* Formulaire nom utilisateur */}
        {!userName && (
          <div className="bg-purple-600 p-6 rounded-lg mb-8 max-w-md">
            <h2 className="text-xl font-semibold mb-4"> Entrez votre nom</h2>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full p-3 rounded bg-white text-gray-900"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setUserName(e.target.value)
                }
              }}
              onBlur={(e) => setUserName(e.target.value)}
            />
          </div>
        )}

        {userName && (
          <div className="bg-gray-800 p-4 rounded-lg mb-8 inline-block">
            <span className="text-gray-400">Connecté en tant que : </span>
            <span className="font-bold text-purple-400">{userName}</span>
            <button
              onClick={() => setUserName('')}
              className="ml-4 text-sm text-gray-500 hover:text-white"
            >
              Changer
            </button>
          </div>
        )}

        {/* Liste des matchs */}
        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Aucun match disponible</h2>
            <p className="text-gray-400">Revenez plus tard ou créez des matchs dans l'admin !</p>
            <Link 
              href="/admin/matches"
              className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
            >
              Créer un match
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-purple-400 mb-2">{match.game}</div>
                    {match.tournament && (
                      <div className="text-sm text-gray-500 mb-2"> {match.tournament}</div>
                    )}
                    <div className="text-sm text-gray-500">
                       {new Date(match.matchDate).toLocaleString('fr-FR')}
                    </div>
                  </div>
                  <span className="bg-yellow-600 px-3 py-1 rounded text-sm font-semibold">
                     À VENIR
                  </span>
                </div>

                {/* Match */}
                <div className="grid grid-cols-3 gap-4 items-center mb-6">
                  {/* Équipe Domicile */}
                  <div className="text-center">
                    {match.homeTeam.logo && (
                      <img 
                        src={match.homeTeam.logo} 
                        alt={match.homeTeam.name}
                        className="w-20 h-20 object-contain mx-auto mb-2"
                      />
                    )}
                    <h3 className="text-xl font-bold">{match.homeTeam.name}</h3>
                    <p className="text-gray-500 text-sm">{match.homeTeam.country}</p>
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400">VS</div>
                  </div>

                  {/* Équipe Extérieure */}
                  <div className="text-center">
                    {match.awayTeam.logo && (
                      <img 
                        src={match.awayTeam.logo} 
                        alt={match.awayTeam.name}
                        className="w-20 h-20 object-contain mx-auto mb-2"
                      />
                    )}
                    <h3 className="text-xl font-bold">{match.awayTeam.name}</h3>
                    <p className="text-gray-500 text-sm">{match.awayTeam.country}</p>
                  </div>
                </div>

                {/* Boutons de pari */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => openBetForm(match, match.homeTeamId, match.homeTeam.name, match.homeOdds)}
                    disabled={!userName}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition"
                  >
                    <div className="font-bold text-lg mb-1">{match.homeTeam.name}</div>
                    <div className="text-2xl font-bold">{match.homeOdds}x</div>
                  </button>

                  <button
                    onClick={() => openBetForm(match, match.awayTeamId, match.awayTeam.name, match.awayOdds)}
                    disabled={!userName}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed p-4 rounded-lg transition"
                  >
                    <div className="font-bold text-lg mb-1">{match.awayTeam.name}</div>
                    <div className="text-2xl font-bold">{match.awayOdds}x</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Pari */}
      {showBetForm && selectedBet && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">$ Placer un pari</h2>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <div className="text-sm text-gray-400 mb-2">Vous pariez sur :</div>
              <div className="text-xl font-bold text-purple-400">{selectedBet.teamName}</div>
              <div className="text-sm text-gray-400 mt-2">
                {selectedBet.match.homeTeam.name} vs {selectedBet.match.awayTeam.name}
              </div>
              <div className="text-2xl font-bold mt-2">Cote : {selectedBet.odds}x</div>
            </div>

            <form onSubmit={handlePlaceBet}>
              <div className="mb-6">
                <label className="block mb-2 font-semibold">Montant à parier (€)</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  className="w-full p-3 bg-gray-700 rounded-lg text-lg"
                  placeholder="10"
                />
              </div>

              {betAmount > 0 && (
                <div className="bg-green-600/20 border border-green-600 p-4 rounded-lg mb-6">
                  <div className="text-sm text-gray-400">Gain potentiel :</div>
                  <div className="text-3xl font-bold text-green-400">
                    {(betAmount * selectedBet.odds).toFixed(2)} €
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg"
                >
                   Confirmer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowBetForm(false)
                    setSelectedBet(null)
                    setBetAmount('')
                  }}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 py-3 rounded-lg font-bold"
                >
                   Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}