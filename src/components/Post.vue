<template>
  <div class="container">
    <!-- Modal: Edit Post -->
    <v-dialog v-model="showEdit" fullscreen hide-overlay >
    <form v-if="sharedState.is_authenticated"  class="g-mb-40">
    <div class="form-group" :class="{'u-has-error-v1': editForm.titleError}" >
      <input type="text" v-model="editForm.title" class="form-control" id="post_title" placeholder="标题">
      <small class="form-control-feedback" v-show="editForm.titleError">{{ editForm.titleError }}</small>
    </div>
    <div class="form-group">
      <input type="text" v-model="editForm.summary" class="form-control" id="post_summary" placeholder="摘要">
    </div>
    <div class="form-group">
      <mavon-editor v-model="editForm.body" :toolbars="tools" />
      <small class="form-control-feedback" v-show="editForm.bodyError">{{ editForm.bodyError }}</small>
    </div>
    <v-card-actions>
      
      <v-btn
        color="blue darken-1"
        text
        @click="showEdit = false"
      >
        Close
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="onSubmitUpdate"
      >
        Submit
      </v-btn>
    </v-card-actions>
    </form>
    </v-dialog>
    <div class="row">
      <!-- Articles Content -->
      <div class="col-lg-9">
        
        <article class="g-mb-60 g-pt-15 g-pb-50">
          <header class="g-mb-30">
            <h1 class="g-color-primary g-mb-15">{{ post.title }}</h1>

            <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
                <button @click="onEditPost(post)" class="btn btn-xs u-btn-outline-purple g-mr-5" data-toggle="modal" data-target="#updatePostModal">编辑</button>
              </li>
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
                <button @click="showDelete=true" class="btn btn-xs u-btn-outline-red g-mr-5">删除</button>
              </li>
              <li class="list-inline-item">
                <span class="btn btn-xs u-btn-outline-aqua g-mr-10">评论</span>
              </li>
              <li v-if="post.author" class="list-inline-item">
                <router-link :to="{ name: 'Profile', params: { id: post.author.id }}" class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover">
                <span v-if="post.author.name">{{ post.author.name }}</span>
                <span v-else>{{ post.author.username }}</span></router-link>
              </li>
              <li class="list-inline-item g-mx-10">/</li>
              <li class="list-inline-item">
                <i class="icon-clock"></i> {{ $moment(post.timestamp).format('LLL') }}
              </li>
              <li class="list-inline-item g-mx-10">/</li>
              <li class="list-inline-item g-mr-10">
                <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover" href="#comment-list-wrap">
                  <i class="icon-bubble"></i> 0
                </a>
              </li>
              <li class="list-inline-item ml-auto">
                <i class="icon-eye"></i> {{ post.views }} 次阅读
              </li>
            </ul>

            <hr class="g-brd-gray-light-v4 g-my-15">
          </header>

          <div id="postBody" class="g-font-size-16 g-line-height-1_8 g-mb-30">
            <vue-markdown
              :source="post.body"
              :toc="showToc"
              :toc-first-level="1"
              :toc-last-level="3"
              @toc-rendered="tocAllRight"
              :emoji="true"
              toc-id="toc"
              class="markdown-body">
            </vue-markdown>
            
          </div>
        </article>
      </div>
      <!-- End Articles Content -->

      <!-- Sidebar -->
      <div class="col-lg-3 g-pt-80">

        <div id="sticker" class="g-mb-50">
          <div id="tocHeader" class="u-heading-v3-1 g-mb-15">
              <h2 class="h5 u-heading-v3__title g-color-primary text-uppercase g-brd-primary">文章目录</h2>
          </div>
          <div id="toc" class="toc"></div>
        </div>
        
      </div>
      <!-- End Sidebar -->
    </div>
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
</template>

