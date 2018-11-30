const state = {
  seasonFilter: null,
  categoryFilter: null,
  competitionFilter: null,
  statsEvents: null,
  statsReloading: false
}

const mutations = {
  SET_SEASON_FILTER(state, season) {
    state.seasonFilter = season
  },
  SET_CATEGORY_FILTER(state, category) {
    state.categoryFilter = category
  },
  SET_COMPETITION_FILTER(state, competition) {
    state.competitionFilter = competition
  },
  SET_STATS_EVENTS(state, events) {
    state.statsEvents = events
  },
  SET_RELOAD_STATS(state, boolean) {
    state.statsReloading = boolean
  },
  RESET_STATS_DATA() {
    state.seasonFilter = null
    state.categoryFilter = null
    state.competitionFilter = null
    state.statsEvents = null
    state.statsReloading = false
  }
}

const actions = {
  setSeasonFilter: ({ commit }, season) => {
    commit('SET_SEASON_FILTER', season)
  },
  setCategoryFilter: ({ commit }, category) => {
    commit('SET_CATEGORY_FILTER', category)
  },
  setCompetitionFilter: ({ commit }, competition) => {
    commit('SET_COMPETITION_FILTER', competition)
  },
  setStatsEvents: ({ commit }, events) => {
    commit('SET_STATS_EVENTS', events)
  },
  setReloadStats: ({ commit }, boolean) => {
    commit('SET_RELOAD_STATS', boolean)
  },
  resetStatsData: ({ commit }) => {
    commit('RESET_STATS_DATA')
  }
}

const getters = {
  statsSeasonFilter: state => {
    return state.seasonFilter
  },
  statsCategoryFilter: state => {
    return state.categoryFilter
  },
  statsCompetitionFilter: state => {
    return state.competitionFilter
  },
  statsEvents: state => {
    return state.statsEvents
  },
  statsReloading: state => {
    return state.statsReloading
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
