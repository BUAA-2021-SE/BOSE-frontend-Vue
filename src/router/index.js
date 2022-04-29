import Vue from 'vue'
import VueRouter from 'vue-router'
import Ping from '@/components/Ping'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'
Vue.use(VueRouter)
const router = new VueRouter({
  routes:[
    {
      path: '/',
      name: 'Home',
      component: Home,
      // 添加了路由元信息，只有经过身份验证的用户才能进行操作
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/ping',
      name:'Ping',
      component: Ping,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name:'Login',
      component: Login,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name:'Register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name:'Profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
// https://router.vuejs.org/zh/guide/advanced/meta.html
// $route.matched数组记录了路由匹配到的所有路由记录
// js中的some方法用于检测数组中是否存在元素符合条件，若存在则返回true
// fullPath = path + query + hash
router.beforeEach((to,from,next)=>{
  const token = window.localStorage.getItem('token');
  if(to.matched.some(record=>record.meta.requiresAuth)&&(!token || token === null)){
    next({
      path:'/login',
      query:{redirect:to.fullPath}
    });
  }
  else if(token && to.name == 'Login'){
    next({
      path: from.fullPath
    });
  }
  else{
    next();
  }
})
export default router
