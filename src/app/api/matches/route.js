import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

// GET
export async function GET() {
  try {
    const matches = await prisma.match.findMany({
      include: {
        homeTeam: true,
        awayTeam: true
      },
      orderBy: { matchDate: 'asc' }
    })
    return NextResponse.json(matches)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST
export async function POST(request) {
  try {
    const body = await request.json()
    const { homeTeamId, awayTeamId, game, tournament, matchDate, homeOdds, awayOdds, status } = body

    if (!homeTeamId || !awayTeamId || !game || !matchDate) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const match = await prisma.match.create({
      data: {
        homeTeamId: parseInt(homeTeamId),
        awayTeamId: parseInt(awayTeamId),
        game,
        tournament,
        matchDate: new Date(matchDate),
        homeOdds: parseFloat(homeOdds) || 2.0,
        awayOdds: parseFloat(awayOdds) || 2.0,
        status: status || 'upcoming'
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json(match, { status: 201 })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// PUT
export async function PUT(request) {
  try {
    const body = await request.json()
    const { id, homeTeamId, awayTeamId, game, tournament, matchDate, homeOdds, awayOdds, status } = body

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const match = await prisma.match.update({
      where: { id: parseInt(id) },
      data: {
        ...(homeTeamId && { homeTeamId: parseInt(homeTeamId) }),
        ...(awayTeamId && { awayTeamId: parseInt(awayTeamId) }),
        ...(game && { game }),
        ...(tournament !== undefined && { tournament }),
        ...(matchDate && { matchDate: new Date(matchDate) }),
        ...(homeOdds && { homeOdds: parseFloat(homeOdds) }),
        ...(awayOdds && { awayOdds: parseFloat(awayOdds) }),
        ...(status && { status })
      },
      include: {
        homeTeam: true,
        awayTeam: true
      }
    })

    return NextResponse.json(match)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    await prisma.match.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Match supprimé' })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}