<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingProfile"> 博文列表加载中
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
        v-if="this.posts.length > 0"
        class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"
        v-show="!this.loadingProfile">
      <v-row :style="{width:'80vw'}" class="m-auto">
        <div class="text-align-center">
          <h6 class="text-align-center">共有博文{{ total }}篇</h6>
        </div>
        <v-col cols="12" sm="2" md="2"></v-col>
        <v-col sm="8" md="8">
          <div v-for="(post,index) in posts" :key="index">
            <blog
                :post="post"
                @delete="getSearchPosts(1)">
            </blog>
          </div>
        </v-col>
        <v-col cols="12" sm="2" md="2"></v-col>
      </v-row>
      <div>

        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </div>
    </div>
    <div
        v-else-if="this.posts.length === 0 && !this.loadingProfile"
        class="text-center"
    >
      <h4>这个关键词没有博文呢，换个关键词看看吧～</h4>
    </div>
  </section>
</template>

<script>
import Post from "@/api/post";
import store from "@/store";
import BlogItem from '@/components/base/BlogItem.vue'

export default {
  name: 'SearchBlog',
  components: {
    blog: BlogItem
  },
  data() {
    return {
      posts: [],
      loadingProfile: true,
      sharedState: store.state,
      showDelete: false,
      deleteId: 0,
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
      pageTotal: 10 //总页数
    }
  },
  methods: {
    // 获取用户的博文列表
    getSearchPosts(page) {
      console.log("keyword: " + this.$route.params.keyword + " blog");
      Post.search_blog(this.$route.params.keyword, page, this.size)
          .then((res) => {
            this.posts = res.data.items;
            this.total = res.data.total
            this.page = res.data.page
            this.size = res.data.size
            this.pageTotal = Math.ceil(this.total / this.size)
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log(err, "getSearchPostsError");
            this.loadingProfile = false;
          });
    },
    showDeleteDialog(id) {
      this.deleteId = id;
      this.showDelete = true;
    },
    onDeletePost() {
      console.log("onDelete", this.deleteId);
      Post.deleteBlog(this.deleteId)
          .then((res) => {
            console.log(res);
            this.$emit("delete");
            this.deleteId = 0;
            this.showDelete = false;
            this.$toasted.success(res.data, {
              icon: "check",
              fullWidth: true,
              position: "bottom-center",
            });
          })
          .catch((err) => {
            console.error(err, "not deleted");
          });
    },
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getSearchPosts(newPage)
    }
  },
  created() {
    this.getSearchPosts(1);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getSearchPosts(1)
  },
};
</script>
<style scoped>
h3 {
  margin-top: 0px !important;
  padding-top: 0px !important;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: rgb(255, 255, 255);
}

.v-card__title {
  color: #df2d2d;
}

.search_text {
  color: #df2d2d;
}
</style>