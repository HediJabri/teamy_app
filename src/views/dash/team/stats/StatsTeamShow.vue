<template lang="html">
  <div class="page-stats-team">
    <div class="page-wrapper" v-if="competitions && currentTeamSeason"
      :class="{'page-table': filterName === 'players'}">
      <div class="page-left-container">
        <card-stats-filter :competitions="competitions"
          v-on:filterChange="changeFilter($event)" />
      </div>
      <div class="page-center-container-l">
        <div v-if="statsEvents">
          <transition name="fade" mode="out-in">
            <card-stats-team v-if="filterName === 'team'" />
            <table-stats-members v-else-if="filterName === 'players'" />
          </transition>
        </div>
      </div>
    </div>
    <teamy-spinner v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import formData from '@/data/forms.js'
import ApiEvents from '@/services/ApiEvents.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'
import CardStatsFilter from '@/components/cards/stats/CardStatsFilter'
import CardStatsTeam from '@/components/cards/stats/CardStatsTeam'
import TableStatsMembers from '@/components/tables/TableStatsMembers'
import TeamySpinner from '@/components/global/TeamySpinner'

export default {
  name: 'StatsTeamShow',
  mixins: [utilities],
  components: { CardStatsFilter, CardStatsTeam, TableStatsMembers, TeamySpinner },
  data () {
    return {
      filterName: 'team',
      competitions: null,
    }
  },
  computed: {
    ...mapGetters([
      'currentUser', 'currentTeam', 'currentTeamSeason', 'sports', 
      'statsEvents', 'statsSeasonFilter', 'statsCategoryFilter', 'statsCompetitionFilter'
    ]),
  },
  methods: {
    ...mapActions(['setSeasonFilter', 'setCategoryFilter', 'setStatsEvents', 'resetStatsData', 'setReloadStats']),
    changeFilter (filterName) {
      this.filterName = filterName
    },
    resetEvents() {
      this.setStatsEvents(null)
    },
    reloadEvents() {
      this.setReloadStats(true)
      this.getTeamAllEvents()
    },
    async getTeamAllEvents () {
      try {
        const params = { 
          teamId: this.currentTeam._id, 
          seasonId: this.statsSeasonFilter ? this.statsSeasonFilter._id : 'all',
          category:  this.statsCategoryFilter ? this.statsCategoryFilter.category : 'all',
          competitionId:  this.statsCompetitionFilter ? this.statsCompetitionFilter._id : 'all',
        }
        const data = (await ApiEvents.fullIndexTeam(params)).data
        this.setStatsEvents(data.events)
        this.setReloadStats(false)
      } catch (err) {
        this.errorNotify(err)
      }     
    },
    async getCompetitions (teamId) {
      try {
        const params = { filter: 'current', page: 0, teamId }
        const data = (await ApiCompetitions.indexTeam(params)).data
        this.competitions = data.competitions
      } catch (err) {
        this.errorNotify(err)
      }     
    },
  },
  watch: {
    statsSeasonFilter() {
      this.reloadEvents()
    },
    statsCategoryFilter() {
      this.reloadEvents()
    },
    statsCompetitionFilter() {
      this.reloadEvents()
    }
  },
  created () {
    this.resetStatsData()
    this.getTeamAllEvents()
    this.getCompetitions(this.currentTeam._id)
    this.setSeasonFilter(this.currentTeamSeason)
    this.setCategoryFilter(formData.eventCategoryList[0])
  },
  destroyed () {
    this.resetStatsData()
  }
}
</script>

<style lang="scss" scoped>

.page-stats-team {
  min-height: 700px;
  .teamy-spinner {
    @include flex-center();
    margin-top: 200px;
  }
}
.page-wrapper {
  @include page-wrapper();
}
.page-center-container-l {
  @include page-center-container-l();
}
.page-left-container {
  @include page-left-container();
}

@media only screen and (max-width: 400px) {
  .page-wrapper { padding: 0 0 60px 0; }
}

@media only screen and (max-width: 719px) {
  .page-left-container, .page-center-container-l { width: 100%; }
  .page-wrapper { flex-direction: column; width: 100% }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-wrapper { 
    flex-direction: column; 
    width: 90%;
    .page-left-container, .page-center-container-l { width: 90%; }
  }
}
@media only screen and (max-width: 960px) {
  .page-wrapper.page-table {
    width: 100%;
    padding: 0 0 60px 0;
  }
}
</style>
