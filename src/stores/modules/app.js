const state = {
  infoHighlighted: false,
  contactHighlighted: false
}

const mutations = {
  EDIT_INFO_HIGHLIGHTED(state, data) {
    state.infoHighlighted = data
  },
  EDIT_CONTACT_HIGHLIGHTED(state, data) {
    state.contactHighlighted = data
  }
}

const actions = {
  editInfoHighlighted: ({ commit }, data) => {
    commit('EDIT_INFO_HIGHLIGHTED', data)
  },
  editContactHighlighted: ({ commit }, data) => {
    commit('EDIT_CONTACT_HIGHLIGHTED', data)
  }
}

const getters = {
  infoHighlighted: state => {
    return state.infoHighlighted
  },
  contactHighlighted: state => {
    return state.contactHighlighted
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
