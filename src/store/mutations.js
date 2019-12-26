import LS from 'plugin/localstorage'
export default {
  saveUser(state, data) {
    state.User.token = data.token
    state.User.username = data.user
    LS.setItem('dev_user_token', data.token, 604800)
    LS.setItem('dev_username', data.user, 604800)
  },

  getUser(state) {
    state.User.token = LS.getItem('dev_user_token')
    state.User.username = LS.getItem('dev_username')
  },


}
