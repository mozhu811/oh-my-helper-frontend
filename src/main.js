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

Vue.prototype.getCookie = function (cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim()
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length)
  }
  return null
}
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
