<template lang="html">
  <div class="card" v-if="membership && team">
    <div class="card-avatar">
      <img v-if="membership.user.avatar" :src="membership.user.avatar">
      <img v-else src="../../../assets/img/user.png">
    </div>
    <h4 class="card-name">
      {{ membership.user.firstName }}
      {{ membership.user.lastName }}
    </h4>
    <div class="card-role" v-if="membership.position">
     <span>{{ membership.position }}</span>
    </div>
    <div class="card-tag" v-if="membership.user.birthdate">
      <span v-if="membership.user.birthdate">{{ formatAge(membership.user) }} {{$t('yearsOld')}}</span>
    </div>
    <div class="card-buttons">
      <div class="card-buttons-wrapper">
         <el-button type="primary"
          @click="routeToProfil(membership.user)">
          {{$t('seeProfile')}}
        </el-button>   
      </div>
    </div>
    <div class="card-icons">
      <button-contact-user v-if="!isCurrentUser(membership.user)" :user="membership.user">
        <el-tooltip :content="$t('toContact')" placement="top" :open-delay="300">
          <i class="fa fa-envelope icon-contact"></i>
        </el-tooltip>
      </button-contact-user>
      <div v-if="isAdmin(currentUser, team) && !isTeamOverview" class="card-icons-right">
        <button-delete-membership :membership="membership" :team="team"
          v-if="!isMainAdmin(membership.user, team)">
          <el-tooltip :content="$t('removeFromTeam')" placement="top" :open-delay="300">
            <i class="material-icons">sync</i>
          </el-tooltip>
        </button-delete-membership>
         <button-edit-membership :membership="membership" :team="team">
          <el-tooltip :content="$t('editProfile')" placement="top" :open-delay="300">
            <i class="material-icons ">settings</i>
          </el-tooltip>
        </button-edit-membership>
      </div>    
    </div>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ButtonDeleteMembership from '@/components/buttons/memberships/ButtonDeleteMembership'
import ButtonEditMembership from '@/components/buttons/memberships/ButtonEditMembership'
import ButtonContactUser from '@/components/buttons/users/ButtonContactUser'

export default {
  name: 'CardUserLarge',
  props: ['membership', 'team'],
  mixins: [utilities],
  components: {
    ButtonDeleteMembership,
    ButtonEditMembership,
    ButtonContactUser
  },
  data() {
    return {
      user: null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam']),
    isTeamOverview() {
      return this.$route.name === 'team-overview'
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  @include card();
  text-align: center;
  padding: 30px 20px 60px 20px;
}
.card.padding-small {
  padding: 30px 20px 40px 20px;
}

.card-title-text {
  @include title-card();
  padding: 10px 30px;
  .card-title-box {
    @include flex-center();
    text-transform: uppercase;
    i {
      color: $blue-dark-medium;
      margin: 0 10px 2px 0;
      font-size: 18px;
    }
  }
}
.card-link {
  cursor: pointer;
}
.card-name {
  font-size: 16px;
  @include text-overflow-ellipsis();
  margin-bottom: 2px;
}
.card-tag {
  @include flex-center();
  flex-wrap: wrap;
  span {
    @include tag-flat-s();
  }
}
.card-role {
  height: 18px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  color: $text-grey-blue;
}

.card-avatar {
  @include avatar-l();
  margin: 0 auto;
}

.card-icons {
  position: absolute;
  bottom: 10px;
  right: 20px;
  @include flex-center();
  i {
    cursor: pointer;
  }
  i.icon-contact {
    font-size: 14px;
    margin: 2px;
    color: $blue;
  }
  .card-icons-right {
    @include flex-center();
    i {
      margin-top: 4px;
      margin-left: 6px;
      font-size: 16px;
      color: $text-grey-blue;
    }
  }
}
.card-buttons {
  margin-top: 15px;
}
</style>
