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
                    Vue.toasted.error('450: 认证已失效，请先登录', {icon: 'check'})
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.path},
                    })
                }
                break
            // 没有对应资源
            case 404:
                Vue.toasted.error('404: NOT FOUND', {icon: 'fingerprint'})
                router.back()
                break
        }
    }
    return Promise.reject(error)
})
export default service;