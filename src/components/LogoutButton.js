'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    if (!confirm('Voulez-vous vraiment vous déconnecter ?')) {
      return
    }

    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST'
      })

      if (res.ok) {
        
        router.push('/')
      } else {
        alert('Erreur lors de la déconnexion')
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la déconnexion')
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-semibold transition"
    >
       Déconnexion
    </button>
  )
}