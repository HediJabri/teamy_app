import moment from 'moment'

const utilities = {
  methods: {
    // General
    routeUrl(url) {
      this.$router.push(url)
    },
    routeToProfil(user) {
      if (this.currentTeam) {
        this.$router.push(
          `/team/${this.currentTeam._id}/membership/${
            this.currentMembership(user, this.currentTeam)._id
          }`
        )
      } else {
        this.$router.push(`/home/user-show/${user._id}`)
      }
    },
    pluralizeWord(num, word) {
      let result
      num > 1 ? (result = `${word}s`) : (result = word)
      return result
    },
    capitalizeWord(word) {
      return word.charAt(0).toUpperCase() + word.slice(1)
    },
    // Icons
    classResultIcon(result) {
      return {
        'fa fa-check-circle green margin-right': result === 'win',
        'fa fa-times-circle red margin-right': result === 'lost',
        'fa fa-minus-circle grey-medium margin-right': result === 'draw'
      }
    },
    sportIcon() {
      const sportIcon = this.sports[this.currentTeam.sport].sportIcons[3]
        .blueDark
      return require(`../assets/img/${sportIcon}`)
    },
    sportIconWhite() {
      const sportIcon = this.sports[this.currentTeam.sport].sportIcons[0].white
      return require(`../assets/img/${sportIcon}`)
    },
    // Screens
    screenWidth() {
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width
      return parseInt(width)
    },
    smallDevice() {
      return this.screenWidth() < 720
    },
    mediumDevice() {
      return this.screenWidth() < 960
    },
    // Dates
    formatCurrentTime() {
      return moment()
        .locale('fr')
        .format('HH:mm')
    },
    formatCurrentDay() {
      return moment()
        .locale('fr')
        .format('dddd')
        .slice(0, 3)
    },
    formatCurrentDayMonth() {
      return moment()
        .locale('fr')
        .format('Do MMM')
    },
    formatDay(date) {
      const day = moment(date)
        .locale('fr')
        .format('dddd')
        .slice(0, 3)
      return `${day}.`
    },
    formatEventDay(date) {
      return moment(date)
        .locale('fr')
        .format('Do')
    },
    formatEventMonth(date) {
      return moment(date)
        .locale('fr')
        .format('MMM')
        .slice(0, 3)
    },
    formatDate(date) {
      return moment(date)
        .locale('fr')
        .format('ll')
    },
    formatFullDate(date) {
      return moment(date)
        .locale('fr')
        .format('dddd ll')
    },
    formatDateCreatedAt(date) {
      return moment(date)
        .locale('fr')
        .format('MMM YYYY')
    },
    formatDateFromNow(date) {
      return moment(date)
        .locale('fr')
        .fromNow()
    },
    formatResult(result) {
      if (result === 'win') return 'Victoire'
      if (result === 'draw') return 'Match Nul'
      if (result === 'lost') return 'Défaite'
    },
    // Format Age
    formatAge(user) {
      if (user.birthdate) return moment().diff(user.birthdate, 'years')
    },
    // Format formatCategoryMember
    formatMemberCategory(category) {
      if (category === 'staff') return 'Staff / Organisation'
      if (category === 'player') return 'Joueur'
    },
    formatEmail(user) {
      let userEmail
      if (user.method === 'local') userEmail = user.local.email
      if (user.method === 'facebook') userEmail = user.facebook.email
      return userEmail
    },
    formatCompetition(category) {
      if (category === 'championship') return 'Championnat'
      if (category === 'league') return 'Ligue'
      if (category === 'tournament') return 'Tournoi'
      if (category === 'cup') return 'Coupe'
    },
    // Team Status
    formatTeamLocation(team) {
      return team.locations.find(loc => loc && loc.mainLocation === true)
    },
    teamMembershipsIsFull(team) {
      return team.memberships.length >= 20
    },
    // User Status
    userHasInfos(user) {
      return user.birthdate || user.height || user.weight || user.favoriteFoot
    },
    isCurrentUser(user) {
      return user._id === this.currentUser._id
    },
    isCurrentTeam(team) {
      return this.currentTeam && team._id === this.currentTeam._id
    },
    currentTeamSport() {
      return this.sports[this.currentTeam.sport]
    },
    currentTeamSportKey() {
      return this.sports[this.currentTeam.sport].key
    },
    // Admins
    isMainAdmin(user, team) {
      if (team && team.mainAdmin)
        return user._id === team.mainAdmin._id || user._id === team.mainAdmin
    },
    isAdmin(user, team) {
      const membership = this.currentMembership(user, team)
      if (membership) return membership.role === 'admin'
    },
    // Members
    isMember(user, team) {
      let result
      const membership = user.memberships.find(
        m => m.status === 'validated' && m.team._id === team._id
      )
      membership ? (result = true) : (result = false)
      return result
    },
    isPendingMember(teamId) {
      return this.currentUser.memberships.find(
        m => m.status === 'pending' && m.team._id === teamId
      )
    },
    isPlayerMember(user, team) {
      const membership = this.currentMembership(user, team)
      if (membership) return membership.category === 'player'
    },
    isStaffMember(user, team) {
      const membership = this.currentMembership(user, team)
      if (membership) return membership.category === 'staff'
    },
    currentMembership(user, team) {
      return user.memberships.find(
        m => m.team === team._id || m.team._id === team._id
      )
    },
    currentUserMembership(user, team) {
      // Membership populate with User
      return team.memberships.find(m => m.user._id === user._id)
    },
    currentMemberCategory(user, team) {
      if (this.currentMembership(user, team))
        return this.formatMemberCategory(
          this.currentMembership(user, team).role
        )
    },
    // Event Status
    eventIsPassed(event) {
      const dateTimeNow = moment()
        .locale('fr')
        .format('YYYY/MM/DD HH:mm')
      const dateEvent = moment(event.dateStart)
        .format('YYYY/MM/DD')
        .toString()
      // Format Date Time Event
      let dateTimeEvent = new Date(`${dateEvent} ${event.time}`)
      dateTimeEvent = moment(dateTimeEvent).format('YYYY/MM/DD HH:mm')
      // Compare Dates
      if (dateTimeNow > dateTimeEvent) return true
      return false
    },
    eventIsToday(date) {
      const dateNow = moment()
        .locale('fr')
        .format('YYYY-MM-DD')
      const dateEvent = moment(date)
        .locale('fr')
        .format('YYYY-MM-DD')
        .toString()
      if (dateNow === dateEvent) return true
      return false
    },
    eventIsMatchCategory(event) {
      return ['friendly', 'competition'].includes(event.category)
    },
    // Season Status
    currentSeason(team) {
      return team.seasons.find(s => s.currentSeason === true)
    },
    // Notifications
    errorNotify(error) {
      console.log(error)
      this.$notify({
        title: 'Erreur',
        message: 'Une erreur est survenue',
        type: 'error'
      })
    },
    impossibleActionNotify(error) {
      console.log(error)
      this.$notify({
        title: 'Erreur',
        message: 'Action impossible',
        type: 'error'
      })
    },
    noAccessPageNotify(error) {
      console.log(error)
      this.$notify({
        title: 'Erreur',
        message: "Tu n'as pas accès à cette page !",
        type: 'error'
      })
      this.$router.push('/')
    }
  }
}

const guards = {
  methods: {
    // TODO Is TeamMainAdmin
    requireTeamAdmin(user, team) {
      if (!this.isMainAdmin(user, team)) this.noAccessPageNotify()
    },
    // TODO Is TeamAdmin
    requireTeamManager(user, team) {
      if (!this.isAdmin(user, team)) this.noAccessPageNotify()
    },
    // TODO Remove
    requireTeamAdminOrManager(user, team) {
      if (!this.isAdmin(user, team) && !this.isMainAdmin(user, team))
        this.noAccessPageNotify()
    },
    requireTeamMember(user, team) {
      if (!team) this.noAccessPageNotify()
      const teamMembership = user.memberships.find(
        m => m.status === 'validated' && m.team._id === team._id
      )
      if (!teamMembership) this.noAccessPageNotify()
    },
    requireTeamMemberOrParticipation(user, event) {
      const teamMembership = user.memberships.find(
        m => m.status === 'validated' && m.team._id === event.team._id
      )
      const participation = event.participations.find(p => p.user === user._id)
      if (!teamMembership && !participation) this.noAccessPageNotify()
    }
  }
}

export { guards, utilities }
