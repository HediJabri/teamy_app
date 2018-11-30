import Api from '@/services/Api'

export default {
  indexTeam (params) {
    return Api().get(`/participations/${params.teamId}/all/${params.seasonId}/${params.category}/${params.competitionId}`)
  },
  indexUser (params) {
    return Api().get(`/participations/${params.teamId}/user/${params.userId}/${params.seasonId}/${params.category}/${params.competitionId}`)
  },
  indexUserPending (teamId, userId) {
    return Api().get(`/participations/${teamId}/user/${userId}/pending`)
  },
  post (body) {
    return Api().post(`/participations`, body)
  },
  patch (id, body) {
    return Api().patch(`/participations/${id}`, body)
  },
  updateReport (body) {
    return Api().patch('/participations/update_report', body)
  },
  delete (id) {
    return Api().delete(`/participations/${id}`)
  }
}