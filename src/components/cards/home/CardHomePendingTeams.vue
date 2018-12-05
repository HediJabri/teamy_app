<template lang="html">
  <div class="card-team">
      <div class="card-team-title">
        <div class="card-team-title-text">
          <h5>{{$t('pendingRequests')}}</h5>
        </div>
      </div>
      <div class="card-team-body">
        <div class="card-team-list-item" @click="routeUrl(`/home/team/${membership.team._id}/overview`)"
          v-for="membership in memberships" :key="membership._id">
          <div class="card-team-logo">
            <div class="logo-wrapper">
              <img v-if="membership.team.logo" :src="membership.team.logo">
              <span v-else ><i class="fa fa-shield"></i></span>
            </div>
          </div>
          <div class="list-item-body">
            <p class="list-item-body-top">{{ membership.team.name }}</p>
            <p v-if="membership.team.section" class="list-item-body-bottom">
              <span>{{ membership.team.section }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ApiMemberships from '@/services/ApiMemberships.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardHomePending',
  mixins: [utilities],
  props: ['memberships'],
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    async deleteMembership(membership) {
      try {
        await ApiMemberships.delete(membership._id, 'refused')
        this.currentUser.memberships.splice(
          this.currentUser.memberships.indexOf(membership),
          1
        )
        this.$notify({
          title: 'Succès',
          message: 'La demande à bien été annulée',
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.card-team {
  @include card();
  background-color: $ghost-white;
  box-shadow: none;
  padding: 20px 0 10px 0;
  font-size: 13px;
  width: 100%;
}
.card-team-title {
  @include title-card();
  padding: 0;
  background-color: $ghost-white;
  border: none;
  .card-team-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
}
.card-team-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  .logo-wrapper span {
    width: 50px;
    height: 50px;
    @include flex-center();
    i {
      font-size: 30px;
      color: $blue-france;
    }
  }
}
.card-team-body {
  margin-top: 22px;
}
.card-team-list-item {
  @include list-item-m();
  background: $ghost-white;
  padding: 13px 0px;
  &:hover,
  &.active {
    background: $ghost-white;
  }
}
</style>
