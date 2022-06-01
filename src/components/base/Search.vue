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
    <div
        v-if="this.posts.length > 0"
        class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"
        v-show="!this.loadingProfile">
      <v-row :style="{width:'80vw'}" class="m-auto">
        <div class="text-align-center">
          <h6 class="text-align-center">共有博文{{ total }}篇</h6>
        </div>
        <v-col cols="12" sm="6" md="6">
          <div v-for="(post,index) in posts" :key="index">
            <div>
              <v-card outlined class="mx-auto">
                <v-row>
                  <v-col cols="12" md="7">
                    <router-link :to="{ name: 'Post', params: { id: post.id } }">
                      <v-card-title>
                        <h3 v-if="post.title.length <12">{{ post.title }}</h3>
                        <h3 v-else>{{ post.title.substring(0, 9) + '...' }}</h3>
                      </v-card-title>
                    </router-link>
                    <v-card-text>
                      <p>{{ post.author.name || post.author.username }}</p>
                      <div class="text--primary" v-if="post.summary.length <30">
                        {{ post.summary }}
                      </div>
                      <div class="text--primary" v-else>
                        {{ post.summary.substring(0, 27) + '...' }}
                      </div>
                    </v-card-text>
                    <v-card-actions>
                      <router-link :to="{ name: 'Post', params: { id: post.id } }">
                        <v-btn text color="deep-purple accent-4"> 阅读全文</v-btn>
                      </router-link>
                      <v-btn
                          v-if="post.author.id == sharedState.user_id"
                          text
                          color="deep-purple accent-4"
                          @click="showDeleteDialog(post.id)"
                      >
                        删除
                      </v-btn>
                      <router-link :to="{ name: 'PostEdit', params: { id: post.id } }">
                        <v-btn
                            v-if="post.author.id == sharedState.user_id"
                            text
                            color="deep-purple accent-4"
                        >
                          编辑
                        </v-btn>
                      </router-link>
                    </v-card-actions>
                  </v-col>
                  <v-col cols="12" md="2"></v-col>
                  <v-col class="d-flex justify-end" cols="12" md="3">
                    <v-img
                        :src="post.cover"
                        class="my-auto"
                        contain
                        height="150"
                        max-width="200"
                        max-height="150"
                        :style="{'margin-right':'10px'}"
                    />
                  </v-col>
                </v-row>

              </v-card>
              <v-dialog
                  style="z-index: 2000"
                  v-model="showDelete"
                  width="25vw"
                  height="20vh"
              >
                <v-card
                    :style="{ width: '25vw', height: '20vh' }"
                    class="d-flex align-center flex-wrap"
                >
                  <v-row class="mx-auto d-flex justify-center">
                    <v-card-title class="mx-auto"><h3 class="mx-auto">确定删除？</h3></v-card-title>
                    <v-card-actions>
                      <v-btn color="primary" text @click="showDelete = false"> 取消</v-btn>
                      <v-spacer></v-spacer>
                      <v-btn color="error" text @click="onDeletePost"> 确认</v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card>
              </v-dialog>
            </div>
          </div>
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

export default {
  name: 'Search',
  data() {
    return {
      keywords: this.$route.params.keyword,
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
            this.loadingProfile = false;
          });
    },
    brightSearch(post) {
      console.log("brightSearch", post);
      if (this.$route.params.keyword && this.$route.params.keyword.length > 0) {
        let replaceReg = new RegExp(this.$route.params.keyword, 'g')
        let replaceString = '<span class="search-text">' + this.$route.params.keyword + '</span>'
        post.title = post.title.replace(replaceReg, replaceString)
        post.summary = post.summary.replace(replaceReg, replaceString)
        post.body = post.body.replace(replaceReg, replaceString)
        return post
      }
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