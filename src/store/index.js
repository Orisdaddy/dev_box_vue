import Vue from 'vue'
import Vuex from 'vuex'
import Getters from './getters'
import Actions from './actions'
import Mutations from './mutations'
import User from "./modules/User";

Vue.use(Vuex)

const State = {

}

export default new Vuex.Store({
  state: State,
  getters: Getters,
  mutations: Mutations,
  actions: Actions,
  modules: {
    User
  }
})
