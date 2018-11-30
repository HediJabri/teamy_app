<template lang="html">
  <div class="card" v-if="statsEvents">
    <div class="card-body">
      <div class="card-item" v-for="(item, index) in currentTeamSport().teamStatsList" :key="index">
        <div class="tag-rounded" :class="classBackground(item.color)">
          <i v-if="item.iconCard" :class="classCardIcon(item.iconCard)" 
            class="material-icons">style</i>
          <img v-else :src="sportIconWhite()">
        </div>
        <div class="card-item-text">
          <p class="card-item-result">
            <ani-num class="ani-number" :number="totalResult(item.key)"></ani-num>
          </p>
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import AniNum from '@/components/global/AnimatedNumber'

export default {
  name: 'CardStatsScores',
  mixins: [utilities],
  components: { AniNum },
  data () {
    return {
      items: []
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'sports', 'statsEvents']),
    scoreTeam() {
      return this.statsEvents.reduce((a, b) => +a + +b.scoreTeam, 0)
    },
    scoreOpponent() {
      return this.statsEvents.reduce((a, b) => +a + +b.scoreOpponent, 0)
    },
    ratioScorePerMatch() {
      const ratio = this.scoreTeam / this.statsEvents.length
      if (Number.isNaN(ratio)) return 0
      return ratio
    },
    yellowCards () {
      let total = 0
      for (let event of this.statsEvents) {
        total += event.participations.reduce((a, b) => +a + +b[this.currentTeamSportKey()].yellowCards, 0)
      }
      return total
    },
    redCards() {
      let total = 0
      for (let event of this.statsEvents) {
        total += event.participations.reduce((a, b) => +a + +b[this.currentTeamSportKey()].redCards, 0)
      }
      return total
    }
  },
  methods: {
    totalResult(key) {
      return this[key]
    },
    classBackground (color) {
      return {
        'background-green': color === 'green',
        'background-red': color === 'red',
        'background-blue-grey': color === 'blue-grey',
        'background-grey': color === 'grey',
      }
    },
    classCardIcon (color) {
      return {
        'yellow': color === 'yellow',
        'red': color === 'red',
      }
    },
  }
}
</script>

<style lang="scss" scoped>

.card {
  @include card();
  padding: 0;
  font-size: 13px;
}

.card-body {
  @include flex-center();
  margin-top: 0px;
}

.card-item {
  width: 25%;
  height: 100px;
  p { text-align: center;  margin-bottom: 2px; }
  
}
.card-item-text { 
  margin-top: 10px;
  font-size: 12px;
  .card-item-result { font-size: 17px; font-weight: 500}
}

.tag-rounded {
  @include flex-center();
  margin: 0 auto;
  color: white;
  border-radius: 50%;
  height: 32px;
  width: 32px;
  font-size: 16px;
  text-transform: uppercase;
  i { font-size: 18px; }
  i.fa { font-size: 14px; }
  img { width: 14px; }
}
.background-green { background: $green }
.background-red { background: $red }
.background-blue-grey { background: $text-grey-blue; }
.background-grey { background: $solitude; }


</style>
