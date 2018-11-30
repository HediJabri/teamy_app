import Api from '@/services/Api'

export default {
  indexTeam (params) {
    return Api().get(`/activities/team/${params.teamId}/${params.page}`)
  }
}