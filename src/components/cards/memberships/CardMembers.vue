<template>
  <div class="card" v-if="team">
    <div class="card-title">
      <div class="card-title-text">
        <h5>{{$t('members')}}</h5>
      </div>
      <div class="card-title-button" v-if="isTeamOverwiew">
        <el-button type="primary" class="btn-m" 
          v-if="isPendingMember(team._id)" :loading="isLoading" @click="desactivateMembership">
          {{$t('cancelRequest')}}
          <i class="fa fa-times margin-left"></i>
        </el-button>
        <el-button type="primary" class="btn-m" v-else-if="!isMember(currentUser, team)"
          @click="openDialogMembershipRequest">
          {{$t('join')}}
          <i class="fa fa-share margin-left"></i>
        </el-button>
      </div>
    </div>
    <div class="card-body" v-if="teamMembershipsValidated">
      <div class="card-list-item"
        :class="{'active': activeMember === index}"
        v-for="(membership, index) in teamMembershipsValidated" :key="index">
        <div class="list-item-content" @click="showMember(membership, index)">
          <div class="list-item-img avatar">
            <img v-if="membership.user.avatar" :src="membership.user.avatar">
            <img v-else src="../../../assets/img/user.png" >
          </div>
          <span v-if="isMainAdmin(membership.user, team)" class="list-item-badge">
            <i class="material-icons">stars</i>
          </span>
          <div class="list-item-body">
            <p class="list-item-body-top">
              {{ membership.user.firstName }} {{ membership.user.lastName }}
              <span v-if=" membership.position" class="list-item-tag">
                {{ membership.position }}
              </span>
            </p>
          </div>
        </div>
        <el-button class="list-item-btn btn-m" type="primary" @click="openDialogEditMembership()"
        v-if="isCurrentUser(membership.user, team) && !membership.position && !isTeamOverwiew">
          <span>{{$t('addMyRole')}}<i class="fa fa-plus-circle margin-left"></i></span>
        </el-button>
      </div>
    </div>
    <dialog-edit-membership
      v-show="currentUserMembership(currentUser, team)"
      :membership="currentUserMembership(currentUser, team)"
      :team="team"
      :openDialog="dialogEditMembership"
      @closeDialog="dialogEditMembership = false"
    />
    <dialog-membership-request
      v-show="team"
      :team="team"
      :openDialog="dialogMembershipRequest"
      @closeDialog="dialogMembershipRequest = false"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import { eventBus } from '@/main'
import ApiMemberships from '@/services/ApiMemberships.js'
import DialogMembershipRequest from '@/components/dialogs/DialogMembershipRequest'
import DialogEditMembership from '@/components/dialogs/DialogEditMembership'

export default {
  name: 'CardMembers',
  mixins: [utilities],
  props: ['team'],
  components: { DialogMembershipRequest, DialogEditMembership },
  data() {
    return {
      activeMember: null,
      dialogMembershipRequest: false,
      dialogEditMembership: false,
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    isTeamOverwiew() {
      return this.$route.name === 'team-overview'
    },
    teamMembershipsValidated() {
      return this.team.memberships.filter(
        m => m.user && m.status === 'validated'
      )
    }
  },
  methods: {
    ...mapActions(['updateUserMembership']),
    openDialogMembershipRequest() {
      this.dialogMembershipRequest = true
    },
    openDialogEditMembership() {
      this.dialogEditMembership = true
    },
    showMembershipDialog(membership, index) {
      membership.openDialog = true
      this.showMember(membership, index)
    },
    showMember(membership, index) {
      this.activeMember = index
      this.$emit('showMember', membership)
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
        this.dialogVisible = false
        this.$notify({
          title: this.$t('success'),
          message: this.$t('requestCanceled'),
          type: 'success'
        })
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created() {
    eventBus.$on('resetActiveTeamMembers', () => {
      this.activeMember = null
    })
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  padding: 30px 0 10px 0;
  font-size: 13px;
}
.card-title {
  @include title-card();
  .card-title-text {
    @include flex-start();
    text-transform: uppercase;
  }
  .card-title-button {
    position: absolute;
    right: 20px;
    top: 12px;
  }
}
.card-body {
  margin-top: 22px;
}
.card-list-item {
  @include list-item-s();
  .list-item-tag {
    @include tag-flat-s();
    min-width: 30px;
  }
  .list-item-content {
    cursor: pointer;
  }
}

@media only screen and (max-width: 479px) {
  .list-item-tag {
    display: none;
  }
  .list-item-btn {
    display: none;
  }
}
</style>
