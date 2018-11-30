import Api from '@/services/Api'

export default {
  post (body) {
    return Api().post(`/locations`, body)
  },
  patch (id, body) {
    return Api().patch(`/locations/${id}`, body)
  },
}