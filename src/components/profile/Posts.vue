<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingProfile"> 博客列表加载中
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
    </div>
    <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40" v-show="!this.loadingProfile">
      <h1>我的博文</h1>
      <div>
        <v-card
            class="mx-auto"
            v-for="(post, index) in posts"
            :key="index"
        >
          <router-link
              :to="{name:'Post',params:{id:post.id} }"
          >
            <v-card-title>
              {{ post.title }}
            </v-card-title>
          </router-link>
          <v-card-text>
            <p>{{ post.author.name || post.author.username }}</p>
            <!-- <p>echo17666</p> -->
            <div class="text--primary">
              {{ post.summary }}
            </div>
          </v-card-text>
          <v-card-actions>
            <router-link
                :to="{name:'Post',params:{id:post.id} }"
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
                :to="{name:'PostEdit',params:{id:post.id} }">
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
        <span>共有博文{{ total }}篇</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
        <!-- 删除弹出框 -->
        <v-dialog style="z-index:2000"
                  v-model="showDelete"
                  width="25vw"
                  height="20vh">
          <v-card :style="{width:'25vw', height:'12vh'}" class="d-flex align-content-end flex-wrap">
            <v-card-title class="mx-auto">
              确定删除？
            </v-card-title>
            <v-card-actions>
              <v-btn
                  color="primary"
                  text
                  @click="showDelete= false"
              >
                退出
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  color="error"
                  text
                  @click="onDeletePost"
              >
                确认
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </div>
    </div>


  </section>
</template>

<script>
import {Account} from "@/api/account.js";
import store from "@/store.js";
import Post from "@/api/post";
import Followers from "@/api/follower";

export default {
  name: 'Posts',
  components: {},
  data() {
    return {
      posts: [],
      loadingProfile: true,
      sharedState: store.state,
      blog: {
        title: "",
        summary: "",
        body: "",
        views: "",
        thumbs_up: "",
        collection: "",
        last_edit_time: "",
      },
      total: 0, //总博文数
      page: 1, //第几页
      size: 5, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {

    // 获取用户的博文列表
    getUserPosts(page) {
      Post.getUserPosts(this.$route.params.id, page, this.size)
          .then((res) => {
            console.log(res.data, "getUserPosts");
            this.posts = res.data.items;
            this.total = res.data.total
            this.page = res.data.page
            this.size = res.data.size
            this.pageTotal = Math.ceil(this.total / this.size)
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log(err, "getUserPostsError");
            this.posts = "暂无博文"
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserPosts(1);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserPosts(1)
  },
}
</script>
