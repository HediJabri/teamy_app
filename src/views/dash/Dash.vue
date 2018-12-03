<template lang="html">
  <div class="page-dash">
    <div v-if="globalDataStoreLoaded" class="page-container">
      <main-navbar />
      <second-navbar />
      <div class="page-dash-wrapper">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
     <button-contact />
    </div>
    <teamy-spinner v-else :fullMode="true" :logo="true" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { utilities } from '@/mixins/utilities.js'
import Auth from '@/services/Auth.js'
import ApiGlobal from '@/services/ApiGlobal.js'
import ApiUsers from '@/services/ApiUsers.js'
import TeamySpinner from '@/components/global/TeamySpinner'
import MainNavbar from '@/components/navigation/MainNavbar.vue'
import SecondNavbar from '@/components/navigation/SecondNavbar.vue'
import ButtonContact from '@/components/buttons/ButtonContact'

export default {
  name: 'Dash',
  mixins: [utilities],
  components: {
    MainNavbar,
    SecondNavbar,
    TeamySpinner,
    ButtonContact
  },
  computed: {
    ...mapGetters(['sportsLoaded', 'currentUser', 'currentTeam']),
    globalDataStoreLoaded() {
      let result
      this.sportsLoaded && this.currentUser ? (result = true) : (result = false)
      return result
    }
  },
  methods: {
    ...mapActions(['initSports', 'initUser', 'initTeam', 'initNotifications']),
    async getSports() {
      try {
        const sports = (await ApiGlobal.getSports()).data
        this.initSports(sports)
      } catch (err) {
        this.errorNotify(err)
      }
    },
    async getCurrentUser(id) {
      try {
        const user = (await ApiUsers.get(id)).data.user
        this.initUser(user)
        this.changeAppLocale(user.lang)
      } catch (err) {
        this.logout()
      }
    },
    logout() {
      Auth.logout()
    }
  },
  created() {
    const id = Auth.getUserId()
    this.getSports()
    this.getCurrentUser(id)
  }
}
</script>

<style lang="scss" scoped>
.page-dash {
  background-color: $ghost-white;
  min-height: 110vh;
}
.page-dash-wrapper {
  padding: 0 60px;
}

@media only screen and (max-width: 479px) {
  .page-dash-wrapper {
    padding: 0 5px;
  }
}

@media only screen and (min-width: 480px) and (max-width: 719px) {
  .page-dash-wrapper {
    padding: 0 15px;
  }
}

@media only screen and (min-width: 720px) and (max-width: 1160px) {
  .page-dash-wrapper {
    padding: 0 30px;
  }
}
</style>
