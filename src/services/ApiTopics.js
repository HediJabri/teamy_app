import Api from '@/services/Api'

export default {
  post (body) {
    return Api().post(`/topics`, body)
  },
  patch (id, body) {
    return Api().patch(`/topics/${id}`, body)
  },
  delete (id) {
    return Api().delete(`/topics/${id}`)
  }
}