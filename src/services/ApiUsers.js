import Api from '@/services/Api'

export default {
  index (nextPage) {
    return Api().get(`/users/index/${nextPage}`)
  },
  get (id) {
    return Api().get(`/users/${id}`)
  },
  put (id, body) {
    return Api().put(`/users/${id}`, body)
  },
  patchAccount (id, body) {
    return Api().put(`/users/${id}/account`, body)
  },
  delete (id) {
    return Api().delete(`/users/${id}`)
  },
  sendMessage(body) {
    return Api().post(`/users/send_message`, body)
  }
}