<template lang="html">
  <div v-if="competitions && competitions.length">
    <transition name="fade" mode="out-in">
      <base-card>
        <template slot="cardTitle">{{$t('competitions')}}</template>
        <div slot="cardBody">
          <div class="card-list-item" 
            v-for="competition in competitions" :key="competition._id">
            <div class="list-item-body">
              <p class="list-item-body-top">{{ competition.name }}</p>
            </div>
          </div>
        </div>
      </base-card>
    </transition>
  </div>
</template>

<script>
import ApiCompetitions from '@/services/ApiCompetitions.js'

export default {
  name: 'CardTeamCompetitions',
  props: ['teamId'],
  data() {
    return {
      competitions: null
    }
  },
  methods: {
    async getCompetitions(teamId) {
      try {
        const params = { filter: 'current', page: 0, teamId }
        const data = (await ApiCompetitions.indexTeam(params)).data
        this.competitions = data.competitions.slice(0, 3)
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created() {
    this.getCompetitions(this.teamId)
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-body {
  margin-top: 32px;
}
.card-list-item {
  @include list-item-s();
  height: 35px;
  cursor: initial;
}
</style>
