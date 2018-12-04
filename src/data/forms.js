const recurrenceDaysList = [
  { fr: 'Lun', en: 'Mon', value: 'Monday' },
  { fr: 'Mar', en: 'Tue', value: 'Tuesday' },
  { fr: 'Mer', en: 'Wed', value: 'Wednesday' },
  { fr: 'Jeu', en: 'Thu', value: 'Thursday' },
  { fr: 'Ven', en: 'Fri', value: 'Friday' },
  { fr: 'Sam', en: 'Sat', value: 'Saturday' },
  { fr: 'Dim', en: 'Sun', value: 'Sunday' }
]

const eventCategoryList = [
  { category: 'all', title: 'Tout les matchs', subtitle: 'Tout les matchs' },
  { category: 'friendly', title: 'Match Amical', subtitle: 'Matchs amicaux' },
  { category: 'competition', title: 'Compétition', subtitle: 'Compétitions' },
  { category: 'training', title: 'Entrainement', subtitle: 'Entrainements' },
  { category: 'other', title: 'Autre', subtitle: 'Autres' }
]

const competitionCategories = [
  {
    category: 'championship',
    name: 'Championnat',
    eventCategories: ['Match de Championnat', 'Finale de Championnat']
  },
  {
    category: 'league',
    name: 'Ligue',
    eventCategories: ['Match de Ligue', 'Finale de Ligue']
  },
  {
    category: 'tournament',
    name: 'Tournoi',
    eventCategories: ['Match de qualif', 'Tournoi de qualif', 'Tournoi Final']
  },
  { category: 'cup', name: 'Coupe', eventCategories: ['Match de Coupe'] }
]

const eventResults = {
  championship: [
    '1er',
    '2eme',
    '3eme',
    '4eme',
    '5eme',
    '6eme',
    '7eme',
    '8eme',
    '9eme',
    '10eme'
  ],
  tournament: [
    'Vainqueur',
    'Finaliste',
    'Demi-Finaliste',
    'Quart de Finale',
    'Huitième de Finale',
    'Phase de Poule'
  ]
}

export default {
  recurrenceDaysList,
  eventCategoryList,
  competitionCategories,
  eventResults
}
