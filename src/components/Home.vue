<template>
  <div class="container">
    <!-- 项目进度 -->
    <alert
        v-for="(alert, index) in alertsFilter" :key="index"
        :variant="alert.alertVariant"
        :message="alert.alertMessage">
    </alert>
    <div>
      <blog v-for="(post,index) in posts" :key="index"
      :post = "post"
      @delete="getPosts(1)">
      </blog>
      <span>共有博文{{ total }}篇</span>
      <v-pagination
          v-model="page"
          :length="pageTotal"
          :total-visible="7"
          circle
      ></v-pagination>
    </div>
  </div>
</template>


<script>
import Alert from './base/Alert.vue'
import store from '../store.js'
import VueMarkdown from 'vue-markdown'
import Post from '@/api/post'
import BlogItem from '@/components/base/BlogItem.vue'
export default {
  name: 'Home',
  components: {
    alert: Alert,
    VueMarkdown,
    blog: BlogItem
  },
  data() {
    return {
      sharedState: store.state,
      alerts: [
        {
          showAlert: true,
          alertVariant: 'danger',
          alertMessage: 'sign in, register, reset, Markdown写完了'
        },
        {
          showAlert: true,
          alertVariant: 'dark',
          alertMessage: 'Profile, Home初步完工'
        },
        {
          showAlert: true,
          alertVariant: 'primary',
          alertMessage: '这周写follow相关组件'
        },
        {
          showAlert: true,
          alertVariant: 'warning',
          alertMessage: '花开一季 叶落一地'
        },
      ],
      posts: '',
      tools: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        navigation: true, // 导航目录
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      total: 0, //总博文数
      page: 1, //第几页
      size: 5, //每页总数
      pageTotal: 1 //总页数
    }
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getPosts(newPage)
    }
  },
  computed: {
    alertsFilter: function () {
      return this.alerts.filter((alert) => {
        return alert.showAlert;
      })
    }
  },
  methods: {
    getPosts(page) {
      Post.getAllBlog(page, this.size)
          .then((res) => {
            console.log(res.data, "getPosts");
            this.posts = res.data.items;
            this.total = res.data.total
            this.page = res.data.page
            this.size = res.data.size
            this.pageTotal = Math.ceil(this.total / this.size)
          })
    }
  },
  created() {
    this.getPosts(1)
  },
  beforeRouteUpdate(to, from, next) {
    //要先执行 next() 不然 this.$route.query 还是之前的
    next()
    this.getPosts(1)
  }
}
</script>