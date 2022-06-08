<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingLikes"> 资源列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingLikes"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container v-if="items.length > 0" fluid>
      <v-row justify="center">
        <v-col cols="12" sm="1" md="1"></v-col>
        <v-col sm="10" md="10">
          <div v-for="(post,index) in items" :key="index">
            <blog
                :post="post"
                @delete="getResourcesList(1)">
            </blog>
          </div>
        </v-col>
        <v-col cols="12" sm="1" md="1"></v-col>
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
        <span>共有资源{{ total }}篇</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingLikes"
        class="text-center">
      <h3>呜呜呜，你来到了没有资源的荒漠。</h3>
    </div>
  </section>
</template>
<script>
import Resource from "@/api/resource";
import Post from "@/api/post";
import store from "@/store";
import BlogItem from "@/components/base/BlogItem";

export default {
  name: 'Resource',
  components: {
    blog: BlogItem
  },
  data() {
    return {
      items: [],
      loadingLikes: true,
      total: 0, //总博文数
      page: 1, //第几页
      size: 3, //每页总数
      pageTotal: 1, //总页数
      sharedState: store.state,
      deleteId: 0,
      showDelete: false,
    }
  },
  methods: {
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
            this.$toasted.success("删除成功", {
              icon: "check",
              fullWidth: true,
              position: "bottom-center",
            });
          })
          .catch((err) => {
            console.error(err, "not deleted");
          });
    },
    getResourcesList(page) {
      console.log("getResourcesList");
      Resource.getResourcesList(this.$route.params.id, page, this.size)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            this.loadingLikes = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingLikes = false;
          })
    },
  },
  created() {
    this.getResourcesList(1);
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getResourcesList(newPage);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getResourcesList(1);
  }
}
</script>

<style>

.resources_url {
  margin-top: 10px;
}

</style>