import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Début du peuplement de la base de données...')

  // Supprimer les anciennes données
  await prisma.bet.deleteMany()
  await prisma.match.deleteMany()
  await prisma.team.deleteMany()
  console.log('🗑️ Anciennes données supprimées')

  // Créer les équipes de football
  const realMadrid = await prisma.team.create({
    data: {
      name: 'Real Madrid',
      game: 'Football',
      country: 'Spain',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg'
    }
  })
  console.log('✅ Équipe Real Madrid créée')

  const barcelona = await prisma.team.create({
    data: {
      name: 'FC Barcelona',
      game: 'Football',
      country: 'Spain',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg'
    }
  })
  console.log('✅ Équipe FC Barcelona créée')

  const manchesterCity = await prisma.team.create({
    data: {
      name: 'Manchester City',
      game: 'Football',
      country: 'England',
      logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg'
    }
  })
  console.log('✅ Équipe Manchester City créée')

  const sevilla = await prisma.team.create({
    data: {
      name: 'Sevilla FC',
      game: 'Football',
      country: 'Spain',
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg'
    }
  })
  console.log('✅ Équipe Sevilla FC créée')

    const rajaCasablanca = await prisma.team.create({
    data: {
    name: 'RCA ',
      game: 'Football',
      country: 'Morocco',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/0/0a/RajaClubAthleticCasablanca.svg'
    }
  })
  console.log('✅ Équipe RCA (Raja Casablanca) créée')

     const wydad = await prisma.team.create({
  data: {
    name: 'WAC ',
      game: 'Football',
      country: 'Morocco',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Wydad_Athletic_Club_logo.svg'
    }
  })
  console.log('✅ Équipe WAC (Wydad Casablanca) créée')

  const psg = await prisma.team.create({
    data: {
      name: 'Paris Saint-Germain',
      game: 'Football',
      country: 'France',
      logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg'
    }
  })
  console.log('✅ Équipe Paris Saint-Germain créée')

  const monaco = await prisma.team.create({
    data: {
      name: 'AS Monaco',
      game: 'Football',
      country: 'France',
      logo: 'https://upload.wikimedia.org/wikipedia/fr/5/58/Logo_AS_Monaco_FC_-_2021.svg'
    }
  })
  console.log('✅ Équipe AS Monaco créée')

  const nantes = await prisma.team.create({
    data: {
      name: 'FC Nantes',
      game: 'Football',
      country: 'France',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Logo_FC_Nantes_%28avec_fond%29_-_2019.svg'
    }
  })
  console.log('✅ Équipe FC Nantes créée')

  // Créer des matchs
  await prisma.match.create({
    data: {
      homeTeamId: realMadrid.id,
      awayTeamId: barcelona.id,
      game: 'Football',
      tournament: 'La Liga',
      matchDate: new Date('2025-11-20T21:00:00'),
      status: 'upcoming',
      homeOdds: 2.1,
      awayOdds: 3.2
    }
  })
  console.log('✅ Match Real Madrid vs Barcelona créé')

  await prisma.match.create({
    data: {
      homeTeamId: psg.id,
      awayTeamId: monaco.id,
      game: 'Football',
      tournament: 'Ligue 1',
      matchDate: new Date('2025-11-18T20:00:00'),
      status: 'upcoming',
      homeOdds: 1.5,
      awayOdds: 4.0
    }
  })
  console.log('✅ Match PSG vs Monaco créé')

  await prisma.match.create({
    data: {
      homeTeamId: rajaCasablanca.id,
      awayTeamId: wydad.id,
      game: 'Football',
      tournament: 'Botola Pro',
      matchDate: new Date('2025-11-16T19:00:00'),
      status: 'upcoming',
      homeOdds: 2.8,
      awayOdds: 2.5
    }
  })
  console.log('✅ Match RCA vs WAC créé')

  await prisma.match.create({
    data: {
      homeTeamId: manchesterCity.id,
      awayTeamId: sevilla.id,
      game: 'Football',
      tournament: 'Champions League',
      matchDate: new Date('2025-11-22T21:00:00'),
      status: 'upcoming',
      homeOdds: 1.8,
      awayOdds: 3.5
    }
  })
  console.log('✅ Match Manchester City vs Sevilla créé')

  console.log('✅ Base de données peuplée avec succès!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })