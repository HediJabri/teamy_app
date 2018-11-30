const state = {
  data: null,
  loaded: false
}

const mutations = {
  SET_TEAM(state, team) {
    if (team) state.data = team
    state.loaded = true
  },
  RESET_TEAM(state) {
    state.data = null
    state.loaded = false
  },
  REMOVE_TEAM(state) {
    state.data = null
  },
  REMOVE_TEAM_MEMBERSHIP(state, membershipId) {
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
  UPDATE_TEAM_MEMBERSHIP(state, updatedMembership) {
    let membership = state.data.memberships.find(
      m => m._id === updatedMembership._id
    )
    if (membership) {
      membership.status = updatedMembership.status
      membership.role = updatedMembership.role
      membership.position = updatedMembership.position
    }
  },
  ADD_TEAM_LOCATION(state, location) {
    state.data.locations.push(location)
  },
  EDIT_TEAM_LOCATION(state, editedLocation) {
    if (editedLocation.mainLocation === true) {
      for (let location of state.data.locations) {
        editedLocation._id === location._id
          ? (location.mainLocation = true)
          : (location.mainLocation = false)
      }
    }
  },
  ADD_TEAM_SEASON(state, newSeason) {
    if (newSeason.currentSeason === true) {
      for (let season of state.data.seasons) {
        season.currentSeason = false
      }
    }
    state.data.seasons.push(newSeason)
  },
  EDIT_TEAM_SEASON(state, editedSeason) {
    if (editedSeason.currentSeason === true) {
      for (let season of state.data.seasons) {
        season.currentSeason = false
      }
    }
    let season = state.data.seasons.find(
      season => season._id === editedSeason._id
    )
    season.name = editedSeason.name
    season.dateStart = editedSeason.dateStart
    season.dateEnd = editedSeason.dateEnd
    season.currentSeason = editedSeason.currentSeason
  }
}

const actions = {
  initTeam: ({ commit }, team) => {
    commit('SET_TEAM', team)
  },
  resetTeam: ({ commit }) => {
    commit('RESET_TEAM')
  },
  removeTeam: ({ commit }) => {
    commit('REMOVE_TEAM')
  },
  removeTeamMembership: ({ commit }, membershipId) => {
    commit('REMOVE_TEAM_MEMBERSHIP', membershipId)
  },
  updateTeamMembership: ({ commit }, updatedMembership) => {
    commit('UPDATE_TEAM_MEMBERSHIP', updatedMembership)
  },
  addTeamLocation: ({ commit }, location) => {
    commit('ADD_TEAM_LOCATION', location)
  },
  editTeamLocation: ({ commit }, location) => {
    commit('EDIT_TEAM_LOCATION', location)
  },
  addTeamSeason: ({ commit }, newSeason) => {
    commit('ADD_TEAM_SEASON', newSeason)
  },
  editTeamSeason: ({ commit }, editedSeason) => {
    commit('EDIT_TEAM_SEASON', editedSeason)
  }
}

const getters = {
  currentTeam: state => {
    return state.data
  },
  currentTeamLocation: state => {
    return (
      state.data && state.data.locations.find(loc => loc.mainLocation === true)
    )
  },
  currentTeamSeason: state => {
    return (
      state.data &&
      state.data.seasons.find(season => season.currentSeason === true)
    )
  },
  teamLoaded: state => {
    return state.loaded
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
