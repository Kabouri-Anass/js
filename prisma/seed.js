import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Début du peuplement de la base de données...')

  const team1 = await prisma.team.create({
    data: {
      name: 'T1',
      game: 'League of Legends',
      country: 'South Korea',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/T1_logo.svg/200px-T1_logo.svg.png'
    }
  })
  console.log('Équipe T1 créée')

  const team2 = await prisma.team.create({
    data: {
      name: 'G2 Esports',
      game: 'League of Legends',
      country: 'Germany',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/G2_Esports_logo.svg/200px-G2_Esports_logo.svg.png'
    }
  })
  console.log('Équipe G2 Esports créée')

  const team3 = await prisma.team.create({
    data: {
      name: 'FaZe Clan',
      game: 'CS:GO',
      country: 'USA',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Faze_Clan.svg/200px-Faze_Clan.svg.png'
    }
  })
  console.log(' Équipe FaZe Clan créée')

  const team4 = await prisma.team.create({
    data: {
      name: 'Natus Vincere',
      game: 'CS:GO',
      country: 'Ukraine',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Natus_Vincere_logo.svg/200px-Natus_Vincere_logo.svg.png'
    }
  })
  console.log(' Équipe Natus Vincere créée')

  await prisma.match.create({
    data: {
      homeTeamId: team1.id,
      awayTeamId: team2.id,
      game: 'League of Legends',
      tournament: 'World Championship 2025',
      matchDate: new Date('2025-11-15T18:00:00'),
      status: 'upcoming',
      homeOdds: 1.8,
      awayOdds: 2.1
    }
  })
  console.log(' Match T1 vs G2 créé')

  await prisma.match.create({
    data: {
      homeTeamId: team3.id,
      awayTeamId: team4.id,
      game: 'CS:GO',
      tournament: 'IEM Katowice',
      matchDate: new Date('2025-11-10T20:00:00'),
      status: 'upcoming',
      homeOdds: 2.5,
      awayOdds: 1.6
    }
  })
  console.log(' Match FaZe vs NaVi créé')

  console.log('Base de données peuplée avec succès!')
}

main()
  .catch((e) => {
    console.error('Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })