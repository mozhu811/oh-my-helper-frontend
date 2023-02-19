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
// 在应用程序的入口文件中，设置 axios 的拦截器

// 创建一个新的 Vue 实例作为全局事件的触发器
const eventBus = new Vue()

// 将 eventBus 挂载到 Vue 的原型上，这样它就可以在所有组件中使用
Vue.prototype.$eventBus = eventBus

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    eventBus.$emit('requestError', error.message)
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
