<template>
  <div class="page-community">
    <div class="page-wrapper">
      <div class="page-left-container">
        <card-community-types v-on:changeFilter="changeFilter($event)"/>
      </div>
      <div class="page-center-container-l">
        <transition name="fade" mode="out-in">
          <card-teams-list v-if="teams" :teams="teams" :page="page" v-on:goToNextPage="goToNextPage()" />
          <teamy-spinner v-else-if="page.loadingTypes" class="teamy-spinner-bottom" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiTeams from '@/services/ApiTeams.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardCommunityTypes from '@/components/cards/community/CardCommunityTypes'
import CardTeamsList from '@/components/cards/teams/CardTeamsList'

export default {
  name: 'Community',
  components: {
    TeamySpinner,
    CardCommunityTypes,
    CardTeamsList
  },
  data() {
    return {
      users: null,
      teams: null,
      sport: 'all',
      zone: 'all',
      page: {
        next: 0,
        loadingTypes: true,
        loadingNext: true,
        allRecordsFetched: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    changeFilter(filter) {
      this[filter.key] = filter.name
      this.getTeams(this.sport, this.zone, 0)
    },
    goToNextPage() {
      this.page.loadingNext = true
      if (this.page.next >= 0) {
        this.page.next++
        if (this.teams) this.getTeams(this.page.next)
        if (this.users) this.getUsers(this.page.next)
      }
    },
    async getTeams(sport, zone, pageNext) {
      try {
        const params = { sport, zone, pageNext }
        const data = (await ApiTeams.index(params)).data
        pageNext > 0
          ? (this.teams = this.teams.concat(data.teams))
          : (this.teams = data.teams)
        this.teams.length >= data.teamsCount
          ? (this.page.allRecordsFetched = true)
          : (this.page.allRecordsFetched = false)
        this.page.loadingTypes = false
        this.page.loadingNext = false
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created() {
    this.getTeams(this.sport, this.zone, 0)
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
.page-center-container-l {
  @include page-center-container-l();
  .teamy-spinner {
    @include flex-center();
    height: 300px;
  }
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    flex-direction: column;
    padding: 0px 10px 60px 10px;
  }
  .page-center-container-l,
  .page-left-container {
    width: 100% !important;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-center-container-l,
  .page-left-container {
    width: 90% !important;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container-l {
    width: 67% !important;
  }
  .page-left-container {
    width: 33% !important;
  }
}
</style>
