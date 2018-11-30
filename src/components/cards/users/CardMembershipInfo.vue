<template lang="html">
  <div class="card-wrapper" v-if="user">
    <div class="card">
      <div class="card-title">
        <div class="card-title-box">
          <h5>Profil</h5>
        </div>
      </div>
      <div class="card-body">
        <div v-if="membership">
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
          <p><i class="material-icons">call</i>0608985789</p>
        </div>
        <div v-else>
          <p>
            <i class="material-icons">event</i>
            Depuis {{ formatDateCreatedAt(membership.created_at) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardMembershipInfo',
  props: ['user', 'membership'],
  mixins: [utilities],
  computed: {
    isTeamMemberShowView () {
      return this.$route.name === 'team-member-show'
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 14px;
  font-weight: 500;
}
.card-title {
  @include title-card();
  padding: 10px 30px;
  h5 { text-transform: uppercase; }
}
.card-body {
  padding: 40px 20px 20px 20px;
  color: $text-grey-blue;
  font-weight: 400;
  p { display: flex; }
  span { margin-right: 5px; }
  i.fa-envelope { font-size: 14px;  margin: 2px 8px 2px 2px;}
  i.fa-shield { margin: 2px 8px 2px 2px;}
  i {
    color: $blue-grey;
    margin: 0 8px 0 0;
    font-size: 18px;
  }
}
.card-body-title {  font-weight: 500;}
.card-body-tags {
  @include flex-start();
  flex-wrap: wrap;
  margin-bottom: 22px;
  margin-left: -5px;
  text-align: left;
  span {
    @include tag-flat();
  }
}


</style>