import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home.vue'
const PostMan = () => import('views/PostMan')
const MarkDown = () => import('views/MarkDown')
const Machine = () => import('views/Machine')
const Login = () => import('views/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/postman',
    component: PostMan
  },
  {
    path: '/markdown',
    component: MarkDown
  },
  {
    path: '/machine',
    component: Machine
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
