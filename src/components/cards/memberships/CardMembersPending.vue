<template>
  <base-card>
    <template slot="cardTitle">{{$t('pendingRequests')}}</template>
    <div slot="cardBody">
      <div class="card-list-item" v-for="membership in teamMembershipsPending" :key="membership._id">
        <div class="list-item-content">
          <div class="list-item-img avatar">
            <img v-if="membership.user.avatar" :src="membership.user.avatar">
            <img v-else src="../../../assets/img/user.png">
          </div>
          <div class="list-item-body">
            <p class="list-item-body-top">
              {{ membership.user.firstName }} {{ membership.user.lastName }}
            </p>
          </div>
        </div>
        <div class="list-item-body-right icons">
          <span class="list-item-body-icons" >
            <i class="fa fa-check-circle green" @click="validateMembership(membership)"></i>
            <i class="fa fa-times-circle red" @click="desactivateMembership(membership)"></i>
          </span>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapActions } from 'vuex'
import ApiMemberships from '@/services/ApiMemberships.js'
import { utilities } from '@/mixins/utilities.js'

export default {
  name: 'CardMemberPending',
  mixins: [utilities],
  props: ['team'],
  computed: {
    teamMembershipsPending() {
      return this.team.memberships.filter(m => m.status === 'pending')
    }
  },
  methods: {
    ...mapActions([
      'removeTeamMembership',
      'updateTeamMembership',
      'removeNotification'
    ]),
    async validateMembership(membership) {
      const membershipBody = { status: 'validated' }
      try {
        await ApiMemberships.patch(membership._id, membershipBody)
        membership.status = 'validated'
        this.updateTeamMembership(membership)
        const notification = { key: 'pendingMembers', id: membership._id }
        this.removeNotification(notification)
        this.$notify({
          title: this.$t('success'),
          message: this.$t('requestValidated'),
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
      }
    },
    async desactivateMembership(membership) {
      const params = 'refused'
      try {
        await ApiMemberships.desactivate(membership._id, params)
        membership.status = 'desactivated'
        this.updateTeamMembership(membership)
        const notification = { key: 'pendingMembers', id: membership._id }
        this.removeNotification(notification)
        this.$notify({
          title: this.$t('success'),
          message: this.$t('requestRefused'),
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
.card-list-item {
  @include list-item-s();
  cursor: default;
}
.list-item-body-right.icons {
  width: 65px;
}
.list-item-body-icons {
  width: 65px;
  margin-left: 6px;
  i {
    cursor: pointer;
    font-size: 17px;
    margin: 0 4px;
  }
}
</style>
