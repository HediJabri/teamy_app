import Api from '@/services/Api'

export default {
  post (body) {
    return Api().post(`/comments`, body)
  },
  patch (id, body) {
    return Api().patch(`/comments/${id}`, body)
  },
  delete (id) {
    return Api().delete(`/comments/${id}`)
  }
}