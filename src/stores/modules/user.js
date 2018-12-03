import i18n from '../../plugins/i18n'

const state = {
  data: null
}

const mutations = {
  SET_USER(state, user) {
    if (user) state.data = user
    if (user.lang) i18n.locale = user.lang
  },
  RESET_USER(state) {
    state.data = null
  },
  ADD_USER_MEMBERSHIP(state, membership) {
    state.data.memberships.push(membership)
  },
  REMOVE_USER_MEMBERSHIP(state, membershipId) {
    if (membershipId) {
      const membership = state.data.memberships.find(
        m => m._id === membershipId
      )
      state.data.memberships.splice(
        state.data.memberships.indexOf(membership),
        1
      )
    }
  },
  UPDATE_USER_MEMBERSHIP(state, updatedMembership) {
    let membership = state.data.memberships.find(
      m => m._id === updatedMembership._id
    )
    if (membership) {
      membership.status = updatedMembership.status
      membership.role = updatedMembership.role
      membership.position = updatedMembership.position
    }
  }
}

const actions = {
  initUser: ({ commit }, user) => {
    commit('SET_USER', user)
  },
  resetUser: ({ commit }) => {
    commit('RESET_USER')
  },
  addUserMembership: ({ commit }, membershipId) => {
    commit('ADD_USER_MEMBERSHIP', membershipId)
  },
  removeUserMembership: ({ commit }, membershipId) => {
    commit('REMOVE_USER_MEMBERSHIP', membershipId)
  },
  updateUserMembership: ({ commit }, membership) => {
    commit('UPDATE_USER_MEMBERSHIP', membership)
  }
}

const getters = {
  currentUser: state => {
    return state.data
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
