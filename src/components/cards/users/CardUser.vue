<template>
  <div v-if="user">
    <div class="card-user" :class="{'padding-small': isUserShowView }">
      <div class="card-user-link" @click="routeToProfil(user)">
        <div class="card-user-avatar">
          <img v-if="user.avatar" :src="user.avatar">
          <img v-else src="../../../assets/img/user.png">
        </div>
        <h4 class="card-user-name">
          {{ user.firstName }}
          {{ user.lastName }}
        </h4>
      </div>
      <div class="card-user-tag" 
        v-if="currentTeam && currentUserMembership(user, currentTeam).position">
        <span>{{ currentUserMembership(user, currentTeam).position }}</span>
      </div>
      <div>
        <button-contact-user v-if="isUserShowView && !isCurrentUser(user)" :user="user">
          <el-button type="default" class="card-user-btn">
            {{$t('toContact')}} <i class="fa fa-envelope"></i>
          </el-button>
        </button-contact-user>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ButtonContactUser from '@/components/buttons/users/ButtonContactUser'

export default {
  name: 'CardUser',
  props: ['user', 'team'],
  mixins: [utilities],
  components: { ButtonContactUser },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    userAge() {
      return moment().diff(this.user.birthdate, 'years')
    },
    isUserEditView() {
      return this.$route.name === 'user-edit'
    },
    isUserShowView() {
      return ['team-member-show', 'user-show'].includes(this.$route.name)
    },
    isTeamDashboardView() {
      return this.$route.name === 'team-dashboard'
    }
  }
}
</script>

<style lang="scss" scoped>
.card-user {
  @include card();
  text-align: center;
  padding: 30px 20px 60px 20px;
}
.card-user.padding-small {
  padding: 30px 20px 40px 20px;
}

.card-user-title-text {
  @include title-card();
  padding: 10px 30px;
  .card-user-title-box {
    @include flex-center();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 18px;
    }
  }
}
.card-user-link {
  cursor: pointer;
}
.card-user-name {
  font-size: 16px;
  @include text-overflow-ellipsis();
  margin-bottom: 2px;
}
.card-user-tag {
  @include flex-center();
  flex-wrap: wrap;
  span {
    @include tag-flat-s();
  }
}
.card-user-btn {
  margin-top: 20px;
  i {
    color: $blue;
    font-size: 11px;
    margin-left: 5px;
  }
}
.card-user-age {
  height: 14px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  color: $text-grey-blue;
}

.card-user-avatar {
  @include avatar-l();
  margin: 0 auto;
}
.card-user-icon-edit {
  position: absolute;
  bottom: 5px;
  right: 15px;
  i {
    font-size: 17px;
    color: $text-grey-blue;
    cursor: pointer;
  }
}
.btn-network {
  margin-bottom: 10px;
}
</style>
