<template lang="html">
  <div class="card-list">
    <div v-if="teams" class="row">
      <div class="col-xs-12 col-sm-6 col-md-4" v-for="team in teams" :key="team._id">
        <card-teams-list-item :team="team" />
      </div>
      <div class="btn-next-page" 
        v-if="page && page.next >= 0 && !page.allRecordsFetched">
        <el-button type="primary"
          :loading="page.loadingNext"
          @click="goToNextPage()">
          {{ $t('seeMore')}}
        </el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import CardTeamsListItem from '@/components/cards/teams/CardTeamsListItem'

export default {
  name: 'CardTeamsList',
  mixins: [utilities],
  props: ['teams', 'page'],
  components: { CardTeamsListItem },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    goToNextPage() {
      this.$emit('goToNextPage')
    }
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

.btn-next-page,
.btn-add-competition {
  @include flex-center();
}

.card-list-empty-wrapper {
  @include flex-center();
  height: 200px;
  text-align: center;
}
</style>
