<template>
  <div class="page-team-show">
    <transition name="fade" mode="out-in">
      <div v-if="team" class="page-wrapper">
        <div class="page-left-container">
          <card-team-infos :team="team" v-on:showTeam="showTeam()" />
          <card-list>
            <h5 slot="listTitle">{{$t('members')}}</h5>
            <list-items slot="listItems" slot-scope="{}" :items="teamMembershipsValidated">
              <span class="list-item-tag" slot="itemTag" slot-scope="{item}">
                {{ item.position }}
              </span>
              <i class="fa fa-plus-circle margin-left" slot="itemButton" slot-scope="{}"></i>
            </list-items>
          </card-list>
        </div>
        <div class="page-center-container">
          <card-members-pending
            v-if="teamMembershipsPending.length && isAdmin(currentUser, team)" 
            :team="team" />
          <card-members :team="team" v-on:showMember="showMember($event)"/>
        </div>
        <div class="page-right-container">
          <transition name="fade" mode="out-in">
            <card-user-large v-if="memberShowed" :membership="memberShowed" :team="team" 
              v-on:showTeam="showTeam()"/>
            <div v-else>
              <card-team-link :team="team" v-on:openDialogShare="openDialogShareInvitation()"/>
              <card-team-large :team="team" />
            </div>
          </transition>
        </div>
        <dialog-share-invitation v-if="dialogShareInvitation" :team="team"
          v-on:closeDialog="dialogShareInvitation = false" />
      </div>
      <teamy-spinner v-else :logo="true" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { eventBus } from '@/main'
import { utilities } from '@/mixins/utilities.js'
import ApiTeams from '@/services/ApiTeams.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardTeamInfos from '@/components/cards/teams/CardTeamInfos'
import CardTeamLink from '@/components/cards/teams/CardTeamLink'
import CardTeamLarge from '@/components/cards/teams/CardTeamLarge'
import CardUserLarge from '@/components/cards/users/CardUserLarge'
import CardMembers from '@/components/cards/memberships/CardMembers'
import CardMembersPending from '@/components/cards/memberships/CardMembersPending'
import DialogShareInvitation from '@/components/dialogs/DialogShareInvitation'

import CardList from '@/components/cards/list/CardList'
import ListItems from '@/components/cards/list/ListItems'
// import ListItem from '@/components/cards/list/ListItem'

export default {
  name: 'TeamShow',
  mixins: [utilities],
  components: {
    TeamySpinner,
    CardTeamInfos,
    CardTeamLink,
    CardTeamLarge,
    CardMembers,
    CardUserLarge,
    CardMembersPending,
    DialogShareInvitation,
    CardList,
    ListItems
    // ListItem,
    // ListClickable
  },
  data() {
    return {
      teamId: null,
      team: null,
      competitions: null,
      memberShowed: null,
      dialogShareInvitation: false
    }
  },
  computed: {
    ...mapGetters(['currentTeam', 'currentUser']),
    teamMembershipsPending() {
      return this.team.memberships.filter(m => m.status === 'pending')
    },
    teamMembershipsValidated() {
      return this.team.memberships.filter(
        m => m.user && m.status === 'validated'
      )
    }
  },
  methods: {
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
            this.dialogShareInvitation = true
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
