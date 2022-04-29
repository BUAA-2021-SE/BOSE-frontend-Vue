import Vue from 'vue'
import VueRouter from 'vue-router'
import Ping from '@/components/Ping'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ping',
    name:'Ping',
    component: Ping
  },
  {
    path: '/login',
    name:'Login',
    component: Login
  },
  {
    path: '/register',
    name:'Register',
    component: Register
  },
  {
    path: '/profile',
    name:'Profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach(()=>{

})
export default router
