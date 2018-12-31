<template>
  <transition name="fade" mode="out-in">
    <div class="page-home-dashboard" v-if="userLoaded">
      <div class="page-wrapper">
        <div class="page-left-container">
          <card-home-user />
        </div>
        <div class="page-center-container-l">
          <div class="page-center-title">
            <h5>{{$t('myTeams')}}</h5>
            <el-button type="primary" class="card-btn" @click="routeUrl('/home/community')">
              <span>{{$t('joinATeam')}}</span><i class="fa fa-share margin-left"></i>
            </el-button>
          </div>
          <card-teams-user-list :memberships="validatedMemberships" :cardTeamEmpty="true"/>
        </div>
      </div>
      <dialog-user-welcome v-if="currentUser.onbording.userWelcome" />
    </div>
    <teamy-spinner v-else />
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import ApiUsers from '@/services/ApiUsers.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import DialogUserWelcome from '@/components/onbording/DialogUserWelcome'
import CardHomeUser from '@/components/cards/home/CardHomeUser'
import CardTeamsUserList from '@/components/cards/teams/CardTeamsUserList'

export default {
  name: 'HomeDashboard',
  mixins: [utilities],
  components: {
    TeamySpinner,
    DialogUserWelcome,
    CardHomeUser,
    CardTeamsUserList
  },
  data() {
    return {
      userLoaded: false,
      teamJoined: null
    }
  },
  computed: {
    ...mapGetters(['currentUser']),
    validatedMemberships() {
      return this.currentUser.memberships.filter(m => m.status === 'validated')
    },
    pendingMemberships() {
      return this.currentUser.memberships.filter(m => m.status === 'pending')
    }
  },
  methods: {
    ...mapActions(['resetTeam', 'resetNotifications', 'initUser']),
    async reloadUser(id) {
      try {
        const user = (await ApiUsers.get(id)).data.user
        this.initUser(user)
        this.userLoaded = true
      } catch (err) {
        this.errorNotify(err)
      }
    }
  },
  created() {
    this.resetTeam()
    this.resetNotifications()
    this.reloadUser(this.currentUser._id)
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  @include page-wrapper();
}
.page-left-container {
  @include page-left-container();
  margin-top: 5px;
}
.page-center-container-l {
  @include page-center-container-l();
  .page-center-title {
    margin-bottom: 15px;
    @include flex-space-between();
    h5 {
      font-weight: 600;
      text-transform: uppercase;
      margin-left: 8px;
    }
    .title-margin-top {
      margin-top: 35px;
    }
  }
}
.teamy-spinner {
  @include flex-center();
  height: 300px;
}

@media only screen and (max-width: 479px) {
  .page-wrapper {
    flex-direction: column;
    padding: 0px 10px 60px 10px;
  }
  .page-center-container-l,
  .page-left-container {
    width: 100% !important;
  }
  .page-center-title {
    flex-direction: column-reverse;
    h5 {
      margin-top: 30px;
    }
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-wrapper {
    flex-direction: column;
  }
  .page-center-container-l,
  .page-left-container {
    width: 90% !important;
  }
}

@media only screen and (min-width: 720px) and (max-width: 960px) {
  .page-center-container-l {
    width: 67% !important;
  }
  .page-left-container {
    width: 33% !important;
  }
  .card-home-user {
    padding-right: 20px;
  }
}
</style>