<script>
import store from '@/store.js'
import VueMarkdown from 'vue-markdown'
import hljs from 'highlight.js'
import '../assets/jquery.sticky'
import Post from '@/api/post'
import $ from 'jquery'
const highlightCode = () => {
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
}
export default {
    name:'Post',
    components: {
        VueMarkdown
    },
    data(){
        return{
            items: [
                { title: 'Home', icon: 'mdi-home-city' },
                { title: 'My Account', icon: 'mdi-account' },
                { title: 'Users', icon: 'mdi-account-group-outline' }
            ],
            sharedState: store.state,
            post:{},
            editForm:{
                title: '',
                summary: '',
                body: '',
                errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
                titleError: false,
                bodyError: false
            },
            showToc:true,
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
            showEdit: false,
            showDelete: false, 
        }
    },
    methods:{
        getBlog(id){
            Post.getBlog(id)
            .then((res)=>{
                this.post = res.data;
                console.log(res.data,"res");
            })
            .catch((err)=>{
                console.error(err);
            })
        },
        onEditPost(){
            // 避免修改后显示未向后端提交的信息，不能使用对象引用赋值。
            this.editForm = Object.assign({},this.post);
            console.log(this.editForm,"editForm");
            this.showEdit = true
        },
        onSubmitUpdate(){
          this.showEdit = false;
            this.editForm.errors = 0;
            // $('.form-control-feedback').remove()
            // $('.form-group.u-has-error-v1').removeClass('u-has-error-v1')
            if (!this.editForm.title) {
                this.editForm.errors++
                this.editForm.titleError = 'Title is required.'
                // $('#editform_title').closest('.form-group').addClass('u-has-error-v1')  // Bootstrap 4
                // $('#editform_title').after('<small class="form-control-feedback">' + this.editForm.titleError + '</small>')
                } else {
                    this.editForm.titleError = null
                }
            if (!this.editForm.body) {
                this.editForm.errors++
                this.editForm.bodyError = 'Body is required.'
                // $('.md-editor').closest('.form-group').addClass('u-has-error-v1')  // Bootstrap 4
                // $('.md-editor').after('<small class="form-control-feedback">' + this.editForm.bodyError + '</small>')
            } else {
                this.editForm.bodyError = null
            }
            if (this.editForm.errors > 0) {
                // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
                console.log("表单验证没通过")
                return false
            }        
            // 先隐藏 Modal
        // $('#updatePostModal').modal('hide')
        const formData = new FormData();
        formData.append('title',this.editForm.title);
        formData.append('summary',this.editForm.summary);
        formData.append('body',this.editForm.body);
        Post.editPost(this.$route.params.id,formData)
        .then((res)=>{
            console.log(res);
            this.getBlog(this.editForm.id);
            this.$toasted.success('Successfully update the post.',{icon:'check'});
            this.editForm.title=''
            this.editForm.summary=''
            this.editForm.body=''
        })
        .catch((err)=>{
            console.error(err);
            this.$toasted.success('Successfully update the post.',{icon:'check'});
        })
        },
        onDeletePost(){
          Post.deleteBlog(this.$route.params.id)
          .then((res)=>{
            console.log(res);
            this.showDelete=false;
            this.$toasted.success(res.data,
            {
              icon:'check',
              fullWidth: true,
              position: "bottom-center"
            })
            this.$router.push('/')
          })
          .catch((err)=>{
            console.error(err,"not deleted");
          })
        },
        tocAllRight: function (tocHtmlStr) {
            // console.log("toc is parsed :", tocHtmlStr);
            // 必须等 vue-markdown 生成 TOC 之后，再用 jquery 操作 DOM!!!
            // 非默认的列表样式
            $('.toc').find('ul').addClass('u-list-inline');
            // 2、3级目录缩进
            $('.toc ul li ul li').addClass('g-ml-15');
            $('.toc ul li ul li ul li').addClass('g-ml-15');
            // 链接颜色，鼠标悬停颜色
            $('.toc').find('a').addClass('u-link-v5 g-color-aqua g-color-red--hover')
        }
    },
    created(){
        const postId = this.$route.params.id
        this.getBlog(postId);
        $(document).ready(function(){
            $("#sticker").sticky({ topSpacing: 10 });
        })
    },
    mounted(){
        highlightCode()
    },
    updated(){
        highlightCode()
    },
    beforeRouteUpdate(to, from,next){
    this.getBlog(to.params.id);
    next()
    }
}
</script>

<style>

</style>