<template>
  <div class="mx-5">
     <div class="text-center" v-show="this.loadingProfile">
                <h3 v-show="this.loadingProfile">
                  博客加载中······
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
    <v-container v-show="!this.loadingProfile" grid-list-xl>
      
      <v-dialog v-model="showDelete">
        <v-card>
          <v-card-title> Are you sure you want to delete? </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="showDelete = false">
              Quit
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="error" text @click="onDeletePost"> Confirm </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- 目录 -->
      <!-- Sidebar -->
      <v-row>
        <v-col cols="12" md="3" class="link">
          <v-card class="mx-auto mt-2 link_cover">
            <div class="py-4 links">
              <h3 class="pl-3 pb-3">目录</h3>
              <div v-html="topic"></div>
            </div>
          </v-card>
        </v-col>
        <!-- End Sidebar -->
        <v-col cols="12" md="9">
          <!-- 博文内容 -->
          <!-- Articles Content -->
          <article>
            <header class="g-mb-30">
              <h1 class="g-color-primary g-mb-15">{{ post.title }}</h1>

              <ul class="list-inline d-sm-flex g-color-gray-dark-v4 mb-0">
                <li
                  v-if="post.author && post.author.id == sharedState.user_id"
                  class="list-inline-item"
                >
                  <v-btn
                    color="primary"
                    :to="{ name: 'PostEdit', params: { id: post.id } }"
                    >编辑</v-btn
                  >
                </li>
                <li
                  v-if="post.author && post.author.id == sharedState.user_id"
                  class="list-inline-item"
                >
                  <v-btn @click="showDelete = true" color="error">删除</v-btn>
                </li>
                <li class="list-inline-item">
                  <v-btn href="#comment-list-wrap">评论</v-btn>
                </li>
                <li v-if="post.author" class="list-inline-item">
                  <router-link
                    :to="{
                      name: 'ShowProfile',
                      params: { id: post.author.id },
                    }"
                    class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover"
                  >
                    <span v-if="post.author.name">{{ post.author.name }}</span>
                    <span v-else>{{ post.author.username }}</span></router-link
                  >
                </li>
                <li class="list-inline-item g-mx-10">/</li>
                <li class="list-inline-item">
                  <i class="icon-clock"></i>
                  {{ $moment(post.timestamp).format("LLL") }}
                </li>
                <li class="list-inline-item g-mx-10">/</li>
                <li class="list-inline-item g-mr-10">
                  <a
                    class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover g-text-underline--none--hover"
                    href="#comment-list-wrap"
                  >
                    <i class="icon-bubble"></i> 0
                  </a>
                </li>
                <li class="list-inline-item ml-auto">
                  <i class="icon-eye"></i> {{ post.views }} 次阅读
                </li>
              </ul>

              <hr class="g-brd-gray-light-v4 g-my-15" />
            </header>

            <div id="postBody" class="g-font-size-16 g-line-height-1_8 g-mb-30">
             
              <vue-markdown
                :source="post.body"
                v-highlight
                :toc="showToc"
                :toc-first-level="1"
                :toc-last-level="3"
                @toc-rendered="tocAllRight"
                toc-id="toc"
              >
              </vue-markdown>
            </div>
            <div id="like-post" class="row">
              <div class="col-lg-3">
                <button
                  v-on:click="onLikeOrUnlikePost(post)"
                  v-bind:class="btnOutlineColor"
                  class="btn btn-block g-rounded-50 g-py-12 g-mb-10"
                >
                  <i class="icon-heart g-pos-rel g-top-1 g-mr-5"></i> 喜欢<span
                    v-if="post.likers_id && post.likers_id.length > 0"
                  >
                    | {{ post.likers_id.length }}</span
                  >
                </button>
              </div>
              <div class="col-lg-9">
                <ul v-if="post.likers" class="list-inline mb-0">
                  <li
                    class="list-inline-item"
                    v-for="(liker, index) in post.likers"
                    v-bind:key="index"
                  >
                    <router-link
                      v-bind:to="{ path: `/user/${liker.id}` }"
                      v-bind:title="liker.name || liker.username"
                    >
                      <img
                        class="g-brd-around g-brd-gray-light-v3 g-pa-2 g-width-40 g-height-40 rounded-circle rounded mCS_img_loaded g-mt-3"
                        v-bind:src="liker.avatar"
                        v-bind:alt="liker.name || liker.username"
                      />
                    </router-link>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <v-divider></v-divider>
          <!-- End Articles Content -->
          <!-- 博文评论 -->
          <div id="comment-list-wrap" class="card border-0 g-mb-15">
            <!-- Panel Header -->
            <div
              class="card-header d-flex align-items-center justify-content-between g-bg-gray-light-v5 border-0 g-mb-15"
            >
              <h3 class="h6 mb-0">
                <i class="icon-bubbles g-pos-rel g-top-1 g-mr-5"></i> Comments
              </h3>
            </div>
            <!-- End Panel Header -->

            <!-- Add Comment Form -->
            <form
              id="addCommentForm"
              v-if="sharedState.is_authenticated"
              @submit.prevent="onSubmitAddComment"
              @reset.prevent="onResetAddComment"
              class="g-mb-40"
            >
              <div class="form-group">
                <textarea
                  v-model="commentForm.body"
                  class="form-control"
                  id="commentFormBody"
                  rows="5"
                  placeholder=" 写下你的评论 ..."
                ></textarea>
                <small
                  class="form-control-feedback"
                  v-show="commentForm.bodyError"
                  >{{ commentForm.bodyError }}</small
                >
              </div>
              <v-btn type="reset">Cancel</v-btn>
              <v-btn type="submit" color="primary">Submit</v-btn>
            </form>
            <!-- End Add Comment Form -->

            <div v-else>
              <v-btn color="error" block :to="{ name: 'Login' }">
                发表评论前，请先登录 ...
              </v-btn>
            </div>
            <v-divider></v-divider>
            <!-- Panel Body -->
            <div v-if="comments" class="card-block g-pa-0">
              <!-- 一级评论，按时间倒序排列 -->
              <div v-for="(comment, index) in comments" v-bind:key="index">
                <v-card :id="'c' + comment.id" elevation="5" outlined>
                  <v-card-title>
                    <router-link :to="{ path: `/user/${comment.author.id}` }">
                      <v-avatar size="60">
                        <v-img
                          :src="comment.author.headshot"
                          alt="comment.author.name || comment.author.username"
                        />
                      </v-avatar>
                    </router-link>
                    <p class="ml-3">
                      <router-link
                        style="text-decoration: none"
                        :to="{ path: `/user/${comment.author.id}` }"
                      >
                        {{ comment.author.name || comment.author.username }}
                      </router-link>
                      <v-btn
                        v-if="comment.author.id == post.author.id"
                        x-small
                        color="purple"
                      >
                        博文作者
                      </v-btn>
                    </p>
                  </v-card-title>
                  <v-card-subtitle>{{
                    $moment(comment.timestamp).format("YYYY年MM月DD日 HH:mm:ss")
                  }}</v-card-subtitle>
                  <v-card-text>
                    <div v-if="comment.disabled">
                      此评论包含不良信息，已被禁止显示.
                    </div>
                    <div v-else>
                      <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
                    v-highlight 是自定义指令，用 highlight.js 语法高亮 -->
                      <vue-markdown :source="comment.body" v-highlight>
                      </vue-markdown>
                    </div>
                  </v-card-text>
                  <v-card-actions> </v-card-actions>
                  <ul class="list-inline d-sm-flex my-0">
                    <li
                      v-if="!comment.disabled"
                      class="list-inline-item g-mr-20"
                    >
                      <v-btn @click="onLikeOrUnlikeComment(comment)">
                        <i
                          v-bind:class="{
                            'g-color-red':
                              comment.likers_id.indexOf(sharedState.user_id) !=
                              -1,
                          }"
                          class="icon-like g-pos-rel g-top-1 g-mr-3"
                        ></i>
                        <span v-if="comment.likers_id.length > 0">
                          {{ comment.likers_id.length }} 人赞</span
                        >
                        <span v-else>赞</span>
                      </v-btn>
                    </li>
                    <li
                      v-if="!comment.disabled"
                      class="list-inline-item g-mr-20"
                    >
                      <v-btn @click="onClickReply(comment)">
                        <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                        回复
                      </v-btn>
                    </li>
                    <ul class="list-inline mb-0 ml-auto">
                      <li style="display: none" class="list-inline-item g-mr-5">
                        <v-btn
                          @click="onEditComment(comment)"
                          color="purple"
                          data-toggle="modal"
                          data-target="#editCommentModal"
                          >编辑</v-btn
                        >
                      </li>
                      <li
                        v-if="
                          !comment.disabled &&
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onDisabledComment(comment)"
                          small
                          color="blue-grey"
                          >屏蔽</v-btn
                        >
                      </li>
                      <li
                        v-if="
                          comment.disabled &&
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onEnabledComment(comment)"
                          small
                          color="teal"
                          >恢复</v-btn
                        >
                      </li>
                      <li
                        v-if="
                          comment.author.id == sharedState.user_id ||
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onDeleteComment(comment)"
                          small
                          color="red"
                          >删除</v-btn
                        >
                      </li>
                    </ul>
                  </ul>
                </v-card>

                <!-- 子级评论，按时间正序排列 -->
                <v-card
                  v-if="comment.descendants"
                  v-for="(child, cindex) in comment.descendants"
                  v-bind:key="cindex"
                  :id="'c' + child.id"
                >
                  <v-card-title>
                    <router-link :to="{ path: `/user/${child.author.id}` }">
                      <v-avatar size="60">
                        <v-img
                          :src="child.author.headshot"
                          alt="child.author.name || child.author.username"
                        />
                      </v-avatar>
                    </router-link>
                    <p class="ml-3">
                      <router-link
                        style="text-decoration: none"
                        :to="{ path: `/user/${child.author.id}` }"
                      >
                        {{ child.author.name || child.author.username }}
                      </router-link>
                      <v-btn
                        v-if="child.author.id == post.author.id"
                        x-small
                        color="purple"
                      >
                        博文作者
                      </v-btn>
                    </p>
                  </v-card-title>
                  <v-card-subtitle>
                    <span>{{
                      $moment(child.timestamp).format("YYYY年MM月DD日 HH:mm:ss")
                    }}</span>
                  </v-card-subtitle>
                  <v-card-text>
                    <div v-if="child.disabled" class="g-color-red g-mb-15">
                      此评论包含不良信息，已被禁止显示.
                    </div>
                    <div v-else>
                      <!-- vue-markdown 开始解析markdown，它是子组件，通过 props 给它传值即可
                    v-highlight 是自定义指令，用 highlight.js 语法高亮 -->
                      <vue-markdown :source="child.body" v-highlight>
                      </vue-markdown>
                    </div>
                  </v-card-text>
                  <v-card-actions></v-card-actions>
                  <ul class="list-inline d-sm-flex my-0">
                    <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                      <v-btn
                        @click="onLikeOrUnlikeComment(child)"
                        class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                        href="javascript:;"
                      >
                        <i
                          v-bind:class="{
                            'g-color-red':
                              child.likers_id.indexOf(sharedState.user_id) !=
                              -1,
                          }"
                          class="icon-like g-pos-rel g-top-1 g-mr-3"
                        ></i>
                        <span v-if="child.likers_id.length > 0">
                          {{ child.likers_id.length }} 人赞</span
                        >
                        <span v-else>赞</span>
                      </v-btn>
                    </li>
                    <li v-if="!child.disabled" class="list-inline-item g-mr-20">
                      <v-btn @click="onClickReply(comment)">
                        <i class="icon-note g-pos-rel g-top-1 g-mr-3"></i>
                        回复
                      </v-btn>
                    </li>
                    <ul class="list-inline mb-0 ml-auto">
                      <li style="display: none" class="list-inline-item g-mr-5">
                        <button
                          @click="onEditComment(child)"
                          class="btn btn-xs u-btn-outline-purple"
                          data-toggle="modal"
                          data-target="#editCommentModal"
                        >
                          编辑
                        </button>
                      </li>
                      <li
                        v-if="
                          !child.disabled &&
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onDisabledComment(comment)"
                          small
                          color="blue-grey"
                          >屏蔽</v-btn
                        >
                      </li>
                      <li
                        v-if="
                          child.disabled &&
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onEnabledComment(comment)"
                          small
                          color="teal"
                          >恢复</v-btn
                        >
                      </li>
                      <li
                        v-if="
                          child.author.id == sharedState.user_id ||
                          post.author.id == sharedState.user_id
                        "
                        class="list-inline-item"
                      >
                        <v-btn
                          @click="onDeleteComment(comment)"
                          small
                          color="red"
                          >删除</v-btn
                        >
                      </li>
                    </ul>
                  </ul>
                </v-card>
              </div>
            </div>
            <!-- End Panel Body -->
          </div>
          <!-- Pagination #04 -->
          <!-- <div v-if="comments && comments._meta.total_pages > 1">
          <v-pagination
          v-model="comments._meta.page"
          :length="comments._meta.total_pages"
          :total-visible="7"
          circle
          ></v-pagination>
        </div> -->
          <!-- End Pagination #04 -->

          <!-- end Articles Content -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import store from "@/store.js";
