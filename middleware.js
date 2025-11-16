import { NextResponse } from 'next/server'

// Fonction middleware avec export par défaut
export default function middleware(request) {
  const { pathname } = request.nextUrl

  // Vérifier si c'est une route admin (sauf la page de login)
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    // Récupérer le cookie d'authentification
    const authCookie = request.cookies.get('admin-auth')

    // Si pas de cookie ou cookie invalide, rediriger vers login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/admin', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Si tout est OK, continuer normalement
  return NextResponse.next()
}

// Configuration : Sur quelles routes le middleware s'applique
export const config = {
  matcher: [
    '/admin/:path*',  // Toutes les routes commençant par /admin
  ]
}