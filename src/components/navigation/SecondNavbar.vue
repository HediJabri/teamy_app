<template lang="html">
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="this.currentTeam && notifsLoaded" class="second-navbar">
        <!-- Left Navigation -->
        <div class="second-navbar-left">
          <router-link class="second-navbar-item" :to="`/team/${this.currentTeam._id}/dashboard`"
            :class="{'active': $route.name === 'team-dashboard'}">
            <span class="second-navbar-text">
              <i class="material-icons icon-margin-bottom">dashboard</i>
              <span>{{$t('dashboard')}}</span>
            </span>
          </router-link>
          <router-link class="second-navbar-item" :to="`/team/${this.currentTeam._id}/show`"
            :class="{'active': $route.name === 'team-show' }">
            <span class="second-navbar-text ">
              <i class="material-icons icon-margin-bottom">group</i>
              <span>{{$t('members')}}</span>
              <el-badge :value="notifications.pendingMembers.length" class="item"
                v-if="isAdmin(currentUser, currentTeam) && notifications.pendingMembers && notifications.pendingMembers.length">
              </el-badge>
            </span>
          </router-link>
          <router-link class="second-navbar-item" :to="`/team/${this.currentTeam._id}/events`"
            :class="{'active': eventsRoutesNames.includes($route.name) }">
            <span class="second-navbar-text ">
              <i class="material-icons icon-event">event</i>
              <span>{{$t('events')}}</span>
              <el-badge v-if="notifications.pendingParticipations && notifications.pendingParticipations.length" 
                :value="notifications.pendingParticipations.length" class="item">
              </el-badge>
            </span>
          </router-link>
          <router-link v-if="currentTeam" class="second-navbar-item" :to="`/team/${currentTeam._id}/competitions`"
            :class="{'active': competitionsRoutesNames.includes($route.name) }">
            <span class="second-navbar-text-fa icon-margin-bottom">
              <i class="fa fa-trophy"></i>
              <span>{{$t('competitions')}}</span>
            </span>
          </router-link>
          <router-link v-if="currentTeam" class="second-navbar-item" :to="`/team/${currentTeam._id}/stats`"
            :class="{'active': $route.name === 'stats' }">
            <span class="second-navbar-text" >
              <i class="material-icons icon-stats">insert_chart_outlined</i>
              <span>{{$t('stats')}}</span>
            </span>
          </router-link>
        </div>
        <!-- Right Navigation -->
        <div class="second-navbar-right margin-right">
          <el-dropdown class="dropdown-team" v-if="currentTeam" trigger="click" >
            <div class="el-dropdown-link">
              <span v-if="currentTeam.name">
                {{ currentTeam.name.slice(0, 30) }}
              </span>
              <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <div class="dropdown-link" @click="routeUrl(`/team/${currentTeam._id}/seasons`)">
                <el-dropdown-item v-if="isAdmin(currentUser, currentTeam)">
                  <span class="dropdown-text">
                    <i class="material-icons">view_list</i>
                    <span>{{$t('seasons')}}</span>
                  </span>
                </el-dropdown-item>
              </div>
              <div class="dropdown-link" @click="routeToProfil(currentUser)">
                <el-dropdown-item>
                  <span class="dropdown-text">
                    <i class="material-icons">account_circle</i>
                    <span>{{$t('memberProfile')}}</span>
                  </span>
                </el-dropdown-item>
              </div>
              <div class="dropdown-link" @click="routeUrl(`/team/${currentTeam._id}/edit`)">
                <el-dropdown-item v-if="isMainAdmin(currentUser, currentTeam)">
                  <span class="dropdown-text">
                    <i class="material-icons">settings</i>
                    <span>{{$t('editTeam')}}</span>
                  </span>
                </el-dropdown-item>
              </div>
              <div class="dropdown-link"
                v-if="isMainAdmin(currentUser, currentTeam)"
                @click="openDialogDeleteTeam">
                <el-dropdown-item>
                  <span class="dropdown-text">
                    <i class="material-icons">delete</i>
                    <span>{{$t('deleteTeam')}}</span>
                  </span>
                </el-dropdown-item>
              </div>
              <div v-else class="dropdown-link"
                @click="openDialogDeleteMembership">
                <el-dropdown-item>
                  <span class="dropdown-text">
                    <i class="material-icons">sync</i>
                    <span>{{$t('removeMyselfFromTeam')}}</span>
                  </span>
                </el-dropdown-item>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div v-else class="second-navbar">
        <div class="second-navbar-left">
          <router-link class="second-navbar-item" to="/">
            <span class="second-navbar-text">
              <i class="material-icons icon-margin-bottom icon-home">home</i>
              <span>{{$t('home')}}</span>
            </span>
          </router-link>
          <router-link class="second-navbar-item" to="/home/community"
            :class="{'active': $route.name === 'community'}">
            <span class="second-navbar-text">
              <i class="material-icons icon-margin-bottom">public</i>
              <span>{{$t('community')}}</span>
            </span>
          </router-link>
        </div>
      </div> 
    </transition>
    <div v-if="currentTeam">
      <dialog-delete-team
        v-show="currentTeam"
        :openDialog="dialogDeleteTeam"
        @closeDialog="dialogDeleteTeam = false" />
      <dialog-delete-membership
        v-show="currentTeam" :membership="currentUserMembership(currentUser, currentTeam)" :team="currentTeam"
        :openDialog="dialogDeleteMembership"
        @closeDialog="dialogDeleteMembership = false" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import DialogDeleteTeam from '@/components/dialogs/DialogDeleteTeam'
