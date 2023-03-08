import Vue from 'vue'
import VueRouter from 'vue-router'
import Bilibili from '../views/Bilibili.vue'
import Error from '../views/Error.vue'
import ComingSoon from '../views/ComingSoon.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/bilibili',
    children: [
      {
        path: '/bilibili',
        name: 'bilibili',
        component: Bilibili
      },
      {
        path: '/new',
        name: 'new',
        component: ComingSoon
      },
      {
        path: '/error',
        name: 'error',
        component: Error
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
