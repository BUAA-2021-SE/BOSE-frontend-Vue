<template>
<section>
    <div class="container">
      <div class="text-center">
    <h3 v-show="this.loadingProfile"> 关注列表加载中<v-progress-circular
       class="center"
      indeterminate
      color="primary"
      :size="40"
      :width="3"
      v-show="this.loadingProfile"
    ></v-progress-circular></h3>
      </div>
    </div>
      <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40" v-show="!this.loadingProfile">
              <p>{{followings}}</p>
      </div>
  </section>
</template>

<script>
import { Account } from "@/api/account.js";
import Followers from "@/api/follower.js";
import store from "@/store.js";
export default {
  name: 'Followings',
  data(){
      return {
            followings: [],
            loadingProfile: true,
            sharedState: store.state
      }
  },
  methods:{
    getUserFollowings() {
        Followers.getUserFollowings(this.$route.params.id)
          .then((res) => {
            let length = res.data.length;
            for(let i = 1;i<=length;i++){
            this.followings[i] = res.data[`user${i}`];
            console.log(this.followings[i],`user${i}`)
            }
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
    beforeRouteUpdate (to, from, next) {
      next()
      this.getUserFollowings()
    }
}
</script>
