import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueCookies from 'vue-cookies'
import './assets/css/global.less'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueCookies)
axios.defaults.withCredentials = true
Vue.prototype.axios = axios
// const host = 'https://api.cruii.io/bilibili/'
const host = '/api/hh-web-service/'
axios.defaults.baseURL = host

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
