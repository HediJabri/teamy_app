import Api from '@/services/Api'

export default {
  get (id) {
    return Api().get(`/memberships/${id}`)
  },
  post (body) {
    return Api().post(`/memberships`, body)
  },
  postValidated (body) {
    return Api().post(`/memberships/validated`, body)
  },
  patch (id, body) {
    return Api().patch(`/memberships/${id}`, body)
  },
  desactivate (id, type) {
    return Api().patch(`/memberships/${id}/desactivate/${type}`)
  },
  delete (id, type) {
    return Api().delete(`/memberships/${id}/${type}`)
  }
}