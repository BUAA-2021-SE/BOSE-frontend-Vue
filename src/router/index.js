import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Login from '@/components/account/Login'
import Register from '@/components/account/Register'
import Reset from '@/components/account/Reset'
import Profile from '@/components/account/Profile'
import Ping from '@/components/Ping'
import EditProfile from '@/components/account/EditProfile'
import Post from '@/components/Blog/Blog'
import PostEdit from '@/components/Blog/EditBlog'
import ShowProfile from '@/components/account/ShowProfile'
import Followers from '@/components/profile/Followers'
import Following from '@/components/profile/Following'
import Posts from '@/components/profile/Posts'
import PostAdd from '@/components/Blog/AddBlog'

Vue.use(VueRouter)
Vue.use(mavonEditor)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/post/:id',
            name: 'Post',
            component: Post,
        },
        {
            path: '/postedit/:id',
            name: 'PostEdit',
            component: PostEdit,
        },
        {
            path: '/postadd/:id',
            name: 'PostAdd',
            component: PostAdd
        },
        {
            path: '/ping',
            name: 'Ping',
            component: Ping
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/reset',
            name: 'Reset',
            component: Reset
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/user/:id',
            // name:'Profile',
            component: Profile,
            // 添加了路由元信息，只有经过身份验证的用户才能进行操作
            meta: {
                requiresAuth: true
            },
            children: [
                {path: '', component: ShowProfile},
                {path: 'profile', name: 'ShowProfile', component: ShowProfile},
                {path: 'followers', name: 'Followers', component: Followers},
                {path: 'following', name: 'Following', component: Following},
                {path: 'posts', name: 'Posts', component: Posts}
            ]
        },

        {
            path: '/user/:id/edit',
            name: 'EditProfile',
            component: EditProfile,
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
// hash总是以#开头，如果URL中没有hash则为空
/* 
*URL由
*协议 
*主机 host（主机名或IP地址） 
*端口 port（省略时为默认端口，如http的默认端口为80） 
*路径 path（由0个或多个/隔开的字符串） 
*查询 query（可有多个参数，用'&'隔开，参数的值和名用'='隔开） 
*信息片段 fragment（字符串，锚点）
*/
// query从URL的search部分提取的已解码查询参数的字典
router.beforeEach((to, from, next) => {
    const token = window.localStorage.getItem('token');
    // 有权限且未登录
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        next({
            path: '/login',
            query: {redirect: to.fullPath}
        });
    }
    // 已登录后不能重复登录
    else if (token && to.name == 'Login') {
        next({
            path: from.fullPath
        });
    }
    // 无操作
    else {
        next();
    }
})
export default router
