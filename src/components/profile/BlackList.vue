<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingProfile"> 小黑屋列表加载中
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
    <div v-show="!loadingProfile">
      <h3 v-show="!blockers" class="text-center">小黑屋里空空如也</h3>
      <v-col cols="12" md="12" v-for="(blockers,index) in blockers" :key="index">
        <block
            :blockers="blockers"
        >
        </block>
      </v-col>
    </div>
  </section>
</template>

<script>
import Followers from "@/api/follower.js"
import store from "@/store.js";
import BlockItem from '@/components/base/BlockItem.vue'

export default {
  name: 'Followers',
  components: {block: BlockItem},
  data() {
    return {
      blockers: [],
      loadingProfile: true,
      sharedState: store.state
    }
  },
  methods: {
    getUserBlockers() {
      Followers.getUserBlockers()
          .then((res) => {

            this.blockers = res.data;
            this.loadingProfile = false;
            if (res.data.length == 0) {
              this.blockers = null;
            }
          })
          .catch((err) => {
            console.log((err, "getUserFollowersError"));
            this.blockers = null;
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserBlockers()
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserBlockers()
  }
}
</script>
<style scoped>
.col-md-12.col-12 {
  padding: 0px;
}
</style>