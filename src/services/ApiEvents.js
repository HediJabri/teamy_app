import Api from '@/services/Api'

export default {
  fullIndexTeam (params) {
    return Api().get(`/events/team/${params.teamId}/all/${params.seasonId}/${params.category}/${params.competitionId}`)
  },
  indexTeam (params) {
    return Api().get(`/events/team/${params.teamId}/${params.page}/${params.filter}`)
  },
  get (id) {
    return Api().get(`/events/${id}`)
  },
  patch (id, body) {
    return Api().patch(`/events/${id}`, body)
  },
  post (body) {
    return Api().post(`/events`, body)
  },
  postRecurrent (body) {
    return Api().post(`/events/recurrent`, body)
  },
  delete (id) {
    return Api().delete(`/events/${id}`)
  }
}