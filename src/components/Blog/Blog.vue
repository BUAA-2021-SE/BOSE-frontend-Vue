<template>
  <div class="container">
    <!-- Modal: Edit Post -->
    <div class="row">
      <!-- Articles Content -->
      <div class="col-lg-9">
        
        <article class="g-mb-60 g-pt-15 g-pb-50">
          <header class="g-mb-30">
            <h1 class="g-color-primary g-mb-15">{{ post.title }}</h1>

            <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
              <router-link
              :to="{name:'PostEdit',params:{id:post.id} }"
              >
              <button  class="btn btn-xs u-btn-outline-purple g-mr-5" >编辑</button>
              </router-link>
              </li>
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
                <button @click="showDelete=true" class="btn btn-xs u-btn-outline-red g-mr-5">删除</button>
              </li>
              <li class="list-inline-item">
                <span class="btn btn-xs u-btn-outline-aqua g-mr-10">评论</span>
              </li>
              <li v-if="post.author" class="list-inline-item">
                <router-link :to="{ name: 'ShowProfile', params: { id: post.author.id }}" class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover">
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
            <div class="text-center">
            <h3 v-show="this.loadingProfile"> 博客加载中······<v-progress-circular
       class="center"
      indeterminate
      color="primary"
      :size="40"
      :width="3"
      v-show="this.loadingProfile"
    ></v-progress-circular></h3>
            </div>
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
      <div class="col-lg-3 g-pt-80" >

        <div id="sticker" class="g-mb-50">
          <div id="tocHeader" class="u-heading-v3-1 g-mb-15">
              <h2 class="h5 u-heading-v3__title g-color-primary text-uppercase g-brd-primary">文章目录</h2>
          </div>
          <div id="toc" class="toc" v-show="!this.loadingProfile"></div>
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
            color="error"
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
import '@/assets/jquery.sticky'
import Post from '@/api/post'
import $ from 'jquery'
const highlightCode = () => {
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightElement(block)
  })
}
export default {
    name:'Post',
    components: {
        VueMarkdown
    },
    data(){
        return{
          loadingProfile:true,
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
                this.loadingProfile = false;
            })
            .catch((err)=>{
                console.error(err);
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