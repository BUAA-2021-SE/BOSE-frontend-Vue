<template>
  <div class="container">
  <!-- 项目进度 -->
    <alert 
      v-for="(alert, index) in alertsFilter" :key="index"
      :variant="alert.alertVariant"
      :message="alert.alertMessage">
    </alert>
    <!-- 用户博客添加 -->
    <v-form v-if="sharedState.is_authenticated"  class="g-mb-40">
    <!-- <div class="form-group" :class="{'u-has-error-v1': postForm.titleError}" >
      <input type="text" v-model="postForm.title" class="form-control" id="post_title" placeholder="标题">
      <small class="form-control-feedback" v-show="postForm.titleError">{{ postForm.titleError }}</small>
    </div> -->
    <label >标题</label>
    <v-text-field
        v-model="postForm.title"
       
        solo
        dense
        placeholder=""
       :class="{'is-invalid': postForm.titleError}"
      ></v-text-field>
    <!-- <div class="form-group">
      <input type="text" v-model="postForm.summary" class="form-control" id="post_summary" placeholder="摘要">
    </div> -->
    <label >摘要</label>
    <v-text-field
        v-model="postForm.summary"
        solo
        dense
        placeholder=""
       :class="{'is-invalid': postForm.summaryError}"
      ></v-text-field>
      <label >正文</label>
  
      <mavon-editor v-model="postForm.body" :toolbars="tools" />
   
    <!-- 
    <v-textarea
        v-model="postForm.body"
       
        outlined
        dense
        placeholder=""
       :class="{'is-invalid': postForm.bodyError}"
      ></v-textarea> -->
      <v-alert dense type="error" v-show="this.postForm.errors" >{{ postForm.titleError || postForm.summaryError || postForm.bodyError}}</v-alert>
    <button  class="btn btn-primary" @click="onSubmitAdd">Submit</button>
    </v-form>
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
      <!-- <p>echo17666</p> -->
      <div class="text--primary">
        {{post.summary}}
      </div>
    </v-card-text>
    <v-card-actions>
    <router-link
    :to = "{name:'Post',params:{id:post.id} }"
    >
    <v-btn
      text
      color="deep-purple accent-4"
    >
      阅读全文
    </v-btn>
    </router-link>
    <v-btn
    v-if="post.author.id==sharedState.user_id"
      text
      color="deep-purple accent-4"
      @click="showDeleteDialog(post.id)"
    >
      删除
    </v-btn>
    <router-link
    :to = "{name:'PostEdit',params:{id:post.id} }">
    <v-btn
    v-if="post.author.id==sharedState.user_id"
      text
      color="deep-purple accent-4"
    >
      编辑
    </v-btn>
    </router-link>
    </v-card-actions>
    </v-card>
    <span>共有博文{{total}}篇</span>
    <v-pagination
      v-model="page"
      :length="pageTotal"
      :total-visible="7"
      circle
    ></v-pagination>
    <!-- 删除弹出框 -->
    <v-dialog
    v-model="showDelete">
     <v-card>
     <v-card-title>
     Are you sure you want to delete?
     </v-card-title>
        <v-card-actions>
          <v-btn
          color="primary"
          text
          @click="showDelete= false"
          >
          Quit
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="danger"
            text
            @click="onDeletePost"
          >
            Confirm
          </v-btn>
        </v-card-actions>
     </v-card>
    </v-dialog>
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
        bodyError: false,
        summaryError: false
      },
      showDelete: false,
      deleteId:0,
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
      page:1, //第几页
      size:5, //每页总数
      pageTotal:1 //总页数
    }
  },
  watch:{
    page:function(newPage,oldPage){
      this.getPosts(newPage)
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
    getPosts(page){
      Post.getAllBlog(page,this.size)
      .then((res)=>{
        console.log(res.data,"getPosts");
          this.posts = res.data.items;
          this.total = res.data.total
          this.page = res.data.page
          this.size = res.data.size
          this.pageTotal =Math.ceil(this.total/this.size)
      })
    },
    showDeleteDialog(id){
      this.deleteId = id;
      this.showDelete = true;
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
      console.log("onDelete",this.deleteId);
          Post.deleteBlog(this.deleteId)
          .then((res)=>{
            console.log(res);
            this.deleteId = 0;
            this.showDelete=false;
            this.$toasted.success(res.data,
            {
              icon:'check',
              fullWidth: true,
              position: "bottom-center"
            })
            this.getPosts(1)
          })
          .catch((err)=>{
            console.error(err,"not deleted");
          })
    },
    onSubmitAdd(){
      this.postForm.errors = 0;
      this.postForm.title=this.postForm.title.trim()
      this.postForm.summary=this.postForm.summary.trim()
      this.postForm.body=this.postForm.body.trim()

      if(this.postForm.title==""){
          this.postForm.errors++;
          console.log("aaa");
          this.postForm.titleError="Please Enter Title"
      }else{
        this.postForm.titleError=null
      }
      if(this.postForm.summary==""){
          this.postForm.errors++;
          this.postForm.summaryError="Please Enter Summary"
      }else{
        this.postForm.summaryError=null
      }
      if(this.postForm.body==""){
          this.postForm.errors++;
          this.postForm.bodyError="You Should Write Something"
      }else{
        this.postForm.bodyError=null
      }
      if (this.postForm.errors>0) {
        return false;
      }
      const payload = new FormData();
      payload.append('title',this.postForm.title);
      payload.append('summary',this.postForm.summary);
      payload.append('body',this.postForm.body);
      console.log("onSubmitAdd");
      Post.postBlog(payload)
        .then((res) => {
          console.log(res);
          this.postForm.title=''
          this.postForm.summary=''
          this.postForm.body=''
          this.getPosts(1);
        })
        .catch((error) => {
          console.log(error.data);
          console.log(error);
        })
    },
  },
  created(){
    this.getPosts(1)
  },
  beforeRouteUpdate (to, from, next) {
    // 注意：要先执行 next() 不然 this.$route.query 还是之前的
    next()
    this.getPosts(1)
  }
}
</script>