import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma.js'

// GET - Récupérer tous les paris
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const userName = searchParams.get('userName')

    const where = userName ? { userName } : {}

    const bets = await prisma.bet.findMany({
      where,
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        },
        team: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(bets)
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// POST - Créer un pari
export async function POST(request) {
  try {
    const body = await request.json()
    const { userName, matchId, teamId, amount, odds, potentialWin } = body

    if (!userName || !matchId || !teamId || !amount) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    const bet = await prisma.bet.create({
      data: {
        userName,
        matchId: parseInt(matchId),
        teamId: parseInt(teamId),
        amount: parseFloat(amount),
        odds: parseFloat(odds),
        potentialWin: parseFloat(potentialWin),
        status: 'pending'
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        },
        team: true
      }
    })

    return NextResponse.json(bet, { status: 201 })
  } catch (error) {
    console.error('Erreur:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}