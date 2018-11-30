import Vue from 'vue'
import Vuex from 'vuex'

// Import modules
import app from './modules/app'
import event from './modules/event'
import team from './modules/team'
import stats from './modules/stats'
import user from './modules/user'
import notifications from './modules/notifications'
import sports from './modules/sports'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    event,
    team,
    stats,
    user,
    notifications,
    sports
  }
})
