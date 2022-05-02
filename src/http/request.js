import axios from 'axios'
import store from '../store.js'
const service = axios.create({
    // baseURL: 'http://43.138.58.36:8000/',
    baseURL: 'http://localhost:8000/',
    timeout: 5000
});
service.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, function (error) {
    // Do something with request error
    switch  (error.response.status) {
        case 401:
          // 清除 Token 及 已认证 等状态
          store.logoutAction()
          // 跳转到登录页
          if (router.currentRoute.path !== '/login') {
            Vue.toasted.error('401: 认证已失效，请先登录', { icon: 'fingerprint' })
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.path },
            })
          }
          break
    
        case 404:
          Vue.toasted.error('404: NOT FOUND', { icon: 'fingerprint' })
          router.back()
          break
      }
    return Promise.reject(error)
  })
export default service;