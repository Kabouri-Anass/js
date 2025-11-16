import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-purple-500/30">
        <h1 className="text-3xl font-bold text-white"> E-Sports Betting</h1>
        <nav className="flex gap-4">
          <Link href="/bets" className="text-white hover:text-purple-400 transition">
            Paris
          </Link>
          <Link href="/results" className="text-white hover:text-purple-400 transition">
            Résultats
          </Link>
          <Link href="/admin/teams" className="text-white hover:text-purple-400 transition">
            Admin
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-6">
            Pariez sur vos équipes
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              de football préférées
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            La plateforme révolutionnaire de paris e-sportifs. 
            Pariez sur les meilleurs matchs de football : La Liga, Ligue 1, Champions League et plus encore !
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/bets"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
            >
               Commencer à parier
            </Link>
            <Link 
              href="/results"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
            >
              📊 Voir les résultats
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-2xl font-bold text-white mb-4">Tous les jeux</h3>
            <p className="text-gray-400">
              Paris sur La Liga, Premier League, Ligue 1, Botola Pro et tous les championnats de football
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-4">En temps réel</h3>
            <p className="text-gray-400">
              Suivez les matchs en direct et placez vos paris en temps réel
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20">
            <div className="text-4xl mb-4">$</div>
            <h3 className="text-2xl font-bold text-white mb-4">Meilleures cotes</h3>
            <p className="text-gray-400">
              Les cotes les plus compétitives du marché pour maximiser vos gains
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">100+</div>
            <div className="text-gray-400">Matchs par mois</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
            <div className="text-gray-400">Équipes pro</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-gray-400">Parieurs actifs</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-gray-400">Support client</div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="mt-20 text-center bg-gradient-to-r from-purple-600 to-pink-600 p-12 rounded-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Prêt à rejoindre l'aventure ?
          </h3>
          <p className="text-xl text-white/90 mb-6">
            Commencez à parier dès maintenant et gagnez gros !
          </p>
          <Link 
            href="/bets"
            className="inline-block bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg text-lg transition transform hover:scale-105"
          >
             Faire mon premier pari
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-500/30 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 E-Sports Betting - La plateforme de paris e-sportifs</p>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="/admin/teams" className="hover:text-purple-400 transition">
              Admin Équipes
            </Link>
            <Link href="/admin/matches" className="hover:text-purple-400 transition">
              Admin Matchs
            </Link>
            <Link href="/api/teams" className="hover:text-purple-400 transition">
              API Teams
            </Link>
            <Link href="/api/matches" className="hover:text-purple-400 transition">
              API Matches
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}