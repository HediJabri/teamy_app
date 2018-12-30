<template>
  <base-card v-if="user">
    <template slot="cardTitle">{{$t('profile')}}</template>
    <div slot="cardBody" class="card-body-item">
      <div  v-if="membership">
        <p>
          <i class="fa fa-shield"></i>
          <span>{{ membership.team.name }}</span> 
        </p>
        <p>
          <i class="material-icons">account_circle</i>
          <span>{{ formatMemberCategory(membership.category) }} - </span>
          <span>{{ membership.position }}</span> 
        </p>
      </div>
      <div v-if="isTeamMemberShowView">
        <p><i class="fa fa-envelope"></i>{{ formatEmail(user) }}</p>
        <p><i class="material-icons">call</i>{{ user.phone }}</p>
      </div>
      <div v-else>
        <p>
          <i class="material-icons">event</i>
          {{$t('since')}} {{ formatDateCreatedAt(membership.created_at) }}
        </p>
      </div>
    </div>
  </base-card>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardMembershipInfo',
  props: ['user', 'membership'],
  mixins: [utilities],
  computed: {
    isTeamMemberShowView() {
      return this.$route.name === 'team-member-show'
    }
  }
}
</script>

<style lang="scss" scoped>
.card-body-item {
  padding: 15px 20px;
  color: $text-grey-blue;
  font-weight: 400;
  p {
    display: flex;
  }
  span {
    margin-right: 5px;
  }
  i.fa-envelope {
    font-size: 14px;
    margin: 2px 8px 2px 2px;
  }
  i.fa-shield {
    margin: 2px 8px 2px 2px;
  }
  i {
    color: $blue-grey;
    margin: 0 8px 0 0;
    font-size: 18px;
  }
}
</style>
