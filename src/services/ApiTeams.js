import Api from '@/services/Api'

export default {
  index (params) {
    return Api().get(`/teams/index/${params.pageNext}/${params.sport}/${params.zone}`)
  },
  get (id) {
    return Api().get(`/teams/${id}`)
  },
  getByToken (teamToken) {
    return Api().get(`/teams/by_token/${teamToken}`)
  },
  getTeamToken(id) {
    return Api().get(`/teams/${id}/token`)
  },
  post (body) {
    return Api().post(`/teams`, body)
  },
  patch (id, body) {
    return Api().patch(`/teams/${id}`, body)
  },
  desactivate (id) {
    return Api().patch(`/teams/${id}/desactivate`)
  }
}