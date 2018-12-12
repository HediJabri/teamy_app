<template lang="html">
  <div class="card" v-if="topPlayers">
    <div class="card-title">
      <div class="card-title-text">
        <h5>{{ $t(statsItem.title) }}</h5>
        <span v-if="statsItem.subtitle">({{ statsItem.subtitle }})</span>
      </div>
    </div>
    <div class="card-body">
      <div class="card-list-item" v-for="(user, index) in topPlayers" 
        :class="{ 'active': isCurrentUser(user) }" :key="index">
        <div class="list-item-content" v-if="user">
          <div class="list-item-img avatar">
            <img v-if="user.avatar" :src="user.avatar">
            <img v-else src="../../../assets/img/user.png">
          </div>
          <div class="list-item-body">
            <p class="list-item-body-top">
              {{ user.firstName }}
              {{ user.lastName[0] }}.
            </p>
          </div>
        </div>
        <span>{{ user[statsItem.key] }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiParticipations from '@/services/ApiParticipations.js'

export default {
  name: 'CardStatsTopPlayers',
  mixins: [utilities],
  props: ['statsItem'],
  data() {
    return {
      topPlayers: null,
      participations: null
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentTeam',
      'sports',
      'statsSeasonFilter',
      'statsCategoryFilter',
      'statsCompetitionFilter',
      'statsReloading'
    ])
  },
  methods: {
    async getTeamParticipations() {
      try {
        const params = {
          teamId: this.currentTeam._id,
          seasonId: this.statsSeasonFilter ? this.statsSeasonFilter._id : 'all',
          category: this.statsCategoryFilter
            ? this.statsCategoryFilter.category
            : 'all',
          competitionId: this.statsCompetitionFilter
            ? this.statsCompetitionFilter._id
            : 'all'
        }
        const data = (await ApiParticipations.indexTeam(params)).data
        this.participations = data.participations
        this.topPlayers = this.groupByUser(this.participations)
      } catch (err) {
        this.errorNotify(err)
        this.$router.push('/')
      }
    },
    groupByUser(participations) {
      let topPlayers = []
      for (let participation of participations) {
        const userFinded = topPlayers.find(
          u => u && u._id === participation.user._id
        )
        if (userFinded) {
          userFinded.participations.push(participation)
          // Ex: Increment participation.football.goals
          userFinded[this.statsItem.key] +=
            participation[this.currentTeamSportKey()][this.statsItem.key]
        } else {
          let user = Object.assign(
            {},
            participation.user,
            { participations: [participation] },
            {
              'this.statsItem.key':
                participation[this.currentTeamSportKey()][this.statsItem.key]
            }
          )
          user[this.statsItem.key] =
            participation[this.currentTeamSportKey()][this.statsItem.key]
          topPlayers.push(user)
        }
      }
      topPlayers = _.sortBy(topPlayers, [this.statsItem.key])
      return _.reverse(topPlayers).slice(0, 3)
    }
  },
  watch: {
    statsReloading(boolean) {
      if (boolean === true) this.getTeamParticipations()
    }
  },
  created() {
    this.getTeamParticipations()
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0 !important;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    h5 {
      text-transform: uppercase;
      margin-right: 8px;
    }
    span {
      color: $text-grey-blue;
      font-size: 12px;
    }
  }
}
.card-body {
  margin-top: 22px;
}
.card-list-item {
  @include list-item-s();
  span {
    @include tag-flat-s();
    min-width: 30px;
  }
  cursor: initial;
}
</style>
