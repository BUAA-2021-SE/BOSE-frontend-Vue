<template>
  <div class="container">
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <form v-if="sharedState.is_authenticated"  class="g-mb-40">
    <div class="form-group" :class="{'u-has-error-v1': postForm.titleError}" >
      <input type="text" v-model="postForm.title" class="form-control" id="post_title" placeholder="标题">
      <small class="form-control-feedback" v-show="postForm.titleError">{{ postForm.titleError }}</small>
    </div>
    <div class="form-group">
      <input type="text" v-model="postForm.summary" class="form-control" id="post_summary" placeholder="摘要">
    </div>
    <div class="form-group">
      <mavon-editor v-model="postForm.body"/>
      <small class="form-control-feedback" v-show="postForm.bodyError">{{ postForm.bodyError }}</small>
    </div>
    <button  class="btn btn-primary" @click="aaa">Submit</button>
    </form>
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
      }
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
      console.log("getPosts");
    },
    // onSubmitAdd(){
    //   console.log("onSubmitAdd");
    // },
    // onEditPost(){
    //   console.log("onEditPost");
    // },
    // onSubmitUpdate(){
    //   console.log("onSubmitUpdate");
    // },
    // onResetUpdate(){
    //   console.log("onResetUpdate");
    // },
    // onDeletePost(){
    //   console.log("onDeletePost");
    // },
    aaa(){
      const payload = new FormData();
      payload.append('title',this.postForm.title);
      payload.append('summary',this.postForm.summary);
      payload.append('body',this.postForm.body);
      Post.postBlog(payload)
        .then((res) => {
          console.log(res);
          // this.$router.push('/login');
          // store.setNewAction();
          this.$router.push({
                name: 'Profile',
                params: { id: this.sharedState.user_id }                
                });
        })
        .catch((error) => {
          console.log(error.data);
          // for (let field in error.response.data.detail) {
          //   if (field == 'username') {
          //     this.registerForm.usernameError = error.response.data.detail.username
          //   } else if (field == 'email') {
          //     this.registerForm.emailError = error.response.data.detail.email
          //   } else if (field == 'password') {
          //     this.registerForm.passwordError = error.response.data.detail.password
          //   }else if (field == 'password2') {
          //     this.registerForm.password2Error = error.response.data.detail.password2
          //   }
          //   else if (field == 'identifying_code') {
          //     this.registerForm.idcodeError = error.response.data.detail.identifying_code
          //   }
          // }
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