import LS from 'plugin/localstorage'
export default {
  saveUser(state, data) {
    state.User.token = data.token
    state.User.username = data.user
    LS.setItem('dev_user_token', data.token, 604800 * 1000)
    LS.setItem('dev_user', {'id': data.id, username: data.user}, 604800 * 1000)
  },

  getUser(state) {
    state.User.token = LS.getItem('dev_user_token')
    const userInfo =LS.getItem('dev_user')
    state.User.username = userInfo.username
    state.User.id = userInfo.id
  },

}
