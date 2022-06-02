<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingProfile"> 博文列表加载中
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
    <div
        v-if="posts.length > 0"
        v-show="!loadingProfile"
    >
      <blog v-for="(post,index) in posts" :key="index"
            :post="post"
            @delete="getUserPosts(1)">
      </blog>
      <div>
        <span>共有博文{{ total }}篇</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </div>
    </div>
    <div
        v-else-if="posts.length === 0 && !this.loadingProfile"
        class="text-center">
      <h3>呜呜呜，一篇博文都没有。</h3>
    </div>

  </section>
</template>

<script>
import store from "@/store.js";
import Post from "@/api/post";
import BlogItem from '@/components/base/BlogItem.vue'

export default {
  name: 'Posts',
  components: {
    blog: BlogItem
  },
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
      size: 6, //每页总数
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
