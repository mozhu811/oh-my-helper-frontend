import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ContainerLog from '@/views/ContainerLog'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logs',
    name: 'logs',
    component: ContainerLog
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
