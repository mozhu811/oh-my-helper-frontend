import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './assets/css/global.less'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
const host = 'https://api.cruii.io/bilibili/'
axios.defaults.baseURL = host

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
