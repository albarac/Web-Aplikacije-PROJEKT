import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'
import Details from '../views/Details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/post',
    name: 'post',
    component: Post
  },
  {
    path: '/details/:id',
    props:true,
    name: 'details',
    component: Details
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router