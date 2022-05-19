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
    <div class="g-brd-around g-brd-gray-light-v4 g-pa-20 g-mb-40" v-show="!this.loadingProfile">
      <p>{{ followers }}</p>
    </div>
  </section>
</template>

<script>
import {Account} from "@/api/account.js";
import Followers from "@/api/follower.js"
import store from "@/store.js";

export default {
  name: 'Followers',
  components: {},
  data() {
    return {
      followers: [],
      loadingProfile: true,
      sharedState: store.state
    }
  },
  methods: {
    getUserFollowers() {
      Followers.getUserFollowers(this.$route.params.id)
          .then((res) => {
            this.followers = res.data;
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log((err, "getUserFollowersError"));
            this.followers = "暂无用户"
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserFollowers()
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserFollowers()
  }
}
</script>
