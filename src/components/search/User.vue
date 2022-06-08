<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingUser"> 用户列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingUser"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="items.length > 0"
        fluid>
      <v-row justify="center" :style="{width:'80vw'}" class="m-auto">
        <div class="text-align-center">
          <h6 class="text-align-center">相关用户共{{ total }}个</h6>
        </div>
        <v-col cols="12" sm="1" md="1"></v-col>
        <v-col sm="10" md="10">
          <div v-for="(item,index) in items" :key="index">
            <following
                :followings="item">
            </following>
          </div>
        </v-col>
        <v-col cols="12" sm="1" md="1"></v-col>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingUser"
        class="text-center">
      <h3>你，在找谁？</h3>
    </div>
  </section>
</template>
<script>
import Post from "@/api/post";
import store from "@/store";
import Followers from "@/api/follower";
import FollowingItem from "@/components/base/FollowingItem";

export default {
  name: 'SearchUser',
  components: {following: FollowingItem},
  data() {
    return {
      items: [],
      loadingUser: true,
      total: 0, //总博文数
      page: 1, //第几页
      size: 5, //每页总数
      pageTotal: 1, //总页数
      sharedState: store.state,
      deleteId: 0,
      showDelete: false,
    }
  },
  methods: {
    toProfile(id) {
      this.$router.push({name: 'ShowProfile', params: {id: id}})
    },
    onFollowUser(id) {
      console.log(this.followings.current_user_to_user, this.followings.user_to_current_user)
      Followers.follow(id)
          .then((res) => {
            console.log(res, "followUser");
            this.followings.current_user_to_user = true;
          })
          .catch((err) => {
            if (err.response.status == 460) {
              this.$toasted.error("不能关注自己.", {
                icon: "priority_high",
              });
            }
            console.error(err);
          })
    },
    onUnFollowUser(id) {
      Followers.unFollow(id)
          .then((res) => {
            console.log(res, "unfollowUser");
            this.followings.current_user_to_user = false;
          })
          .catch((err) => {
            console.error(err);
          })
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
    getUserList(page) {
      console.log("getUserList");
      Post.search_user(this.$route.params.keyword, page, this.size)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            this.loadingUser = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingUser = false;
          })
    },
  },
  created() {
    this.getUserList(1);
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getUserList(newPage);
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.getUserList(1);
  }
}
</script>

<style>

.resources_url {
  margin-top: 10px;
}

</style>