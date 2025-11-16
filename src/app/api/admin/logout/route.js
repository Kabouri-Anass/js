import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    
    // Supprimer le cookie d'authentification
    cookieStore.delete('admin-auth')

    return NextResponse.json({ 
      success: true,
      message: 'Déconnexion réussie' 
    })

  } catch (error) {
    console.error('Erreur logout:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}