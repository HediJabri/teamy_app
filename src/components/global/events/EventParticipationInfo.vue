<template lang="html">
  <span v-if="event && event.participations.length" class="event-participation-info">
    <span v-if="!userParticipation && event.participations.length">
      <i class="fa fa-times-circle grey-medium"></i>
      <span v-if="!iconMode">{{$t('notSelectedForEvent')}}</span>
    </span>
    <span v-else-if="userParticipation && userParticipation.status === 'pending'">
      <i class="fa fa-exclamation-circle red"></i>
      <span v-if="!iconMode" class="red text-semi-bold">{{$t('notRespondtoInvitation')}}</span>
    </span>
    <span v-else-if="userParticipation && userParticipation.status === 'validated'">
      <i class="fa fa-check-circle green"></i>
      <span v-if="!iconMode">{{$t('youAccepted')}}<br></span>
    </span>
     <span v-else-if="userParticipation && userParticipation.status === 'refused'">
      <i class="fa fa-times-circle red"></i>
      <span v-if="!iconMode">{{$t('youDeclined')}}<br></span>
    </span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'EventParticipationInfo',
  props: ['event', 'iconMode'],
  mixins: [utilities],
  computed: {
    ...mapGetters(['currentUser']),
    userParticipation() {
      return this.event.participations.find(
        p => p.user && p.user._id === this.currentUser._id
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.event-participation-info {
  text-align: center;
  text-transform: none;
  border-bottom: none !important;
  i {
    font-size: 16px;
    margin-right: 5px;
    margin-left: 3px;
  }
}
</style>
