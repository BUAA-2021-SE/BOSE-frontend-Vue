import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToasted  from 'vue-toasted'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icon-line/css/simple-line-icons.css'
import './assets/icon-material/material-icons.css'
// 关闭production模式
Vue.config.productionTip = false
// 使用moment.js库将后端UTC时间格式化成本地时间
Vue.prototype.$moment = moment
Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'outline',
  // 显示在页面哪个位置
  position: 'top-center',
  // 显示多久时间（毫秒）
  duration: 3000,
  // 支持哪个图标集合
  iconPack : 'material', // set your iconPack, defaults to material. material|fontawesome|custom-class
  // 可以执行哪些动作
  action: {
    text: 'Cancel',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  },
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
