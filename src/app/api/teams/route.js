import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

// GET - Récupérer toutes les équipes
export async function GET() {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(teams)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Créer une nouvelle équipe
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, game, country, logo } = body
    
    if (!name || !game) {
      return NextResponse.json({ error: 'Nom et jeu requis' }, { status: 400 })
    }

    const team = await prisma.team.create({
      data: { name, game, country, logo }
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT - Modifier une équipe
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, name, game, country, logo } = body

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const team = await prisma.team.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(game && { game }),
        ...(country !== undefined && { country }),
        ...(logo !== undefined && { logo })
      }
    })

    return NextResponse.json(team)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE - Supprimer une équipe
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await prisma.team.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Équipe supprimée' })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}