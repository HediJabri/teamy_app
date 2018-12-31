<template lang="html">
  <div>
    <transition name="fade" mode="out-in">
      <router-view v-if="teamLoaded"></router-view>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities, guards } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import ApiParticipations from '@/services/ApiParticipations.js'

export default {
  name: 'TeamLayout',
  mixins: [utilities, guards],
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'teamLoaded', 'notifsLoaded']),
    teamDataLoaded() {
      if (this.teamLoaded && this.notifsLoaded) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions(['initTeam', 'initNotifications']),
    async teamInit(teamId) {
      try {
        const team = (await ApiTeams.get(teamId)).data.team
        if (team) {
          this.requireTeamMember(this.currentUser, team)
          this.initTeam(team)
          this.notifInit()
        }
      } catch (err) {
        this.errorNotify(err)
        this.$router.push('/')
      }
    },
    async notifInit() {
      try {
        let notifications = {}
        notifications.pendingMembers = this.currentTeam.memberships.filter(
          m => m.status === 'pending'
        )
        const data = (await ApiParticipations.indexUserPending(
          this.currentTeam._id,
          this.currentUser._id
        )).data
        notifications.pendingParticipations = data.pendingParticipations
        this.initNotifications(notifications)
      } catch (err) {
        this.errorNotify(err)
        this.$router.push('/')
      }
    }
  },
  created() {
    const teamId = this.$route.params.teamId
    this.teamInit(teamId)
  }
}
</script>
