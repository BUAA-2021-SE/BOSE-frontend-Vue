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
      <h1>博文列表</h1>
      <p>{{ posts }}</p>
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
    next();
    this.getUserPosts(1);
  },
}
</script>
