<template>
  <div class="container">
    
    <div class="row">
      <!-- 博文内容 -->
      <!-- Articles Content -->
      <div class="col-lg-9" >

        <article class="g-mb-60 g-pt-15 g-pb-50">
          <header class="g-mb-30">
            <h1 class="g-color-primary g-mb-15">{{ post.title }}</h1>

            <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
                <router-link
                    :to="{name:'PostEdit',params:{id:post.id} }"
                >
                  <button class="btn btn-xs u-btn-outline-purple g-mr-5">编辑</button>
                </router-link>
              </li>
              <li v-if="post.author && post.author.id == sharedState.user_id" class="list-inline-item">
                <button @click="showDelete=true" class="btn btn-xs u-btn-outline-red g-mr-5">删除</button>
              </li>
              <li class="list-inline-item">
                <span class="btn btn-xs u-btn-outline-aqua g-mr-10">评论</span>
              </li>
              <li v-if="post.author" class="list-inline-item">
                <router-link :to="{ name: 'ShowProfile', params: { id: post.author.id }}"
                             class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover">
                  <span v-if="post.author.name">{{ post.author.name }}</span>
                  <span v-else>{{ post.author.username }}</span></router-link>
              </li>
              <li class="list-inline-item g-mx-10">/</li>
              <li class="list-inline-item">
                <i class="icon-clock"></i> {{ $moment(post.timestamp).format('LLL') }}
              </li>
              <li class="list-inline-item g-mx-10">/</li>
              <li class="list-inline-item g-mr-10">
                <a class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover"
                   href="#comment-list-wrap">
                  <i class="icon-bubble"></i> 0
                </a>
              </li>
              <li class="list-inline-item ml-auto">
                <i class="icon-eye"></i> {{ post.views }} 次阅读
              </li>
            </ul>

            <hr class="g-brd-gray-light-v4 g-my-15">
          </header>

          <div id="postBody" class="g-font-size-16 g-line-height-1_8 g-mb-30" >
            <div class="text-center"  >
              <h3 v-show="this.loadingProfile"> 博客加载中······
                <v-progress-circular
                    class="center"
                    indeterminate
                    color="primary"
                    :size="40"
                    :width="3"
                    v-show="this.loadingProfile"
                ></v-progress-circular>
              </h3>
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
      
      <!-- End Articles Content -->
      <!-- 博文评论 -->
      <div id="comment-list-wrap" class="card border-0 g-mb-15">
          <!-- Panel Header -->
          <div class="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15">
            <h3 class="h6 mb-0">
              <i class="icon-bubbles g-pos-rel g-top-1 g-mr-5"></i> Comments
            </h3>
            <div class="dropdown g-mb-10 g-mb-0--md">
              <span class="d-block g-color-primary--hover g-cursor-pointer g-mr-minus-5 g-pa-5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="icon-options-vertical g-pos-rel g-top-1"></i>
              </span>
              <div class="dropdown-menu dropdown-menu-right rounded-0 g-mt-10">
                <router-link v-bind:to="{ path: $route.path, query: { page: 1, per_page: 1 }}" class="dropdown-item g-px-10">
                  <i class="icon-plus g-font-size-12 g-color-gray-dark-v5 g-mr-5"></i> 每页 1 条顶层评论
                </router-link>
                <router-link v-bind:to="{ path: $route.path, query: { page: 1, per_page: 5 }}" class="dropdown-item g-px-10">
                  <i class="icon-layers g-font-size-12 g-color-gray-dark-v5 g-mr-5"></i> 每页 5 条顶层评论
                </router-link>
                <router-link v-bind:to="{ path: $route.path, query: { page: 1, per_page: 10 }}" class="dropdown-item g-px-10">
                  <i class="icon-wallet g-font-size-12 g-color-gray-dark-v5 g-mr-5"></i> 每页 10 条顶层评论
                </router-link>
                
                <div class="dropdown-divider"></div>
                
                <router-link v-bind:to="{ path: $route.path, query: { page: 1, per_page: 20 }}" class="dropdown-item g-px-10">
                  <i class="icon-fire g-font-size-12 g-color-gray-dark-v5 g-mr-5"></i> 每页 20 条顶层评论
                </router-link>
                
              </div>
            </div>
          </div>
          <!-- End Panel Header -->

          <!-- Add Comment Form -->
          <form id="addCommentForm" v-if="sharedState.is_authenticated" @submit.prevent="onSubmitAddComment" @reset.prevent="onResetAddComment" class="g-mb-40">
            <div class="form-group">
              <textarea v-model="commentForm.body" class="form-control" id="commentFormBody" rows="5" placeholder=" 写下你的评论 ..."></textarea>
              <small class="form-control-feedback" v-show="commentForm.bodyError">{{ commentForm.bodyError }}</small>
            </div>
            <button type="reset" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <!-- End Add Comment Form -->

          <div v-else class="btn-group g-mr-10 g-mb-50 g-px-10">
            <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              发表评论前，请先登录 ...
            </button>
            <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; transform: translate3d(0px, 35px, 0px); top: 0px; left: 0px; will-change: transform;">
              <router-link v-bind:to="{ path: '/login', query: { redirect: $route.fullPath } }" class="dropdown-item">站内账号</router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="javascript:;">Github</a>
              <a class="dropdown-item" href="javascript:;">Facebook</a>
              <a class="dropdown-item" href="javascript:;">微信</a>
            </div>
          </div>

          <!-- Panel Body -->
          <div v-if="comments" class="card-block g-pa-0" >
          
            <!-- 一级评论，按时间倒序排列 -->
            <div v-for="(comment, index) in comments.items" v-bind:key="index">
              <div v-bind:id="'c' + comment.id" class="comment-item media g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-20">
                <router-link v-bind:to="{ path: `/user/${comment.author.id}` }">  
                  <img class="d-flex g-width-50 g-height-50 rounded-circle g-brd-around g-brd-gray-light-v4 g-pa-2 g-mt-3 g-mr-15" v-bind:src="comment.author.avatar" v-bind:alt="comment.author.name || comment.author.username">
                </router-link>
                <div class="media-body">
                  <div class="g-mb-15">
                    <h5 v-if="comment.author.id == comment.post.author_id" class="h5 g-color-gray-dark-v1 mb-0"><router-link v-bind:to="{ path: `/user/${comment.author.id}` }" class="comment-author g-text-underline--none--hover">{{ comment.author.name || comment.author.username }}</router-link> <button class="btn btn-xs u-btn-inset u-btn-outline-red g-mr-5">博文作者</button></h5>
                    <h5 v-else class="h5 g-color-gray-dark-v1 mb-0"><router-link v-bind:to="{ path: `/user/${comment.author.id}` }" class="comment-author g-text-underline--none--hover">{{ comment.author.name || comment.author.username }}</router-link></h5>
                    <span class="g-color-gray-dark-v4 g-font-size-12">{{ $moment(comment.timestamp).format('YYYY年MM月DD日 HH:mm:ss') }}</span>
                  </div>

                  <div v-if="comment.disabled" class="g-color-red g-mb-15">此评论包含不良信息，已被禁止显示.</div>
                  <div v-else>
                    <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
                    v-highlight 是自定义指令，用 highlight.js 语法高亮 -->
                    <vue-markdown
                      :source="comment.body"
                      class="markdown-body g-mb-15"
                      v-highlight>
                    </vue-markdown>
                  </div>

                  <ul class="list-inline d-sm-flex my-0">
                    <li v-if="!comment.disabled" class="list-inline-item g-mr-20">
                      <a v-on:click="onLikeOrUnlikeComment(comment)" class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="javascript:;">
                        <i v-bind:class="{ 'g-color-red': comment.likers_id.indexOf(sharedState.user_id) != -1 }" class="icon-like g-pos-rel g-top-1 g-mr-3"></i>
                        <span v-if="comment.likers_id.length > 0"> {{ comment.likers_id.length }} 人赞</span>
                        <span v-else>赞</span>
                      </a>
                    </li>
                    <li v-if="!comment.disabled" class="list-inline-item g-mr-20">
                      <a v-on:click="onClickReply(comment)" class="comment-reply-link u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="javascript:;">
                        <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                        回复
                      </a>
                    </li>
                    <ul class="list-inline mb-0 ml-auto">
                      <li style="display: none;" class="list-inline-item g-mr-5">
                        <button v-on:click="onEditComment(comment)" class="btn btn-xs u-btn-outline-purple" data-toggle="modal" data-target="#editCommentModal">编辑</button>
                      </li>
                      <li v-if="!comment.disabled && post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onDisabledComment(comment)" class="btn btn-xs u-btn-outline-purple">屏蔽</button>
                      </li>
                      <li v-if="comment.disabled && post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onEnabledComment(comment)" class="btn btn-xs u-btn-outline-aqua">恢复</button>
                      </li>
                      <li v-if="comment.author.id == sharedState.user_id || post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onDeleteComment(comment)" class="btn btn-xs u-btn-outline-red">删除</button>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>

              <!-- 子级评论，按时间正序排列 -->
              <div class="g-ml-40 comment-item media g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-20"
                  v-if="comment.descendants"
                  v-for="(child, cindex) in comment.descendants" v-bind:key="cindex"
                  v-bind:id="'c' + child.id">
                <router-link v-bind:to="{ path: `/user/${child.author.id}` }">  
                  <img class="d-flex g-width-50 g-height-50 rounded-circle g-brd-around g-brd-gray-light-v4 g-pa-2 g-mt-3 g-mr-15" v-bind:src="child.author.avatar" v-bind:alt="child.author.name || child.author.username">
                </router-link>
                <div class="media-body">
                  <div class="g-mb-15">
                    <h5 v-if="child.author.id == child.post.author_id" class="h5 g-color-gray-dark-v1 mb-0"><router-link v-bind:to="{ path: `/user/${child.author.id}` }" class="comment-author g-text-underline--none--hover">{{ child.author.name || child.author.username }}</router-link> <button class="btn btn-xs u-btn-inset u-btn-outline-red g-mr-5">博文作者</button></h5>
                    <h5 v-else class="h5 g-color-gray-dark-v1 mb-0"><router-link v-bind:to="{ path: `/user/${child.author.id}` }" class="comment-author g-text-underline--none--hover">{{ child.author.name || child.author.username }}</router-link></h5>
                    <span class="g-color-gray-dark-v4 g-font-size-12">{{ $moment(child.timestamp).format('YYYY年MM月DD日 HH:mm:ss') }}</span>
                  </div>

                  <div v-if="child.disabled" class="g-color-red g-mb-15">此评论包含不良信息，已被禁止显示.</div>
                  <div v-else>
                    <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
                    v-highlight 是自定义指令，用 highlight.js 语法高亮 -->
                    <vue-markdown
                      :source="child.body"
                      class="markdown-body g-mb-15"
                      v-highlight>
                    </vue-markdown>
                  </div>

                  <ul class="list-inline d-sm-flex my-0">
                    <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                      <a v-on:click="onLikeOrUnlikeComment(child)" class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="javascript:;">
                        <i v-bind:class="{ 'g-color-red': child.likers_id.indexOf(sharedState.user_id) != -1 }" class="icon-like g-pos-rel g-top-1 g-mr-3"></i>
                        <span v-if="child.likers_id.length > 0"> {{ child.likers_id.length }} 人赞</span>
                        <span v-else>赞</span>
                      </a>
                    </li>
                    <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                      <a v-on:click="onClickReply(child)" class="comment-reply-link u-link-v5 g-color-gray-dark-v4 g-color-primary--hover" href="javascript:;">
                        <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                        回复
                      </a>
                    </li>
                    <ul class="list-inline mb-0 ml-auto">
                      <li style="display: none;" class="list-inline-item g-mr-5">
                        <button v-on:click="onEditComment(child)" class="btn btn-xs u-btn-outline-purple" data-toggle="modal" data-target="#editCommentModal">编辑</button>
                      </li>
                      <li v-if="!child.disabled && post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onDisabledComment(child)" class="btn btn-xs u-btn-outline-purple">屏蔽</button>
                      </li>
                      <li v-if="child.disabled && post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onEnabledComment(child)" class="btn btn-xs u-btn-outline-aqua">恢复</button>
                      </li>
                      <li v-if="child.author.id == sharedState.user_id || post.author.id == sharedState.user_id" class="list-inline-item">
                        <button v-on:click="onDeleteComment(child)" class="btn btn-xs u-btn-outline-red">删除</button>
                      </li>
                    </ul>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <!-- End Panel Body -->
        </div>
        <!-- Pagination #04 -->
        <div v-if="comments && comments._meta.total_pages > 1">
          <pagination
            v-bind:cur-page="comments._meta.page"
            v-bind:per-page="comments._meta.per_page"
            v-bind:total-pages="comments._meta.total_pages">
          </pagination>
        </div>
        <!-- End Pagination #04 -->


    </div>
    <!-- end Articles Content -->
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
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
}
export default {
  name: 'Post',
  components: {
    VueMarkdown
  },
  data() {
    return {
      loadingProfile: true,
      items: [
        {title: 'Home', icon: 'mdi-home-city'},
        {title: 'My Account', icon: 'mdi-account'},
        {title: 'Users', icon: 'mdi-account-group-outline'}
      ],
      sharedState: store.state,
      post: {},
      comments:'',
      commentForm:{
        body: '',
        parent_id: '',  // 被回复的评论的 id
        author_id: '',  // 被回复的评论的作者的 id
        author_name: '',  // 被回复的评论的作者的名字
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null
      },
      editForm: {
        title: '',
        summary: '',
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false
      },
      editCommentForm:{
        body: '',
        errors: 0,  // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null
      },
      showToc: true,
      showEdit: false,
      showDelete: false,
    }
  },
  methods: {
    getBlog(id) {
      const formData = new FormData();
      formData.append('view_id',this.sharedState.user_id);
      Post.getBlog(id,formData)
          .then((res) => {
            this.post = res.data;
            console.log(res.data, "res");
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.error(err);
          })
    },
    onDeletePost() {
      Post.deleteBlog(this.$route.params.id)
          .then((res) => {
            console.log(res);
            this.showDelete = false;
            this.$toasted.success(res.data,
                {
                  icon: 'check',
                  fullWidth: true,
                  position: "bottom-center"
                })
            this.$router.push('/')
          })
          .catch((err) => {
            console.error(err, "not deleted");
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
  created() {
    const postId = this.$route.params.id
    this.getBlog(postId);
    $(document).ready(function () {
      $("#sticker").sticky({topSpacing: 70});
    })
  },
  mounted() {
    highlightCode()
  },
  updated() {
    highlightCode()
  },
  beforeRouteUpdate(to, from, next) {
    this.getBlog(to.params.id);
    next()
  }
}
</script>

<style>
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    margin-top: -80px !important;
    padding-top:80px;
}
</style>

<style scoped>
.markdown-body{
  margin-top:-80px !important;
}
</style>