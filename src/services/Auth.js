import Api from '@/services/Api'
import store from '@/stores/store'
import router from '@/router'

export default {
  // Register actions
  register(body) {
    return Api().post('/users/signup', body)
  },
  registerWithFb(body) {
    return Api().post('/users/oauth/facebook', body)
  },
  // Login Actions
  login (creds) {
    return Api().post('/users/signin', creds)
  },
  loginWithFb(creds) {
    return Api().post('/users/oauth/facebook', creds)
  },
  logout () {
    this.destroyToken()
    this.destroyUser()
    this.destroyTeam()
    store.dispatch('resetNotifications')
    store.dispatch('resetUser')
    store.dispatch('resetTeam')
    router.push('/login')
  },
  loggedIn () {
    return this.getToken()
  },
  // localStorage Token Actions
  setToken (token) {
    localStorage.setItem('authToken', token);
  },
  destroyToken () {
    localStorage.removeItem('authToken');
  },
  getToken () {
    let token = localStorage.getItem('authToken');
    token ? token : token = null
    return token;
  },
  // localStorage User Actions
  setUser (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },
  destroyUser () {
    localStorage.removeItem('user');
  },
  getUserId () {
    let user = JSON.parse(localStorage.getItem('user')).id;
    user ? user : user = null
    return user;
  },
  // localStorage Team Token
  setTeam (team) {
    localStorage.setItem('team', JSON.stringify(team))
  },
  destroyTeam () {
    localStorage.removeItem('team');
  },
  getTeam () {
    let team = JSON.parse(localStorage.getItem('team'));
    team ? team : team = null
    return team;
  },
}