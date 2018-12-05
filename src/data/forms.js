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
  { category: 'all', title: 'allGames' },
  { category: 'friendly', title: 'Friendly' },
  { category: 'competition', title: 'Competition' },
  { category: 'training', title: 'Training' },
  { category: 'other', title: 'Other' }
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
    { en: '1st', fr: '1er' },
    { en: '2nd', fr: '2eme' },
    { en: '3rd', fr: '3eme' },
    { en: '4th', fr: '4eme' },
    { en: '5th', fr: '5eme' },
    { en: '6th', fr: '6eme' },
    { en: '7th', fr: '7eme' },
    { en: '8th', fr: '8eme' },
    { en: '9th', fr: '9eme' },
    { en: '10th', fr: '10eme' }
  ],
  tournament: [
    { en: 'Winner', fr: 'Vainqueur' },
    { en: 'Finalist', fr: 'Finaliste' },
    { en: 'Semi-Finalist', fr: 'Demi-Finaliste' },
    { en: 'Quarter-Final', fr: 'Quart de Finale' },
    { en: 'Eighth-Final', fr: 'Huitième de Finale' },
    { en: 'Group Phase', fr: 'Phase de Poule' }
  ]
}

export default {
  recurrenceDaysList,
  eventCategoryList,
  competitionCategories,
  eventResults
}
