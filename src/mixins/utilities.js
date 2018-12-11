import Vue from 'vue'
import moment from 'moment'
import i18n from '../plugins/i18n'
import ElementUI from 'element-ui'
import enLang from 'element-ui/lib/locale/lang/en'
import frLang from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'

const utilities = {
  methods: {
    // General
    changeAppLocale(appLocale) {
      let lang
      if (!appLocale) appLocale = 'en'
      if (appLocale === 'en') lang = enLang
      if (appLocale === 'fr') lang = frLang
      locale.use(lang)
      i18n.locale = appLocale
      Vue.use(ElementUI)
    },
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
        .locale(i18n.locale)
        .format('HH:mm')
    },
    formatCurrentDay() {
      return moment()
        .locale(i18n.locale)
        .format('dddd')
        .slice(0, 3)
    },
    formatCurrentDayNumber() {
      return moment()
        .locale(i18n.locale)
        .format('Do')
        .slice(0, 3)
    },
    formatCurrentDayMonth() {
      return moment()
        .locale(i18n.locale)
        .format('MMM')
    },
    formatDay(date) {
      const day = moment(date)
        .locale(i18n.locale)
        .format('dddd')
        .slice(0, 3)
      return `${day}.`
    },
    formatEventDay(date) {
      return moment(date)
        .locale(i18n.locale)
        .format('Do')
    },
    formatEventMonth(date) {
      return moment(date)
        .locale(i18n.locale)
        .format('MMM')
        .slice(0, 3)
    },
    formatDate(date) {
      return moment(date)
        .locale(i18n.locale)
        .format('ll')
    },
    formatFullDate(date) {
      return moment(date)
        .locale(i18n.locale)
        .format('dddd ll')
    },
    formatDateCreatedAt(date) {
      return moment(date)
        .locale(i18n.locale)
        .format('MMM YYYY')
    },
    formatDateFromNow(date) {
      return moment(date)
        .locale(i18n.locale)
        .fromNow()
    },
    formatResult(result) {
      if (result === 'win') return this.$tc('Win', 1)
      if (result === 'draw') return this.$tc('Draw', 1)
      if (result === 'lost') return this.$tc('Lost', 1)
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
        .locale(i18n.locale)
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
        .locale(i18n.locale)
        .format('YYYY-MM-DD')
      const dateEvent = moment(date)
        .locale(i18n.locale)
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
        title: this.$t('error'),
        message: this.$t('errorOccurred'),
        type: 'error'
      })
    },
    impossibleActionNotify(error) {
      console.log(error)
      this.$notify({
        title: this.$t('error'),
        message: this.$t('impossibleAction'),
        type: 'error'
      })
    },
    noAccessPageNotify(error) {
      console.log(error)
      this.$notify({
        title: this.$t('error'),
        message: this.$t('noPageAccess'),
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
