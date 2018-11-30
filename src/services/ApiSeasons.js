import Api from '@/services/Api'

export default {
  patch (id, body) {
    return Api().patch(`/seasons/${id}`, body)
  },
  post (body) {
    return Api().post(`/seasons`, body)
  },
  delete (id) {
    return Api().delete(`/seasons/${id}`)
  }
}