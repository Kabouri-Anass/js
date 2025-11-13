'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ResultsPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/matches')
      const data = await res.json()
      // Filtrer les matchs terminés
      const finishedMatches = data.filter(m => m.status === 'finished')
      setMatches(finishedMatches)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  const getWinnerTeam = (match) => {
    if (!match.winnerId) return null
    return match.winnerId === match.homeTeamId ? match.homeTeam : match.awayTeam
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">⏳ Chargement des résultats...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-purple-500/30 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition">
            🎮 E-Sports Betting
          </Link>
          <nav className="flex gap-4">
            <Link href="/bets" className="hover:text-purple-400 transition">
              Paris
            </Link>
            <Link href="/results" className="text-purple-400 font-semibold">
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
          <h1 className="text-4xl font-bold mb-2"> Résultats des Matchs</h1>
          <p className="text-gray-400">Découvrez les résultats des matchs terminés</p>
        </div>

        {matches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold mb-2">Aucun résultat disponible</h2>
            <p className="text-gray-400 mb-6">Les matchs terminés apparaîtront ici !</p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/bets"
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
              >
                Voir les matchs à venir
              </Link>
              <Link 
                href="/admin/matches"
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg"
              >
                Admin Matchs
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => {
              const winner = getWinnerTeam(match)
              
              return (
                <div key={match.id} className="bg-gray-800 rounded-lg p-6 border-2 border-green-500/30">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-purple-400 mb-2">{match.game}</div>
                      {match.tournament && (
                        <div className="text-sm text-gray-500 mb-2">🏆 {match.tournament}</div>
                      )}
                      <div className="text-sm text-gray-500">
                        📅 {new Date(match.matchDate).toLocaleString('fr-FR')}
                      </div>
                    </div>
                    <span className="bg-green-600 px-3 py-1 rounded text-sm font-semibold">
                      ✅ TERMINÉ
                    </span>
                  </div>

                  {/* Résultat du match */}
                  <div className="grid grid-cols-3 gap-4 items-center mb-4">
                    {/* Équipe Domicile */}
                    <div className={`text-center p-4 rounded-lg ${match.winnerId === match.homeTeamId ? 'bg-green-600/20 border-2 border-green-500' : 'bg-gray-700/50'}`}>
                      {match.homeTeam.logo && (
                        <img 
                          src={match.homeTeam.logo} 
                          alt={match.homeTeam.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                        />
                      )}
                      <h3 className="text-xl font-bold">{match.homeTeam.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{match.homeTeam.country}</p>
                      <div className="text-4xl font-bold text-purple-400">{match.homeScore}</div>
                      {match.winnerId === match.homeTeamId && (
                        <div className="text-green-400 font-bold mt-2">🏆 VAINQUEUR</div>
                      )}
                    </div>

                    {/* Score */}
                    <div className="text-center">
                      <div className="text-6xl font-bold text-white">
                        {match.homeScore} - {match.awayScore}
                      </div>
                    </div>

                    {/* Équipe Extérieure */}
                    <div className={`text-center p-4 rounded-lg ${match.winnerId === match.awayTeamId ? 'bg-green-600/20 border-2 border-green-500' : 'bg-gray-700/50'}`}>
                      {match.awayTeam.logo && (
                        <img 
                          src={match.awayTeam.logo} 
                          alt={match.awayTeam.name}
                          className="w-16 h-16 object-contain mx-auto mb-2"
                        />
                      )}
                      <h3 className="text-xl font-bold">{match.awayTeam.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{match.awayTeam.country}</p>
                      <div className="text-4xl font-bold text-purple-400">{match.awayScore}</div>
                      {match.winnerId === match.awayTeamId && (
                        <div className="text-green-400 font-bold mt-2">🏆 VAINQUEUR</div>
                      )}
                    </div>
                  </div>

                  {/* Cotes finales */}
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-400 mb-2">Cotes du match :</div>
                    <div className="flex gap-4 justify-center">
                      <div>
                        <span className="text-white font-semibold">{match.homeTeam.name}:</span>
                        <span className="text-purple-400 ml-2">{match.homeOdds}x</span>
                      </div>
                      <div>
                        <span className="text-white font-semibold">{match.awayTeam.name}:</span>
                        <span className="text-purple-400 ml-2">{match.awayOdds}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Call to action */}
        {matches.length > 0 && (
          <div className="mt-12 text-center bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              Vérifiez si vos paris ont gagné ! 🎉
            </h3>
            <Link 
              href="/my-bets"
              className="inline-block bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition"
            >
              📊 Voir mes paris
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}