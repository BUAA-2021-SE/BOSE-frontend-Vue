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
import Post from '@/components/blog/Blog'
import PostEdit from '@/components/blog/EditBlog'
import DraftEdit from '@/components/blog/EditDraft'
import ShowProfile from '@/components/account/ShowProfile'
import Followers from '@/components/profile/Followers'
import Following from '@/components/profile/Following'
import BlackList from '@/components/profile/BlackList'
import Posts from '@/components/contribution/Posts'
import Drafts from '@/components/contribution/Drafts'
import Resources from '@/components/contribution/Resources'
import Stars from '@/components/contribution/Stars'
import BlogAdd from '@/components/blog/AddBlog'
import PostAdd from '@/components/blog/AddPost'
import ResourceAdd from '@/components/resource/AddResource'
import Contribution from '@/components/account/Contribution'
import Search from '@/components/base/Search'

// 用户通知
import Notifications from '@/components/notifications/Notifications'
import ReceivedComments from '@/components/notifications/ReceivedComments'
import Likes from '@/components/notifications/Likes'
import FollowingPosts from '@/components/notifications/FollowingPosts'
import History from '@/components/notifications/History'
import ReceivedMessages from '@/components/notifications/message/Index'
import HistoryMessage from '@/components/notifications/message/HistoryMessage'
import MessageList from '@/components/notifications/message/MessageList'

// 管理后台
import Admin from '@/components/admin/Admin'
import AdminBlogs from '@/components/admin/Blogs'
import ExaminingBlogs from '@/components/admin/ExaminingBlogs'
import AdminResources from '@/components/admin/Resources'
import ExaminingResources from '@/components/admin/ExaminingResources'
Vue.use(VueRouter)
Vue.use(mavonEditor)
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path:'/admin',
            component: Admin,
            meta:{
                requiresAuth: true,
                requiresAdmin: true
            },
            children: [
                {path:'', component:AdminBlogs},
                {path:'blogs', name: 'AdminBlogs', component: AdminBlogs },
                {path:'examinblogs', name: 'ExaminingBlogs', component: ExaminingBlogs },
                {path:'resources', name: 'AdminResources', component: AdminResources },
                {path:'examinresources', name: 'ExaminingResources', component: ExaminingResources }
            ]
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
            path: '/draftedit/:id',
            name: 'DraftEdit',
            component: DraftEdit,
        },
        {
            path: '/addpost/:id',
            component: PostAdd,
            name:'PostAdd',
            children: [
                {path:'blog',name:'BlogAdd',component: BlogAdd},
                {path:'resource',name:'ResourceAdd',component: ResourceAdd}
            ]
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
                {path: 'posts', name: 'ProfilePosts', component: Posts},
                {path: 'blacklist', name: 'BlackList', component: BlackList}
            ]
        },
        {
            path: '/contribution/:id',
            component: Contribution,
            meta: {
                requiresAuth: true
            },
            children: [
                {path: '', component: Drafts},
                {path: 'drafts', name: 'Drafts', component: Drafts},
                {path: 'posts', name: 'DraftPosts', component: Posts},
                {path: 'resources', name: 'Resources', component: Resources},
                {path: 'stars', name: 'Stars', component: Stars}
            ]
        },
        {
            path: '/user/:id/edit',
            name: 'EditProfile',
            component: EditProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/notifications',
            component: Notifications,
            meta: {
                requiresAuth: true
            },
            children: [
                {path: '', component: ReceivedComments},
                {path: 'comments', name: 'ReceivedComments', component: ReceivedComments},
                {path: 'messages', component: ReceivedMessages,
                    children: [
                        {path:'',component:MessageList},
                        {path:'message_list', name: 'MessageList', component:MessageList},
                        {path:'history_message/:id',name: 'HistoryMessage',component: HistoryMessage}
                    ]
                },
                {path: 'likes', name: 'Likes', component: Likes},
                {path: 'following-posts', name: 'FollowingPosts', component: FollowingPosts},
                {path: 'history', name:'History',component: History}
            ]
        },
        {
            path: '/search/:keyword',
            name: 'Search',
            component: Search
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
    let user_perms = false;
    if(token){
        let str = token.split('$$$');
        if(str.length>2 && str[2]==='$$admin'){
            user_perms = true;
        }
    }
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
    // 404
    else if (to.matched.length === 0) {
        Vue.toasted.error('404: Not Found', { icon: 'check' })
        if (from.name) {
            next({
              name: from.name
            })
          } else {
            next({
              path: '/'
            })
          }
    }
    // 管理员权限界面
    else if(to.matched.some(record => record.meta.requiresAdmin) && token && !user_perms){
        Vue.toasted.error('403: Forbidden', { icon: 'fingerprint' });
        next({
            path: '/'
          })
    }
    // 无操作
    else {
        next();
    }
})
export default router
