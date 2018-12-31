<template>
  <base-card>
    <template slot="cardTitle">{{$t('pendingRequests')}}</template>
    <div slot="cardBody">
      <list-users :items="teamMembershipsPending">
         <div  slot="itemButton" class="item-icons">
          <span class="item-icons-wrapper">
            <i class="fa fa-check-circle green" @click="validateMembership(membership)"></i>
            <i class="fa fa-times-circle red" @click="desactivateMembership(membership)"></i>
          </span>
        </div>
      </list-users>
    </div>
  </base-card>
</template>

<script>
import { mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiMemberships from '@/services/ApiMemberships.js'
import ListUsers from '@/components/lists/ListUsers'

export default {
  name: 'CardMemberPending',
  mixins: [utilities],
  props: ['team'],
  components: {
    ListUsers
  },
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
.item-icons {
  width: 65px;
}
.item-icons-wrapper {
  width: 65px;
  margin-left: 6px;
  i {
    cursor: pointer;
    font-size: 17px;
    margin: 0 4px;
  }
}
</style>
