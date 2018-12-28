<template>
  <transition name="fade" mode="out-in">
    <div class="card-list" v-if="activities && activities.length">
      <div v-for="activity in activities" :key="activity._id">
        <div class="card-infos" v-if="activity">
          <span>{{ formatDateFromNow(activity.created_at) }}</span>
        </div>
        <card-activity-wrapper :activity="activity" />
      </div>
      <div class="btn-next-page" v-if="page.next >= 0 && !page.allRecordsFetched">
        <el-button type="primary" :loading="page.loadingNext" @click="goToNextPage()">
          {{$t('seeMore')}}
        </el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import CardActivityWrapper from '@/components/cards/activity/CardActivityWrapper'
import CardActivityEvent from '@/components/cards/activity/CardActivityEvent'
import CardActivityEventRange from '@/components/cards/activity/CardActivityEventRange'
import CardActivityResult from '@/components/cards/activity/CardActivityResult'
import CardActivityCompetition from '@/components/cards/activity/CardActivityCompetition'
import CardActivityMembership from '@/components/cards/activity/CardActivityMembership'

export default {
  name: 'CardActivityList',
  mixins: [utilities],
  props: ['activities', 'page'],
  /* eslint-disable vue/no-unused-components */
  components: {
    CardActivityWrapper,
    CardActivityEvent,
    CardActivityEventRange,
    CardActivityResult,
    CardActivityCompetition,
    CardActivityMembership
  },
  methods: {
    goToNextPage() {
      this.$emit('goToNextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.card-infos {
  @include flex-space-between();
  margin: 30px 15px 10px 15px;
  color: $text-grey-blue;
  font-size: 13px;
  .card-activity-team {
    i {
      font-size: 14px;
      margin-right: 5px;
    }
    font-size: 13px;
  }
}
.btn-next-page {
  @include flex-center();
}
</style>
