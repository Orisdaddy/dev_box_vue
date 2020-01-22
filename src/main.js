import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import * as filters from './filters'

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

Vue.config.productionTip = false
Vue.use(ViewUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
