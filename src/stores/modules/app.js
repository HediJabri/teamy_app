const state = {
  infoHighlighted: false,
  contactHighlighted: false,
  dialogTeamLinkOpen: false
}

const mutations = {
  EDIT_INFO_HIGHLIGHTED(state, data) {
    state.infoHighlighted = data
  },
  EDIT_CONTACT_HIGHLIGHTED(state, data) {
    state.contactHighlighted = data
  },
  OPEN_DIALOG_TEAM_LINK(state, data) {
    state.dialogTeamLinkOpen = data
  }
}

const actions = {
  editInfoHighlighted: ({ commit }, data) => {
    commit('EDIT_INFO_HIGHLIGHTED', data)
  },
  editContactHighlighted: ({ commit }, data) => {
    commit('EDIT_CONTACT_HIGHLIGHTED', data)
  },
  openDialogTeamLink: ({ commit }, data) => {
    commit('OPEN_DIALOG_TEAM_LINK', data)
  }
}

const getters = {
  infoHighlighted: state => {
    return state.infoHighlighted
  },
  contactHighlighted: state => {
    return state.contactHighlighted
  },
  dialogTeamLinkOpen: state => {
    return state.dialogTeamLinkOpen
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
