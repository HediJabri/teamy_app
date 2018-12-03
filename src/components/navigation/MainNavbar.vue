<template lang="html">
  <div id="main-navbar">
    <div class="main-navbar-bg-gradient"></div>
    <div class="main-navbar">
      <!-- Logo -->
      <div class="main-navbar-left">
        <div class="main-navbar-brand">
          <router-link to="/">
            <img class="main-navbar-logo" src="../../assets/img/teamy-logo.jpg">
          </router-link>
          <div class="main-navbar-title">
            <span class="main-navbar-tag">beta</span>
            <span class="main-navbar-text">{{ $t('lang') }} </span>
          </div>
        </div>
      </div>
      <!-- Right Navigation -->
      <div class="main-navbar-right">        
        <el-dropdown class="dropdown-menu-mobile" v-if="currentUser && currentTeam" trigger="click">
          <span class="el-dropdown-link">
            <i class="material-icons">menu</i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link class="dropdown-link" :to="`/team/${this.currentTeam._id}/show`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons icon-margin-bottom">group</i>
                  <span>Membres</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link class="dropdown-link" :to="`/team/${this.currentTeam._id}/events`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">event</i>
                  <span>Événements</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link class="dropdown-link" :to="`/team/${currentTeam._id}/competitions`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="fa fa-trophy"></i>
                  <span>Compétitions</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link class="dropdown-link" :to="`/team/${currentTeam._id}/stats`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons icon-stats">insert_chart_outlined</i>
                  <span>Stats</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link class="dropdown-link" :to="`/team/${currentTeam._id}/seasons`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">view_list</i>
                  <span>Saisons</span>
                </span>
              </el-dropdown-item>
            </router-link>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-if="currentUser" trigger="click">
          <span class="el-dropdown-link">
            <div class="dropdown-avatar">
              <img v-if="currentUser.avatar" :src="currentUser.avatar">
              <img v-else src="../../assets/img/user.png">
            </div>
            <span class="dropdown-avatar-name">{{ currentUser.firstName }}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link v-if="currentTeam" class="dropdown-link" to="/home/dashboard">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">home</i>
                  <span>Accueil</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link v-if="currentTeam" class="dropdown-link" to="/home/community" >
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons icon-margin-bottom">public</i>
                  <span>Communauté</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link v-if="!currentTeam" class="dropdown-link" 
              :to="`/home/user-show/${currentUser._id}`">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">account_circle</i>
                  <span>Mon profil</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <router-link v-if="!currentTeam" class="dropdown-link" to="/home/user-edit">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="material-icons">settings</i>
                  <span>Mon compte</span>
                </span>
              </el-dropdown-item>
            </router-link>
            <div class="dropdown-link" @click="logout">
              <el-dropdown-item>
                <span class="dropdown-text">
                  <i class="fa fa-sign-out"></i>
                  <span>Déconnexion</span>
                </span>
              </el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <dropdown-language v-if="currentUser"/>
      </div>
    </div>
     <dialog-info-page v-show="currentUser" :user="currentUser"
      :openDialog="dialogInfoPage" @closeDialog="dialogInfoPage = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import Auth from '@/services/Auth.js'
import DialogInfoPage from '@/components/onbording/DialogInfoPage'
import DropdownLanguage from '@/components/global/DropdownLanguage'

export default {
  name: 'MainNavbar',
  components: { DialogInfoPage, DropdownLanguage },
  mixins: [utilities],
  data() {
    return {
      dialogInfoPage: false
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'currentTeam', 'infoHighlighted'])
  },
  methods: {
    logout() {
      Auth.logout()
    },
    openModalInfo() {
      this.dialogInfoPage = true
    }
  }
}
</script>

<style lang="scss" scoped>
.main-navbar-bg-gradient {
  background-image: linear-gradient(
    90deg,
    HSL(213, 77%, 52%),
    HSL(200, 100%, 69%)
  );
  height: 4px;
}

.main-navbar {
  background: $white-light;
  box-shadow: 0 1px 3px rgba(5, 15, 44, 0.1);
  transition: all 0.3s ease;
  height: 55px;
  padding: 0px 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.main-navbar-right {
  @include flex-center();
  .info-icon {
    @include flex-center();
    margin: 0 15px;
    i {
      font-size: 21px;
      color: $blue;
      cursor: pointer;
    }
    .info-icon-emoji {
      display: none;
      font-size: 20px;
      margin-right: 10px;
      z-index: 9999;
    }
  }
  .info-icon.highlighted {
    .info-icon-emoji {
      display: inline-block;
    }
    i {
      z-index: 9999;
      background: white;
      border-radius: 20px;
    }
  }
}

.main-navbar-brand {
  @include flex-start();
  padding-right: 20px;
  .main-navbar-logo {
    height: 31px;
    margin-bottom: 2px;
  }
  a:hover {
    text-decoration: none !important;
  }
}
.main-navbar-title {
  margin-left: 12px;
  padding-left: 6px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: $nepal;
  .main-navbar-tag {
    color: $ghost-white;
    background-image: linear-gradient(
      110deg,
      HSL(213, 77%, 52%),
      HSL(200, 100%, 69%)
    );
    border-radius: 20px;
    padding: 1px 10px;
    margin-right: 5px;
  }
}
.main-navbar-links {
  display: inline-block;
}
.main-navbar-item {
  flex: 0 1 auto;
  cursor: pointer;
  margin: 0 15px;
  color: $blue-grey;
  font-size: 15px;
  font-weight: 600;
  &:hover,
  &:focus {
    text-decoration: none !important;
  }
}
.el-dropdown {
  color: $nepal !important;
  font-size: 15px !important;
  font-weight: 600 !important;
  cursor: pointer;
  img {
    margin-right: 4px;
  }
}
.dropdown-link,
.dropdown-link-mobile {
  text-decoration: none;
  li {
    color: $blue-grey;
    &:hover,
    &:focus {
      color: $blue-grey;
      text-decoration: none;
    }
  }
}
.dropdown-link-mobile {
  display: none;
}
.dropdown-text {
  @include flex-start();
  i {
    margin: 0 5px 0 0;
    font-size: 16px;
  }
  i.fa-shield {
    margin: 0 7px 0 2px !important;
  }
}
.dropdown-avatar {
  @include avatar();
  display: inline-block;
  margin-right: 6px;
}

.dropdown-menu-mobile {
  display: none;
  padding-top: 7px;
  margin-right: 10px;
  i {
    margin-right: 5px;
    font-size: 30px;
  }
}
@media only screen and (max-width: 479px) {
  .main-navbar-title {
    display: none;
  }
  .dropdown-avatar-name,
  .el-icon-caret-bottom {
    display: none;
  }
  .dropdown-menu-mobile {
    display: inline-block;
  }
  .main-navbar {
    padding: 0px 20px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 959px) {
  .main-navbar-title {
    display: none;
  }
  .dropdown-avatar-name,
  .el-icon-caret-bottom {
    display: none;
  }
  .dropdown-menu-mobile {
    display: inline-block;
  }
  .main-navbar {
    padding: 0px 40px;
  }
}

@media only screen and (min-width: 960px) and (max-width: 1160px) {
  .main-navbar {
    padding: 0px 40px;
  }
}
</style>
