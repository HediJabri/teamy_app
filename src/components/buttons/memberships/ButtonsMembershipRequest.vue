<template>
  <div>
    <el-button type="primary" :class="{'btn-m': mode === 'openDialog'}" 
      v-if="isPendingMember(team._id)" :loading="isLoading" @click="desactivateMembership()">
      {{$t('cancelRequest')}}
      <i class="fa fa-times margin-left"></i>
    </el-button>
    <el-button type="primary" :class="{'btn-m': mode === 'openDialog'}" 
      v-else-if="!isMember(currentUser, team) && !teamMembershipsIsFull(team)"
      @click="createMembership()">
      {{$t('join')}}
      <i class="fa fa-share margin-left"></i>
    </el-button>
    <dialog-membership-request
      :team="team"
      :openDialog="dialogOpen"
      @closeDialog="dialogOpen = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ApiMemberships from '@/services/ApiMemberships.js'
import { utilities } from '@/mixins/utilities.js'
import DialogMembershipRequest from '@/components/dialogs/DialogMembershipRequest'

export default {
  name: 'ButtonsMembershipRequest',
  mixins: [utilities],
  props: ['mode', 'team'],
  components: {
    DialogMembershipRequest
  },
  data() {
    return {
      dialogOpen: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    ...mapActions(['updateUserMembership']),
    createMembership() {
      if (this.mode === 'openDialog') this.dialogOpen = true
      if (this.mode === 'displayForm') this.$emit('displayForm')
    },
    async desactivateMembership() {
      const params = 'removeRequest'
      const membership = this.currentUser.memberships.find(
        m => m.team && m.team._id === this.team._id
      )
      try {
        await ApiMemberships.desactivate(membership._id, params)
        membership.status = 'desactivated'
        this.updateUserMembership(membership)
        this.dialogOpen = false
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
</style>
