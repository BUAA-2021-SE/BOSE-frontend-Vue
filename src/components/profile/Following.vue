<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="this.loadingProfile"> 粉丝列表加载中
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
    <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40"
         v-if="followings.length > 0"
         v-show="!this.loadingProfile">
      <v-col cols="12" md="12" v-for="(followings,index) in followings" :key="index">
        <following
            :followings="followings">
        </following>
      </v-col>
    </div>
    <div
        v-else-if="followings.length === 0 && !this.loadingProfile"
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
      sharedState: store.state
    }
  },
  methods: {
    getUserFollowings() {
      Followers.getUserFollowings(this.$route.params.id)
          .then((res) => {
            this.followings = res.data;
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log((err.followes_num, "getUserFollowingsError"));
            this.followings = "暂无用户"
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserFollowings();
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserFollowings()
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