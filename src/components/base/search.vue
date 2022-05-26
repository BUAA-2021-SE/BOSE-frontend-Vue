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
    <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"  v-show="!this.loadingProfile">
      <v-row :style="{width:'80vw'}" class="m-auto">
         <div class="text-align-center">
        <h6 class="text-align-center">共有博文{{ total }}篇</h6>
        </div>
        <v-col cols="12" sm="6" md="6" v-for="(post,index) in posts" :key="index" >
        <blog 
            :post="post"
            @delete="getSearchPosts(1)">
        </blog>
        </v-col>
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
      // sharedKeyword: store.keyword,
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
      pageTotal: 10 //总页数
    }
  },
  methods: {
    // 获取用户的博文列表
    getSearchPosts(page) {
      console.log("keyword: " + this.$route.params.keyword);
      Post.search(this.$route.params.keyword, page, this.size)
          .then((res) => {
            console.log(res.data, "getSearchPosts");
            this.posts = res.data.items;
            this.total = res.data.total
            this.page = res.data.page
            this.size = res.data.size
            this.pageTotal = Math.ceil(this.total / this.size)
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log(err, "getSearchPostsError");
            this.posts = "这个关键词没有博文呢，换个关键词看看吧～"
            this.loadingProfile = false;
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
}
</script>
