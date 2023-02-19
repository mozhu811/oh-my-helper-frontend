import Vue from 'vue'
import VueRouter from 'vue-router'
import Bilibili from '../views/Bilibili.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'bilibili'
  },
  {
    path: '/bilibili',
    name: 'bilibili',
    component: Bilibili
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
