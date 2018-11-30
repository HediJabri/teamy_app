const state = {
  data: null,
  loaded: false
}

const mutations = {
  SET_SPORTS(state, sports) {
    if (sports) state.data = sports
    state.loaded = true
  },
  RESET_SPORTS(state) {
    state.data = null
    state.loaded = false
  }
}

const actions = {
  initSports: ({ commit }, sports) => {
    commit('SET_SPORTS', sports)
  },
  resetSports: ({ commit }) => {
    commit('RESET_SPORTS')
  }
}

const getters = {
  sports: state => {
    return state.data
  },
  sportsLoaded: state => {
    return state.loaded
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
