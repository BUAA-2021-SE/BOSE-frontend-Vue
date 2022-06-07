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
         v-if="followings.length > 0"
         v-show="!loadingProfile">
      <v-col cols="12" md="12" v-for="(followings,index) in followings" :key="index">
        <following
            :followings="followings">
        </following>
      </v-col>
      <span>粉丝数量:{{ total }}</span>
      <v-pagination
          v-model="page"
          :length="pageTotal"
          :total-visible="7"
          circle
      ></v-pagination>
    </div>
    <div
        v-else-if="followings.length === 0 && !loadingProfile"
        class="text-center">
      <h3>一个关注也没有呢，快到处转转吧！</h3>
    </div>
  </section>
</template>

<script>
import {Account} from "@/api/account.js";
import Followers from "@/api/follower.js";
import store from "@/store.js";
import FollowingItem from '@/components/base/FollowingItem.vue'

export default {
  name: 'Followings',
  components: {following: FollowingItem},
  data() {
    return {
      followings: [],
      loadingProfile: true,
      sharedState: store.state,
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getUserFollowings(page) {
      Followers.getUserFollowings(this.$route.params.id,page,this.size)
          .then((res) => {
            console.log(res);
            this.followings = res.data.items;
            this.page = res.data.page;
            this.total = res.data.total;
            this.pageTotal = Math.ceil(this.total / this.size);
            if(this.pageTotal===0) this.pageTotal = 1;
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log((err.followes_num, "getUserFollowingsError"));
            this.followings = "暂无用户"
            this.loadingProfile = false;
          });
    },
  },
  watch: {
			page: function(newPage, oldPage) {
				this.getUserFollowings(newPage);
			}
	},
  created() {
    this.getUserFollowings(1);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserFollowings(1)
  }
}
</script>
<style scoped>
.col-md-12.col-12 {
  padding: 0px;
}

h3 {
  margin-top: 0px !important;
  padding-top: 0px !important;
}
</style>