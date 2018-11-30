import Api from '@/services/Api'

export default {
  getSports () {
    return Api().get(`/sports`)
  }
}