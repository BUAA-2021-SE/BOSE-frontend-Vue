import Vue from 'vue'
import axios from 'axios'
import store from '../store.js'
import router from '../router'
const service = axios.create({
    baseURL: 'http://43.138.58.36:8000/',//服务器
    timeout: 10000 //超时时间
});
// 请求拦截器
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function(error){
    return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(function(response) {
    return response
}, function (error) {
    // Do something with request error
    if(error.response){
        switch (error.response.status) {
            // 450 UNAUTHORIZED token过期,要求用户重新登录
            case 450:
                // 清除 Token 及 已认证 等状态
                store.logoutAction();
                // 跳转到登录页
                if (router.currentRoute.path !== '/login') {
                    Vue.toasted.error('认证已失效，请先登录', {icon: 'check'})
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.path},
                    })
                }
                break
            // 452 404 没有对应资源
            case 404:
            case 452:
                Vue.toasted.error('未找到资源', {icon: 'check'})
                router.back()
                break
            // 453 没有博文编辑权限
            case 453:
                Vue.toasted.error('没有编辑权限', {icon: 'check'})
                router.back()
                break
            case 251:
                Vue.toasted.error('很遗憾，您已被对方拉黑', {icon: 'check'})
                router.back()
                break
        }
    }
    return Promise.reject(error)
})
export default service;