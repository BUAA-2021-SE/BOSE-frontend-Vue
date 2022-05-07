<template>
  <div class="container">
  <!-- 项目进度 -->
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <!-- 用户博客添加 -->
    <form v-if="sharedState.is_authenticated"  class="g-mb-40">
    <div class="form-group" :class="{'u-has-error-v1': postForm.titleError}" >
      <input type="text" v-model="postForm.title" class="form-control" id="post_title" placeholder="标题">
      <small class="form-control-feedback" v-show="postForm.titleError">{{ postForm.titleError }}</small>
    </div>
    <div class="form-group">
      <input type="text" v-model="postForm.summary" class="form-control" id="post_summary" placeholder="摘要">
    </div>
    <div class="form-group">
      <mavon-editor v-model="postForm.body" :toolbars="tools" />
      <small class="form-control-feedback" v-show="postForm.bodyError">{{ postForm.bodyError }}</small>
    </div>
    <button  class="btn btn-primary" @click="onSubmitAdd">Submit</button>
    </form>
    <div>
    <v-card
    class="mx-auto"
    v-for="(post, index) in posts"
    :key="index"
    >
    <router-link
    :to = "{name:'Post',params:{id:post.id} }"
    >
    <v-card-title>
    {{post.title}}
    </v-card-title>
    </router-link>
    <v-card-text>
      <p>{{post.author.name || post.author.username}}</p>
      <div class="text--primary">
        {{post.summary}}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
    </v-card>
    </div>
    </div>
</template>


<script>
import Alert from './base/Alert.vue'
import store from '../store.js'
import VueMarkdown from 'vue-markdown'
import Post from '@/api/post'
export default {
  name: 'Home',  
  components: {
    alert: Alert,
    VueMarkdown
  },
  data () {
    return {
      sharedState: store.state,
      alerts: [
        {
          showAlert: true,
          alertVariant: 'danger',
          alertMessage: 'sign in 写完了'
        },
        {
          showAlert: true,
          alertVariant: 'info',
          alertMessage: 'register 也写完了'
        },
        {
          showAlert: true,
          alertVariant: 'success',
          alertMessage: 'reset 又写完了'
        },
        {
          showAlert: true,
          alertVariant: 'dark',
          alertMessage: 'Profile初步完工'
        },
        {
          showAlert: true,
          alertVariant: 'primary',
          alertMessage: 'Markdown在线编辑器写完了'
        },
      ],
      posts: '',
      postForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      },
      editPostForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      },
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
    }
  },
  computed:{
      alertsFilter: function(){
          return this.alerts.filter((alert)=>{
              return alert.showAlert;
          })
      }
  },
  methods:{
    getPosts(){
      Post.getAllBlog(1,3)
      .then((res)=>{
        console.log(res.data.items,"getPosts");
          this.posts = res.data.items;
      })
    },
    onEditPost(){
      console.log("onEditPost");
    },
    onSubmitUpdate(){
      console.log("onSubmitUpdate");
    },
    onResetUpdate(){
      console.log("onResetUpdate");
    },
    onDeletePost(){
      console.log("onDeletePost");
    },
    onSubmitAdd(){
      const payload = new FormData();
      payload.append('title',this.postForm.title);
      payload.append('summary',this.postForm.summary);
      payload.append('body',this.postForm.body);
      console.log("onSubmitAdd");
      Post.postBlog(payload)
        .then((res) => {
          console.log(res);
          this.$router.push({
                name: 'Profile',
                params: { id: this.sharedState.user_id }                
                });
        })
        .catch((error) => {
          console.log(error.data);
          console.log(error);
        })
    }
  },
  created(){
    this.getPosts()
  },
  beforeRouteUpdate (to, from, next) {
    // 注意：要先执行 next() 不然 this.$route.query 还是之前的
    next()
    this.getPosts()
  }
}
</script>