const state = {
  notifications: {
    pendingMembers: null,
    pendingParticipations: null,
    loaded: false
  }
}

const mutations = {
  SET_NOTIFICATIONS(state, notifications) {
    state.notifications = notifications
    state.notifications.loaded = true
  },
  RESET_NOTIFICATIONS(state) {
    state.notifications = null
  },
  REMOVE_NOTIFICATION(state, notification) {
    let object = null
    if (state.notifications[notification.key])
      object = state.notifications[notification.key].find(
        n => n._id === notification.id
      )
    if (object)
      state.notifications[notification.key].splice(
        state.notifications[notification.key].indexOf(object),
        1
      )
  }
}

const actions = {
  initNotifications: ({ commit }, notifications) => {
    commit('SET_NOTIFICATIONS', notifications)
  },
  resetNotifications: ({ commit }) => {
    commit('RESET_NOTIFICATIONS')
  },
  removeNotification: ({ commit }, notification) => {
    commit('REMOVE_NOTIFICATION', notification)
  }
}

const getters = {
  notifsLoaded: state => {
    return state.notifications && state.notifications.loaded
  },
  notifications: state => {
    return state.notifications
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
