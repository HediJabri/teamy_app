<template>
  <transition name="fade" mode="out-in">
    <div v-if="team" class="page-wrapper">
      <div class="page-left-container">
        <card-team-infos :team="team" @showTeam="showTeam()" />
        <card-team-home :team="team" />
      </div>
      <div class="page-center-container">
        <card-members-pending v-if="displayPendingMembership" :team="team" />
        <card-members :team="team" @showMember="showMember($event)"/>
      </div>
      <div class="page-right-container">
        <transition name="fade" mode="out-in">
          <card-user-large v-if="memberShowed" :membership="memberShowed" :team="team" 
            @showTeam="showTeam()"/>
          <div v-else>
            <card-team-link :team="team" />
            <card-team-large :team="team" />
          </div>
        </transition>
      </div>
    </div>
    <teamy-spinner v-else :logo="true" />
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { eventBus } from '@/main'
import { utilities } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeamInfos from '@/components/cards/teams/CardTeamInfos'
import CardTeamHome from '@/components/cards/teams/CardTeamHome'
import CardTeamLink from '@/components/cards/teams/CardTeamLink'
import CardTeamLarge from '@/components/cards/teams/CardTeamLarge'
import CardUserLarge from '@/components/cards/users/CardUserLarge'
import CardMembers from '@/components/cards/memberships/CardMembers'
import CardMembersPending from '@/components/cards/memberships/CardMembersPending'

export default {
  name: 'TeamShow',
  mixins: [utilities],
  components: {
    TeamySpinner,
    CardTeamInfos,
    CardTeamHome,
    CardTeamLink,
    CardTeamLarge,
    CardMembers,
    CardUserLarge,
    CardMembersPending
  },
  data() {
    return {
      teamId: null,
      team: null,
      competitions: null,
      memberShowed: null,
      selectedItem: null
    }
  },
  computed: {
    ...mapGetters(['currentTeam', 'currentUser']),
    membershipsPending() {
      return this.team.memberships.filter(m => m.status === 'pending')
    },
    displayPendingMembership() {
      return (
        this.isAdmin(this.currentUser, this.team) &&
        this.membershipsPending.length
      )
    }
  },
  methods: {
    ...mapActions(['openDialogTeamLink']),
    async getTeam(id) {
      try {
        const team = (await ApiTeams.get(id)).data.team
        if (team) this.getTeamToken(team)
      } catch (err) {
        this.errorNotify(err)
      }
    },
    async getTeamToken(team) {
      if (this.isAdmin(this.currentUser, team)) {
        try {
          const token = (await ApiTeams.getTeamToken(team._id)).data.token
          team.token = token
          this.team = team
          if (
            this.team &&
            this.team.token &&
            this.team.memberships.length === 1 &&
            this.isMainAdmin(this.currentUser, this.team)
          ) {
            this.openDialogTeamLink(true)
          }
        } catch (err) {
          this.errorNotify(err)
          this.team = team
        }
      } else {
        this.team = team
      }
    },
    newTeamMember(member) {
      this.team.members.push(member)
    },
    showMember(event) {
      this.memberShowed = event
    },
    showTeam() {
      this.memberShowed = null
    }
  },
  watch: {
    $route() {
      const teamId = this.$route.params.id
      if (teamId) this.getTeam(teamId)
    }
  },
  created() {
    this.teamId = this.$route.params.teamId
    this.getTeam(this.teamId)
    eventBus.$on('reloadTeamShow', () => {
      this.team = null
      this.getTeam(this.teamId)
    })
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-left-container {
  @include page-left-container();
}
.page-right-container {
  @include page-right-container();
}
.page-center-container {
  @include page-center-container();
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-right-container,
  .page-left-container,
  .page-center-container {
    width: 100% !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-right-container,
  .page-left-container,
  .page-center-container {
    width: 90% !important;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-right-container,
  .page-left-container,
  .page-center-container {
    width: 80% !important;
  }
}
</style>