import VueMarkdown from "vue-markdown";
import Post from "@/api/post";
import hljs from "highlight.js";
const highlightCode = () => {
  let blocks = document.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightElement(block);
  });
};
export default {
  name: "Post",
  components: {
    VueMarkdown,
  },
  data() {
    return {
      loadingProfile: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
      sharedState: store.state,
      post: {},
      comments: [
        {
          id: 1,
          body: "asd",
          timestamp: "2022-05-18T00:43:46",
          author: {
            id: 3,
            username: "LLLeo",
            name: "LLLeo",
            headshot:
              "http://43.138.58.36:8000/static/User/3/Images/tmpj0y5cc29.jpg",
          },
          disabled: false,
          likers_id: [],
          descendants: [
            {
              id: 1,
              body: "asd",
              timestamp: "2022-05-18T00:43:46",
              author: {
                id: 3,
                username: "LLLeo",
                name: "LLLeo",
                headshot:
                  "http://43.138.58.36:8000/static/User/3/Images/tmpj0y5cc29.jpg",
              },
              disabled: false,
              likers_id: [],
            },
          ],
        },
      ],
      commentForm: {
        body: "",
        parent_id: "", // 被回复的评论的 id
        author_id: "", // 被回复的评论的作者的 id
        author_name: "", // 被回复的评论的作者的名字
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null,
      },
      editForm: {
        title: "",
        summary: "",
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        titleError: false,
        bodyError: false,
      },
      editCommentForm: {
        body: "",
        errors: 0, // 表单是否在前端验证通过，0 表示没有错误，验证通过
        bodyError: null,
      },
      showToc: true,
      showEdit: false,
      showDelete: false,
      topic: "",
    };
  },
  methods: {
    getBlog(id) {
      const formData = new FormData();
      formData.append("view_id", this.sharedState.user_id);
      Post.getBlog(id, formData)
        .then((res) => {
          this.post = res.data;
          this.loadingProfile = false;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    onDeletePost() {
      Post.deleteBlog(this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.showDelete = false;
          this.$toasted.success(res.data, {
            icon: "check",
            fullWidth: true,
            position: "bottom-center",
          });
          this.$router.push("/");
        })
        .catch((err) => {
          console.error(err, "not deleted");
        });
    },
    getDocsFirstLevels(times) {
      // 解决图片加载会影响高度问题
      setTimeout(() => {
        let firstLevels = [];
        Array.from(document.querySelectorAll("h3"), (element) => {
          firstLevels.push(element.offsetTop - 60);
        });
        this.docsFirstLevels = firstLevels;

        if (times < 8) {
          this.getDocsFirstLevels(times + 1);
        }
      }, 500);
    },
    tocAllRight(tocHtmlStr) {
      this.topic = tocHtmlStr;
      console.log(this.topic);
    },
    getPostComments(id) {
      console.log("getPostComments");
    },
  },
  computed: {
    content() {
      return this.post.body;
    },
    btnOutlineColor() {
      return "";
    },
  },
  created() {
    const postId = this.$route.params.id;
    this.getBlog(postId);
  },
  mounted() {
    highlightCode();
  },
  updated() {
    highlightCode();
  },
  beforeRouteUpdate(to, from, next) {
    this.getBlog(to.params.id);
    next();
  },
};
</script>

<style>
.h1,
h1,
h2,
.h2,
h3,
.h3,
h4,
.h4,
h5,
.h5,
h6,
.h6 {
  margin-top: -70px !important;
  padding-top: 70px;
}
</style>

<style scoped>
.content {
  padding: 8px 8px;
  font-size: 14px;
}
.body {
  margin-top: 24px;
  background: #f0f0f0;
  border-radius: 5px;
}
ul {
  list-style-type: none;
  padding: 2px 6px;
}
li {
  list-style-type: none;
  margin: 2px 6px;
}
a {
  color: #42b983;
  text-decoration: none;
}
@media screen and (min-width: 960px) {
  .link {
    padding-top: 100px;
    position: fixed;
    right: 25px;
    top: 100;
  }
  .link_cover {
    max-height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: visible;
  }
}
@media screen and (min-width: 1060px) {
  .link {
    padding-top: 100px;
    position: fixed;
    right: 50px;
    top: 100;
  }
  .link_cover {
    max-height: 400px;
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: visible;
  }
}
</style>
