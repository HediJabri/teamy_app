<template lang="html">
  <div class="card-list">
    <div v-if="memberships" class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="membership in memberships" :key="membership._id">
        <card-teams-list-item :team="membership.team" />
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
         <card-team-empty v-if="cardTeamEmpty" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardTeamsListItem from '@/components/cards/teams/CardTeamsListItem'
import CardTeamEmpty from '@/components/cards/teams/CardTeamEmpty'

export default {
  name: 'CardTeamsUserList',
  mixins: [utilities],
  props: ['memberships', 'cardTeamEmpty'],
  components: {
    CardTeamsListItem,
    CardTeamEmpty
  },
  computed: {
    ...mapGetters(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin-right: 0;
  margin-left: 0;
}
.col-xs-12 {
  padding-right: 0;
  padding-left: 0;
}

.card-list-empty-wrapper {
  @include flex-center();
  height: 200px;
  text-align: center;
}
</style>
