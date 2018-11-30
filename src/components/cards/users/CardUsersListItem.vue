<template lang="html">
<div class="card-users-list-item">
  <div class="card-list-item" v-if="user" @click="openDialogShowUser()">
    <div class="card-list-item-avatar">
      <img v-if="user.avatar" :src="user.avatar">
      <img v-else src="../../../assets/img/user.png">
    </div>
    <h4 class="card-list-item-name">
      {{ user.firstName }}
      {{ user.lastName }}
    </h4>
    <h5>
      Joueur
    </h5>
    <h5 v-if="userMemberships" class="card-list-item-team">
      {{ userMemberships.team.name }}
    </h5>
    <h5 v-else class="card-list-item-team">Joueur libre</h5>
  </div>
  <dialog-show-user
    v-show="user"
    :user="user"
    :openDialog="dialogShowUser"
    @closeDialog="dialogShowUser = false" />
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import TagPosition from '@/components/global/TagPosition'
import DialogShowUser from '@/components/dialogs/DialogShowUser'

export default {
  name: 'CardUsersListItem',
  props: ['user'],
  mixins: [utilities],
  components: { TagPosition, DialogShowUser },
  data () {
    return {
      dialogShowUser: false,
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    userMemberships () {
      return this.user.memberships.find(m => m.status === 'validated')
    },
    isUserEditView () {
      return this.$route.name === 'user-edit'
    }
  },
  methods: {
    isCurrentUser (userId) {
      return userId === this.currentUser._id
    },
    openDialogShowUser () {
      this.dialogShowUser = true
    },
  }
}
</script>

<style lang="scss" scoped>

.card-list-item {
  @include card();
  padding: 30px 20px 20px 20px;
  text-align: center;
  cursor: pointer;
  transition: all .3s ease;
  &:hover {
    box-shadow: 1px 3px 5px rgba(5,15,44,0.15);
  }
}
.card-list-item.team-padded {
  padding: 65px 0 20px 0;
}
.card-list-item-title-text {
  @include title-card();
  padding: 10px 30px;
  .card-list-item-title-box {
    @include flex-center();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 18px;
    }
  }
}
.card-list-item-name {
  font-size: 16px;
  @include text-overflow-ellipsis();
}
.card-list-item-location {
  display: flex;
  justify-content: center;
  color: $text-grey-blue;
  i {
    margin: 0 3px 2px 0;
    font-size: 18px;
  }
}
.card-list-item-team {
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: $blue-dark;
  padding-bottom: 10px;
  @include text-overflow-ellipsis();
}
.card-list-item-logo {
  width: 25px;
  margin: 5px 0;
}
.card-list-item-avatar {
  @include avatar-l();
  margin: 0 auto;
  position: relative;
  .card-list-item-badge {
    position: absolute;
    right: -5px;
    bottom: -4px;
    color: $blue;
    i { font-size: 19px;}
  }
}
.card-list-item-icon-edit {
  position: absolute;
  bottom: 15px;
  right: 25px;
  i {
    font-size: 17px;
    color:  $text-grey-blue;
    cursor: pointer;
  }
}
</style>
