<template lang="html">
  <div class="page-team-show">
    <transition name="fade" mode="out-in">
      <div v-if="teamLoaded" class="page-wrapper">
        <div class="page-left-container">
          <card-team-infos :team="team" v-on:showTeam="showTeam()"/>
          <card-team-competitions v-if="teamId" :teamId="teamId" />
        </div>
        <div class="page-center-container">
          <card-members :team="team" v-on:showMember="showMember($event)"/>
        </div>
        <div class="page-right-container">
          <transition name="fade" mode="out-in">
            <card-user-large v-if="memberShowed" 
              :membership="memberShowed" :team="team"
              v-on:showTeam="showTeam()"/>
            <div v-else>
              <card-team-large :team="team" />
            </div>
          </transition>
        </div>
      </div>
      <teamy-spinner v-else :logo="true" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiTeams from '@/services/ApiTeams.js'
import { utilities } from '@/mixins/utilities.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeamInfos from '@/components/cards/teams/CardTeamInfos'
import CardTeamCompetitions from '@/components/cards/teams/CardTeamCompetitions'
import CardTeamLarge from '@/components/cards/teams/CardTeamLarge'
import CardUserLarge from '@/components/cards/users/CardUserLarge'
import CardMembers from '@/components/cards/memberships/CardMembers'

export default {
  name: 'TeamShow',
  mixins: [utilities],
  components: {
    TeamySpinner,
    CardTeamInfos,
    CardTeamCompetitions,
    CardTeamLarge,
    CardMembers,
    CardUserLarge
  },
  data() {
    return {
      teamId: null,
      team: null,
      teamLoaded: false,
      memberShowed: null
    }
  },
  computed: {
    ...mapGetters(['currentTeam', 'currentUser'])
  },
  methods: {
    async getTeam(id) {
      try {
        const team = (await ApiTeams.get(id)).data.team
        this.team = team
        this.teamLoaded = true
      } catch (err) {
        this.errorNotify(err)
      }
    },
    showMember(event) {
      this.memberShowed = event
      console.log(this.memberShowed)
    },
    showTeam() {
      this.memberShowed = null
    },
    openDialogShareInvitation() {
      this.dialogShareInvitation = true
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
