<template lang="html">
  <transition name="fade" mode="out-in">
    <div class="card-list" v-if="activities && activities.length">
      <div v-for="activity in activities" :key="activity._id">
        <card-activity :activity="activity" />
      </div>
      <div class="btn-next-page" 
        v-if="page.next >= 0 && !page.allRecordsFetched">
        <el-button type="primary"
          :loading="page.loadingNext"
          @click="goToNextPage()">
          {{$t('seeMore')}}
        </el-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'
import CardActivity from '@/components/cards/activity/CardActivity'

export default {
  name: 'CardActivityList',
  mixins: [utilities],
  props: ['activities', 'page'],
  components: { CardActivity },
  methods: {
    goToNextPage() {
      this.$emit('goToNextPage')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-next-page {
  @include flex-center();
}
</style>
