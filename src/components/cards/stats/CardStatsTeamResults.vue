<template>
  <base-card :class="'fixed-l'" v-if="statsEvents">
    <template slot="cardTitle">
      {{$t('season')}} {{ statsSeasonFilter.name }}
    </template>
    <template slot="cardSubTitle">
      <span v-if="statsCompetitionFilter">{{ statsCompetitionFilter.name }}</span>
      <span v-else>{{ $tc(statsCategoryFilter.title, 2) }}</span>
    </template>
    <div slot="cardBody" class="cart-body-wrapper">
      <div class="row">
        <div class="col-xs-7">
          <div v-if="!statsReloading">
            <chart-results-rate :winResult="winResult" :drawResult="drawResult" :lostResult="lostResult"/>
          </div>
        </div>
        <div class="col-xs-5">
          <h5><ani-num class="ani-number" :number="allEvents"></ani-num> {{ $tc('Game', allEvents) }}</h5>
          <p class="green">
            <ani-num class="ani-number" :number="winResult"></ani-num> 
            {{ $tc('Win', winResult) }} <i class="fa fa-check-circle"></i>
          </p>
          <p class="red">
            <ani-num class="ani-number" :number="lostResult"></ani-num> 
            {{ $tc('Lost', lostResult) }} <i class="fa fa-times-circle"></i>
          </p>
          <p class="text-blue-grey">
            <ani-num class="ani-number" :number="drawResult"></ani-num> 
            {{ $tc('Draw', drawResult) }} <i class="fa fa-minus-circle"></i>
          </p>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import AniNum from '@/components/global/AnimatedNumber'
import ChartResultsRate from '@/components/charts/ChartResultsRate'

export default {
  name: 'CardStatsTeamResults',
  mixins: [utilities],
  components: { AniNum, ChartResultsRate },
  computed: {
    ...mapGetters([
      'statsEvents',
      'statsSeasonFilter',
      'statsCategoryFilter',
      'statsCompetitionFilter',
      'statsReloading'
    ]),
    allEvents() {
      return this.statsEvents.filter(e => e.result).length
    },
    winResult() {
      return this.statsEvents.filter(e => e.result === 'win').length
    },
    drawResult() {
      return this.statsEvents.filter(e => e.result === 'draw').length
    },
    lostResult() {
      return this.statsEvents.filter(e => e.result === 'lost').length
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-body-wrapper {
  padding-top: 18px;
  h5 {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  h5 .ani-number {
    font-size: 18px;
  }
  p {
    font-weight: 400;
    margin-bottom: 4px;
    font-size: 13px;
  }
  .ani-number {
    width: 28px;
    font-size: 15px;
    font-weight: 600;
  }
  i {
    margin-left: 2px;
  }
}

@media only screen and (max-width: 400px) {
  .col-xs-7,
  .col-xs-5 {
    width: 90% !important;
  }
}

@media only screen and (max-width: 480px) {
  .card {
    height: 330px;
  }
  .card-title-text span {
    display: none;
  }
  .card-body {
    .row {
      @include flex-center();
      flex-direction: column;
    }
    .col-xs-7,
    .col-xs-5 {
      width: 70%;
    }
    h5,
    p {
      text-align: center;
    }
  }
}
</style>
