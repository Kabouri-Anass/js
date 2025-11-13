'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function MyBetsPage() {
  const [bets, setBets] = useState([])
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [searched, setSearched] = useState(false)

  const fetchMyBets = async () => {
    if (!userName.trim()) {
      alert('Veuillez entrer votre nom')
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch(`/api/bets?userName=${encodeURIComponent(userName)}`)
      const data = await res.json()
      setBets(data)
      setLoading(false)
    } catch (error) {
      console.error('Erreur:', error)
      setLoading(false)
    }
  }

  const calculateStats = () => {
    const totalBets = bets.length
    const totalStaked = bets.reduce((sum, bet) => sum + bet.amount, 0)
    const wonBets = bets.filter(b => b.status === 'won')
    const totalWon = wonBets.reduce((sum, bet) => sum + bet.potentialWin, 0)
    const lostBets = bets.filter(b => b.status === 'lost')
    const totalLost = lostBets.reduce((sum, bet) => sum + bet.amount, 0)
    const pendingBets = bets.filter(b => b.status === 'pending')
    const profit = totalWon - totalLost

    return {
      totalBets,
      totalStaked,
      wonBets: wonBets.length,
      lostBets: lostBets.length,
      pendingBets: pendingBets.length,
      totalWon,
      totalLost,
      profit
    }
  }

  const stats = searched ? calculateStats() : null

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-purple-500/30 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-purple-400 transition">
             E-Sports Betting
          </Link>
          <nav className="flex gap-4">
            <Link href="/bets" className="hover:text-purple-400 transition">
              Paris
            </Link>
            <Link href="/results" className="hover:text-purple-400 transition">
              Résultats
            </Link>
            <Link href="/my-bets" className="text-purple-400 font-semibold">
              Mes Paris
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2"> Mes Paris</h1>
          <p className="text-gray-400">Suivez tous vos paris et vos gains !</p>
        </div>

        {/* Formulaire de recherche */}
        <div className="bg-gray-800 p-6 rounded-lg mb-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4"> Rechercher mes paris</h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Votre nom"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  fetchMyBets()
                }
              }}
              className="flex-1 p-3 rounded bg-gray-700"
            />
            <button
              onClick={fetchMyBets}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded font-semibold"
            >
              🔍 Rechercher
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="text-2xl"> Chargement...</div>
          </div>
        )}

        {!loading && searched && bets.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold mb-2">Aucun pari trouvé</h2>
            <p className="text-gray-400 mb-6">Vous n'avez pas encore placé de paris !</p>
            <Link 
              href="/bets"
              className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
            >
              Placer mon premier pari
            </Link>
          </div>
        )}

        {!loading && searched && bets.length > 0 && stats && (
          <>
            {/* Statistiques */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg border border-purple-500/20">
                <div className="text-gray-400 mb-2">Total Paris</div>
                <div className="text-3xl font-bold text-purple-400">{stats.totalBets}</div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-green-500/20">
                <div className="text-gray-400 mb-2">Paris Gagnés</div>
                <div className="text-3xl font-bold text-green-400">{stats.wonBets}</div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-red-500/20">
                <div className="text-gray-400 mb-2">Paris Perdus</div>
                <div className="text-3xl font-bold text-red-400">{stats.lostBets}</div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg border border-yellow-500/20">
                <div className="text-gray-400 mb-2">En Attente</div>
                <div className="text-3xl font-bold text-yellow-400">{stats.pendingBets}</div>
              </div>
            </div>

            {/* Bilan financier */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-gray-400 mb-2">Montant Total Parié</div>
                <div className="text-2xl font-bold">{stats.totalStaked.toFixed(2)} €</div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <div className="text-gray-400 mb-2">Total Gains</div>
                <div className="text-2xl font-bold text-green-400">
                  +{stats.totalWon.toFixed(2)} €
                </div>
              </div>

              <div className={`bg-gray-800 p-6 rounded-lg border-2 ${stats.profit >= 0 ? 'border-green-500' : 'border-red-500'}`}>
                <div className="text-gray-400 mb-2">Profit/Perte</div>
                <div className={`text-3xl font-bold ${stats.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stats.profit >= 0 ? '+' : ''}{stats.profit.toFixed(2)} €
                </div>
              </div>
            </div>

            {/* Liste des paris */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">📋 Historique des paris</h2>
              <div className="space-y-4">
                {bets.map((bet) => (
                  <div key={bet.id} className="bg-gray-800 p-6 rounded-lg border border-purple-500/20">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">
                          {new Date(bet.createdAt).toLocaleString('fr-FR')}
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {bet.match.homeTeam.name} vs {bet.match.awayTeam.name}
                        </h3>
                        <div className="text-purple-400">{bet.match.game}</div>
                      </div>
                      
                      <div className="text-right">
                        {bet.status === 'pending' && (
                          <span className="bg-yellow-600 px-3 py-1 rounded text-sm font-semibold">
                             En attente
                          </span>
                        )}
                        {bet.status === 'won' && (
                          <span className="bg-green-600 px-3 py-1 rounded text-sm font-semibold">
                            ✅ Gagné
                          </span>
                        )}
                        {bet.status === 'lost' && (
                          <span className="bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                            ❌ Perdu
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-gray-400 text-sm mb-1">Pari sur</div>
                          <div className="font-bold text-lg">{bet.team.name}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm mb-1">Mise</div>
                          <div className="font-bold text-lg">{bet.amount.toFixed(2)} €</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm mb-1">
                            {bet.status === 'won' ? 'Gain' : 'Gain potentiel'}
                          </div>
                          <div className={`font-bold text-lg ${bet.status === 'won' ? 'text-green-400' : ''}`}>
                            {bet.potentialWin.toFixed(2)} € (x{bet.odds})
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}