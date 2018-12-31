<template>
  <base-card>
    <template slot="cardTitle">{{$t('members')}}</template>
    <buttons-membership-request slot="cardTitleButton"
      v-if="isTeamOverwiew" :team="team" :mode="'openDialog'" 
    />
    <div slot="cardBody">
      <list-users-select v-model="selectedItem" :items="teamMembershipsValidated">
        <span slot="itemTag" slot-scope="{ item }" 
          class="list-item-tag" v-if=" item.position">
          {{ item.position }}
        </span>
        <button-add-role slot="itemButton" slot-scope="{ item }"  v-if="displayAddRoleButton(item)"
           :membership="currentUserMembership(currentUser, team)" :team="team">
        </button-add-role>
      </list-users-select>
    </div>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import { eventBus } from '@/main'
import ListUsersSelect from '@/components/lists/ListUsersSelect'
import ButtonsMembershipRequest from '@/components/buttons/memberships/ButtonsMembershipRequest'
import ButtonAddRole from '@/components/buttons/memberships/ButtonAddRole'

export default {
  name: 'CardMembers',
  mixins: [utilities],
  props: ['team'],
  components: { ListUsersSelect, ButtonsMembershipRequest, ButtonAddRole },
  data() {
    return {
      selectedItem: null,
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
    }
  },
  watch: {
    selectedItem() {
      this.$emit('showMember', this.selectedItem)
    }
  },
  created() {
    eventBus.$on('resetActiveTeamMembers', () => {
      this.selectedItem = null
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
