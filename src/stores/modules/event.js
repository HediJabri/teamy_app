const state = {
  data: null
}

const mutations = {
  INIT_EVENT(state, event) {
    state.data = event
  },
  RESET_EVENT(state) {
    state.data = null
  },
  ADD_TOPIC(state, topic) {
    state.data.topic = topic
  },
  ADD_TOPIC_COMMENT(state, comment) {
    if (!state.data.topic.comments) state.data.comments = []
    state.data.topic.comments.push(comment)
  },
  INIT_EVENT_PARTICIPATIONS(state, participations) {
    state.data.participations = participations
  },
  UPDATE_EVENT_PARTICIPATION(state, participation) {
    let p = state.data.participations.find(p => p._id === participation._id)
    p.status = participation.status
    p.substitute = participation.substitute
  }
}

const actions = {
  initEvent: ({ commit }, event) => {
    commit('INIT_EVENT', event)
  },
  resetEvent: ({ commit }) => {
    commit('RESET_EVENT')
  },
  addEventTopic: ({ commit }, comment) => {
    commit('ADD_TOPIC', comment)
  },
  addEventTopicComment: ({ commit }, comment) => {
    commit('ADD_TOPIC_COMMENT', comment)
  },
  initEventParticipations: ({ commit }, participations) => {
    commit('INIT_EVENT_PARTICIPATIONS', participations)
  },
  updateEventParticipation: ({ commit }, participation) => {
    commit('UPDATE_EVENT_PARTICIPATION', participation)
  }
}

const getters = {
  event: state => {
    return state.data
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
