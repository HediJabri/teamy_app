<template lang="html">
  <div class="wrapper-container">
    <div class="left-container">
      <card-stats-team-results />
      <card-stats-team-scores />
      <card-stats-team-matchs />
    </div>
    <div class="right-container">
      <card-stats-top-players
        v-for="(statsItem, index) in currentTeamSport().topStatsList" 
        :statsItem="statsItem" :key="index"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardStatsTeamResults from '@/components/cards/stats/CardStatsTeamResults'
import CardStatsTeamMatchs from '@/components/cards/stats/CardStatsTeamMatchs'
import CardStatsTeamScores from '@/components/cards/stats/CardStatsTeamScores'
import CardStatsTopPlayers from '@/components/cards/stats/CardStatsTopPlayers'

export default {
  name: 'CardStatsTeam',
  mixins: [utilities],
  components: { CardStatsTeamResults, CardStatsTeamMatchs, CardStatsTeamScores, CardStatsTopPlayers },
  data () {
    return {
      events: null,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports']),
  }
}
</script>

<style lang="scss" scoped>
.wrapper-container {
  width: 100%;
  margin: 0px auto;
  padding: 0 0 60px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.left-container {
  width: 63%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.right-container {
  width: 37%;
  display: flex;
  flex-direction: column;
  margin: 0px auto;
}
.card {
  @include card();
}

@media only screen and (max-width: 960px) {
  .wrapper-container { flex-direction: column;}
  .left-container { width: 100% }
  .right-container { width: 100% }
}
</style>
