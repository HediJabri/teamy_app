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
    eventCategories: ['championshipGame', 'championshipFinal']
  },
  {
    category: 'league',
    eventCategories: ['leagueGame', 'leagueFinal']
  },
  {
    category: 'tournament',
    eventCategories: [
      'qualificationGame',
      'qualificationTournament',
      'finalTournament'
    ]
  },
  { category: 'cup', eventCategories: ['cupGame', 'cupFinal'] }
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

const timeList = [
  { en: '07:00 AM', fr: '07:00' },
  { en: '07:15 AM', fr: '07:15' },
  { en: '07:30 AM', fr: '07:30' },
  { en: '07:45 AM', fr: '07:45' },
  { en: '08:00 AM', fr: '08:00' },
  { en: '08:15 AM', fr: '08:15' },
  { en: '08:30 AM', fr: '08:30' },
  { en: '08:45 AM', fr: '08:45' },
  { en: '09:00 AM', fr: '09:00' },
  { en: '09:15 AM', fr: '09:15' },
  { en: '09:30 AM', fr: '09:30' },
  { en: '09:45 AM', fr: '09:45' },
  { en: '10:00 AM', fr: '10:00' },
  { en: '10:15 AM', fr: '10:15' },
  { en: '10:30 AM', fr: '10:30' },
  { en: '10:45 AM', fr: '10:45' },
  { en: '11:00 AM', fr: '11:00' },
  { en: '11:15 AM', fr: '11:15' },
  { en: '11:30 AM', fr: '11:30' },
  { en: '11:45 AM', fr: '11:45' },
  { en: '12:00 AM', fr: '12:00' },
  { en: '12:15 AM', fr: '12:15' },
  { en: '12:30 AM', fr: '12:30' },
  { en: '12:45 AM', fr: '12:45' },
  { en: '01:00 PM', fr: '13:00' },
  { en: '01:15 PM', fr: '13:15' },
  { en: '01:30 PM', fr: '13:30' },
  { en: '01:45 PM', fr: '13:45' },
  { en: '02:00 PM', fr: '14:00' },
  { en: '02:15 PM', fr: '14:15' },
  { en: '02:30 PM', fr: '14:30' },
  { en: '02:45 PM', fr: '14:45' },
  { en: '03:00 PM', fr: '15:00' },
  { en: '03:15 PM', fr: '15:15' },
  { en: '03:30 PM', fr: '15:30' },
  { en: '03:45 PM', fr: '15:45' },
  { en: '04:00 PM', fr: '16:00' },
  { en: '04:15 PM', fr: '16:15' },
  { en: '04:30 PM', fr: '16:30' },
  { en: '04:45 PM', fr: '16:45' },
  { en: '05:00 PM', fr: '17:00' },
  { en: '05:15 PM', fr: '17:15' },
  { en: '05:30 PM', fr: '17:30' },
  { en: '05:45 PM', fr: '17:45' },
  { en: '06:00 PM', fr: '18:00' },
  { en: '06:15 PM', fr: '18:15' },
  { en: '06:30 PM', fr: '18:30' },
  { en: '06:45 PM', fr: '18:45' },
  { en: '07:00 PM', fr: '19:00' },
  { en: '07:15 PM', fr: '19:15' },
  { en: '07:30 PM', fr: '19:30' },
  { en: '07:45 PM', fr: '19:45' },
  { en: '08:00 PM', fr: '20:00' },
  { en: '08:15 PM', fr: '20:15' },
  { en: '08:30 PM', fr: '20:30' },
  { en: '08:45 PM', fr: '20:45' },
  { en: '09:00 PM', fr: '21:00' },
  { en: '09:15 PM', fr: '21:15' },
  { en: '09:30 PM', fr: '21:30' },
  { en: '09:45 PM', fr: '21:45' },
  { en: '10:00 PM', fr: '22:00' },
  { en: '10:15 PM', fr: '22:15' },
  { en: '10:30 PM', fr: '22:30' },
  { en: '10:45 PM', fr: '22:45' },
  { en: '11:00 PM', fr: '23:00' },
  { en: '11:15 PM', fr: '23:15' },
  { en: '11:30 PM', fr: '23:30' },
  { en: '11:45 PM', fr: '23:45' }
]

export default {
  recurrenceDaysList,
  eventCategoryList,
  competitionCategories,
  eventResults,
  timeList
}
