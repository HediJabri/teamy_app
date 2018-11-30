<template lang="html">
  <div class="page-user-show">
    <transition name="fade" mode="out-in">
      <teamy-spinner :logo="true" v-if="!membership" />
      <div v-else class="page-wrapper">
        <div class="page-left-container">
          <card-user :user="membership.user" :team="membership.team"/>
        </div>
        <div class="page-center-container">
        <card-membership-info :user="membership.user" :membership="membership" />
        </div>
        <div class="page-right-container">
          <card-team :team="currentTeam" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiMemberships from '@/services/ApiMemberships.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import CardUser from '@/components/cards/users/CardUser'
import CardMembershipInfo from '@/components/cards/users/CardMembershipInfo'
// import CardUserStats from '@/components/cards/users/CardUserStats'
import CardTeam from '@/components/cards/teams/CardTeam'


export default {
  name: 'TeamMemberShow',
  components: { TeamySpinner, CardUser, CardMembershipInfo, CardTeam },
  data () {
    return {
      membership: null,
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam'])
  },
  methods: {
    async getMembership(id) {
      try {
        const membership = (await ApiMemberships.get(id)).data
        this.membership = membership
      } catch (err) {
        this.errorNotify(err)
      }     
    },
  },
  created () {
    const membershipId = this.$route.params.id
    if (membershipId) this.getMembership(membershipId)
  }
}
</script>

<style lang="scss" scoped>

.page-wrapper {
  @include page-wrapper();
}
.page-left-container {
  @include page-left-container();
}
.page-right-container {
  @include page-right-container();
}
.page-center-container {
  @include page-center-container();
}

@media only screen and (max-width: 479px) {
  .page-wrapper { flex-direction: column; padding: 0px 10px 60px 10px; }
  .page-center-container, .page-left-container { width: 100% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper { flex-direction: column }
  .page-center-container, .page-left-container { width: 90% !important; }
  .page-right-container { display: none }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-left-container { width: 33% !important; }
  .page-center-container { width: 67% !important; }
  .page-right-container { display: none }
}
</style>
