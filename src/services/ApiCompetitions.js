import Api from '@/services/Api'

export default {
  indexTeam (params) {
    return Api().get(`/competitions/team/${params.teamId}/${params.page}/${params.filter}`)
  },
  get (id) {
    return Api().get(`/competitions/${id}`)
  },
  patch (id, body) {
    return Api().patch(`/competitions/${id}`, body)
  },
  post (body) {
    return Api().post(`/competitions`, body)
  },
  delete (id) {
    return Api().delete(`/competitions/${id}`)
  }
}