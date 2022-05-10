import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToasted  from 'vue-toasted'
import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@mdi/font/css/materialdesignicons.css'
import * as echarts from 'echarts';
import mavonEditor from 'mavon-editor'
import VueSweetalert2 from 'vue-sweetalert2'
// 导入highlight.js的CSS文件
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import 'mavon-editor/dist/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/icon-awesome/css/font-awesome.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/icon-line/css/simple-line-icons.css'
import './assets/icon-material/material-icons.css'
// 导入markdownCSS
import './assets/markdown-styles/github-markdown.css'
import vuetify from "./plugins/vuetify";
// 关闭production模式
Vue.config.productionTip = false
// 使用moment.js库将后端UTC时间格式化成本地时间
Vue.prototype.$moment = moment
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.use(mavonEditor);
Vue.use(VueSweetalert2);
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})
Vue.use(VueToasted, {
  // 主题样式 primary/outline/bubble
  theme: 'outline',
  // 显示在页面哪个位置
  position: 'top-center',
  // 显示多久时间（毫秒）
  duration: 15000,
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
  vuetify,
  render: h => h(App)
}).$mount('#app')
