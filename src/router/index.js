import Vue from 'vue'
import VueRouter from 'vue-router'
import Bilibili from '../views/Bilibili.vue'
import Error from '@/views/Error.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  },
  {
    path: '/error',
    name: 'error',
    component: Error
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
