<template>
  <div class="container">
    <!-- Modal: Edit Post -->
    <div class="modal fade" id="updatePostModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updatePostModalTitle">Update Post</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="onSubmitUpdate" @reset.prevent="onResetUpdate">
              <div class="form-group" :class="{'u-has-error-v1': editForm.titleError}">
                <input type="text" v-model="editForm.title" class="form-control" id="editform_title" placeholder="标题">
                <small class="form-control-feedback" v-show="editForm.titleError">{{ editForm.titleError }}</small>
              </div>
              <div class="form-group">
                <input type="text" v-model="editForm.summary" class="form-control" id="editform_summary" placeholder="摘要">
              </div>
              <div class="form-group">
                <textarea v-model="editForm.body" class="form-control" id="editform_body" rows="5" placeholder=" 内容"></textarea>
                <small class="form-control-feedback" v-show="editForm.bodyError">{{ editForm.bodyError }}</small>
              </div>
              <button type="reset" class="btn btn-secondary">Cancel</button>
              <button type="submit" class="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal: Edit Post -->

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
                <button @click="onDeletePost(post)" class="btn btn-xs u-btn-outline-red g-mr-5">删除</button>
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
            
            <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
            要指定TOC的级数哦，如果要修改TOC的样式，要在toc-rendered指定的函数中操作，因为要等它把TOC给创建出来
             -->
            <vue-markdown
              :source="post.body"
              :toc="showToc"
              :toc-first-level="1"
              :toc-last-level="3"
              v-on:toc-rendered="tocAllRight"
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
            post:{
                body:"# nihao",
                author:{
                    name:'LLLeo',
                    id:'3'
                }
            },
            editForm:{
                title: '',
                summary: '',
                body: '',
                errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
                titleError: false,
                bodyError: false
            },
            showToc:true
        }
    },
    methods:{
        getPost(id){
            Post.getPost(id)
            .then((res)=>{
                this.post = res.data;
            })
            .catch((err)=>{
                console.error(err);
            })
        },
        onEditPost(){
            // 避免修改后显示未向后端提交的信息，不能使用对象引用赋值。
            this.editForm = Object.assign({},post);
        },
        onSubmitUpdate(){
            this.editForm.errors = 0;
            $('.form-control-feedback').remove()
            $('.form-group.u-has-error-v1').removeClass('u-has-error-v1')
            if (!this.editForm.title) {
                this.editForm.errors++
                this.editForm.titleError = 'Title is required.'
                // boostrap4 modal依赖jQuery，不兼容 vue.js 的双向绑定。所以要手动添加警示样式和错误提示
                $('#editform_title').closest('.form-group').addClass('u-has-error-v1')  // Bootstrap 4
                $('#editform_title').after('<small class="form-control-feedback">' + this.editForm.titleError + '</small>')
                } else {
                    this.editForm.titleError = null
                }
            if (!this.editForm.body) {
                this.editForm.errors++
                this.editForm.bodyError = 'Body is required.'
                // boostrap4 modal依赖jQuery，不兼容 vue.js 的双向绑定。所以要手动添加警示样式和错误提示
                // 给 bootstrap-markdown 编辑器内容添加警示样式，而不是添加到 #post_body 上
                $('.md-editor').closest('.form-group').addClass('u-has-error-v1')  // Bootstrap 4
                $('.md-editor').after('<small class="form-control-feedback">' + this.editForm.bodyError + '</small>')
            } else {
                this.editForm.bodyError = null
            }
            if (this.editForm.errors > 0) {
                // 表单验证没通过时，不继续往下执行，即不会通过 axios 调用后端API
                return false
            }        
            // 先隐藏 Modal
      $('#updatePostModal').modal('hide')
      const formData = new FormData();
      formData.append('title',this.editForm.title);
      formData.append('summary',this.editForm.summary);
      formData.append('body',this.editForm.body);
      Post.editPost(id,formData)
      .then((res)=>{
          console.log(res);
          this.getPost(this.editForm.id);
          this.$toasted.success('Successfully update the post.',{icon:'check'});
          this.editForm.title=''
          this.editForm.summary=''
          this.editForm.body=''
      })
      .catch((err)=>{
          console.error(err);
      })
        },
        onResetUpdate(){
            // 先隐藏 Modal
            $('#updatePostModal').modal('hide')
            // this.getPosts()
            this.$toasted.info('Cancelled, the post is not update.', { icon: 'fingerprint' })
        },
        onDeletePost(post){
        this.$swal({
            title: "Are you sure?",
            text: "该操作将彻底删除 [ " + post.title + " ], 请慎重",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
        if(result.value) {
          const path = `/api/posts/${post.id}`
          this.$axios.delete(path)
            .then((res) => {
              // handle success
              this.$swal('Deleted', 'You successfully deleted this post', 'success')
              if (typeof this.$route.query.redirect == 'undefined') {
                this.$router.push('/')
              } else {
                this.$router.push(this.$route.query.redirect)
              }
            })
            .catch((err) => {
              // handle error
              console.log(err)
            })
          
        } else {
          this.$swal('Cancelled', 'The post is safe :)', 'error')
        }
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
        this.getPost(postId);
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
    beforeRouteUpdate(){
    this.getPost(to.params.id)
    next()
    }
}
</script>

<style>

</style>