import DialogDeleteMembership from '@/components/dialogs/DialogDeleteMembership'

export default {
  name: 'SecondNavbar',
  components: { DialogDeleteTeam, DialogDeleteMembership },
  mixins: [utilities],
  data () {
    return {
      dialogDeleteTeam: false,
      dialogDeleteMembership: false,
      eventsRoutesNames: [
        'events-new-select',
        'events-new',
        'events-index',
        'events-show'
      ],
      competitionsRoutesNames: [
        'competitions-index',
        'competition-show',
        'competition-new'
      ]
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'currentTeam',
      'notifsLoaded',
      'notifications',
      'sports'
    ]),
    isHomeView () {
      return this.$route.name === 'home-dashboard'
    }
  },
  methods: {
    routeUrl (url) {
      this.$router.push(url)
    },
    openDialogDeleteTeam () {
      this.dialogDeleteTeam = true
    },
    openDialogDeleteMembership () {
      this.dialogDeleteMembership = true
    }
  },
  created () {
    this.dialogDeleteTeam = false
  }
}
</script>

<style lang="scss" scoped>
.second-navbar {
  background: $ghost-white;
  transition: all 0.3s ease;
  height: 40px;
  padding: 0px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
}

.second-navbar-left {
  @include flex-center();
  padding-right: 20px;
}

.second-navbar-links {
  display: inline-block;
}

.second-navbar-item {
  cursor: pointer;
  margin: 0 10px;
  color: $blue-grey;
  font-size: 14px;
  font-weight: 600;
  transition: all ease 0.4s;
  position: relative;
  &:hover,
  &:focus {
    color: $blue-dark;
    text-decoration: none !important;
  }
}

.second-navbar-item.active {
  color: $blue-dark;
  text-decoration: none !important;
}

.second-navbar-text,
.second-navbar-text-fa {
  @include flex-start();
  i {
    margin: 0 5px 0 0;
    font-size: 18px;
  }
  i.icon-margin-bottom {
    margin: 0 5px 2px 0 !important;
  }
  i.fa-shield {
    font-size: 17px;
    margin: 0 5px 3px 0 !important;
  }
  i.icon-event {
    margin: 0 5px 2px 0 !important;
  }
  i.icon-network,
  i.icon-community {
    font-size: 18px;
    margin: 0 5px 2px 0 !important;
  }
  i.icon-home,
  i.icon-stats {
    font-size: 20px !important;
    margin: 0 5px 2px 0 !important;
  }
}
.second-navbar-text-fa i {
  margin: 0 5px 2px 0 !important;
  font-size: 16px;
}
.second-navbar-right {
  i.fa-shield {
    font-size: 17px;
    margin: 0 6px 0 2px !important;
    position: absolute;
    left: -20px;
    top: 0px;
  }
}
.dropdown-text-team {
  margin-left: 3px;
}

@media only screen and (max-width: 960px) {
  .second-navbar {
    height: 0;
  }
  .second-navbar-left .second-navbar-item {
    display: none;
  }
  .second-navbar-right .dropdown-team {
    display: none;
  }
}

@media only screen and (max-width: 1160px) {
  .second-navbar {
    padding: 0px 40px;
  }
}
</style>
