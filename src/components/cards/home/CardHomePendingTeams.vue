<template>
  <base-card :class="'transparent'">
    <template slot="cardTitle">{{$t('pendingRequests')}}</template>
    <div slot="cardBody">
      <div class="list-item" @click="routeUrl(`/home/team/${membership.team._id}/overview`)"
        v-for="membership in memberships" :key="membership._id">
        <div class="list-item-logo">
          <div class="list-item-logo-wrapper">
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
  </base-card>
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
          title: this.$t('success'),
          message: this.$t('requestCanceled'),
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
.list-item {
  @include list-item-m();
  padding: 13px 0px;
}
.list-item-logo {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  .list-item-logo-wrapper span {
    width: 50px;
    height: 50px;
    @include flex-center();
    i {
      font-size: 30px;
      color: $blue-france;
    }
  }
}
</style>
