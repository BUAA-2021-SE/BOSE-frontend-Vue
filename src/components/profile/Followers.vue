<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingProfile"> 粉丝列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingProfile"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"
         v-if="followers.length > 0"
         v-show="!loadingProfile">
      <div class="text-align-center">
        <h6 class="text-align-center">粉丝数量: {{ total }}</h6>
      </div>
      <v-col cols="12" md="12" v-for="(followers,index) in followers" :key="index">
        <follower
            :followers="followers"
        >
        </follower>
      </v-col>
      <v-pagination
          v-model="page"
          :length="pageTotal"
          :total-visible="7"
          circle
      ></v-pagination>
    </div>
    <div
        v-else-if="followers.length === 0 && !loadingProfile"
        class="text-center">
      <h3>呜呜呜，居然没有粉丝呢</h3>
    </div>
  </section>
</template>

<script>
import {Account} from "@/api/account.js";
import Followers from "@/api/follower.js"
import store from "@/store.js";
import FollowerItem from '@/components/base/FollowerItem.vue'

export default {
  name: 'Followers',
  components: {follower: FollowerItem},
  data() {
    return {
      followers: [],
      loadingProfile: true,
      sharedState: store.state,
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getUserFollowers(page) {
      Followers.getUserFollowers(this.$route.params.id, page, this.size)
          .then((res) => {
            console.log(res);
            this.followers = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.loadingProfile = false;
            this.pageTotal = Math.ceil(this.total / this.size);
            if (this.pageTotal === 0) this.pageTotal = 1;
          })
          .catch((err) => {
            console.log((err, "getUserFollowersError"));
            this.followers = "暂无用户";
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserFollowers(1);
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getUserFollowers(newPage);
    }
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserFollowers(1);
  }
}
</script>
<style scoped>
.col-md-12.col-12 {
  padding: 0px;
}
</style>