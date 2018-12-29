<template>
    <base-card>
    <template slot="cardTitle">{{$t('members')}}</template>
    <buttons-membership-request slot="cardTitleButton"
      v-if="isTeamOverwiew" :team="team" :mode="'openDialog'" 
    />
    <div slot="cardBody">
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
        <button-add-role class="list-item-btn"
          v-if="displayAddRoleButton(membership)"
          :membership="currentUserMembership(currentUser, team)" :team="team">
        </button-add-role>
      </div>
    </div>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import { eventBus } from '@/main'
import ButtonsMembershipRequest from '@/components/buttons/memberships/ButtonsMembershipRequest'
import ButtonAddRole from '@/components/buttons/memberships/ButtonAddRole'

export default {
  name: 'CardMembers',
  mixins: [utilities],
  props: ['team'],
  components: { ButtonsMembershipRequest, ButtonAddRole },
  data() {
    return {
      activeMember: null,
      dialogMembershipRequest: false
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
    displayAddRoleButton(membership) {
      return (
        this.isCurrentUser(membership.user, this.team) &&
        !membership.position &&
        !this.isTeamOverwiew
      )
    },
    showMembershipDialog(membership, index) {
      membership.openDialog = true
      this.showMember(membership, index)
    },
    showMember(membership, index) {
      this.activeMember = index
      this.$emit('showMember', membership)
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
