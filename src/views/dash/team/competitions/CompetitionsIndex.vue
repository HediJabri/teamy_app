<template lang="html">
  <div class="page-competitions-index">
    <div class="page-wrapper">
      <div class="page-left-container">
        <card-competitions-filter v-on:filterChange="changeFilter($event)"/>
      </div>
      <div class="page-center-container">
        <transition name="fade" mode="out-in">
          <card-competitions-list 
            v-if="competitions" :competitions="competitions" :filter="filterName" 
            :page="page" v-on:goToNextPage="goToNextPage()" />
          <teamy-spinner v-else />
        </transition>
      </div>
      <div class="page-right-container">
        <card-team :team="currentTeam" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guards, utilities } from '@/mixins/utilities.js'
import ApiCompetitions from '@/services/ApiCompetitions.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardCompetitionsFilter from '@/components/cards/competitions/CardCompetitionsFilter'
import CardCompetitionsList from '@/components/cards/competitions/CardCompetitionsList'
import CardTeam from '@/components/cards/teams/CardTeam'

export default {
  name: 'CompetitionsIndex',
  mixins: [guards, utilities],
  components: { TeamySpinner, CardCompetitionsFilter, CardCompetitionsList, CardTeam },
  data () {
    return {
      competitions: null,
      filterName: 'current',
      page: {
        next: 0,
        loadingNext: true,
        allRecordsFetched: false
      }
    }
  },
  computed: {
    ...mapGetters(['currentTeam'])
  },
  methods: {
    changeFilter (filterName) {
      this.page.next = 0
      this.competitions = null
      this.filterName = filterName
      this.getCompetitions(filterName, this.page.next)
    },
    goToNextPage () {
      if (this.page.next >= 0) {
        this.page.loadingNext = true
        this.page.next ++
        if (this.competitions) this.getCompetitions(this.filterName, this.page.next)
      }
    },
    async getCompetitions (filterName, pageNext) {
      try {
        const params = { filter: filterName, page: pageNext, teamId: this.currentTeam._id }
        const data = (await ApiCompetitions.indexTeam(params)).data
        pageNext > 0 ?  this.competitions = this.competitions.concat(data.competitions) : this.competitions = data.competitions
        this.competitions.length >= data.competitionsCount ? this.page.allRecordsFetched = true : this.page.allRecordsFetched = false
        this.page.loadingNext = false
      } catch (err) {
        this.errorNotify(err)
        this.page.loadingNext = false
      }     
    }
  },
  created () {
    this.getCompetitions(this.filterName, this.page.next)
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
  .teamy-spinner {
    @include flex-center();
    margin-top: 100px;
  }
}

@media only screen and (max-width: 479px) {
  .page-wrapper { flex-direction: column; padding: 0px 10px 60px 10px; }
  .page-center-container, .page-left-container { width: 100% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper { flex-direction: column }
  .page-center-container, .page-left-container { width: 90% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container { width: 73% !important; }
  .page-right-container { display: none }
}

</style>
