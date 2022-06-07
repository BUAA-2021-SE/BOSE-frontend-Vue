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
      <h3 v-if="!blockers" class="text-center">小黑屋里空空如也</h3>
        <block
            v-for="(blocker,index) in blockers" :key="index"
            :blocks="blocker" 
            @unblockUser="getUserBlockers(1)"
        >
        </block>
      <div v-show="blockers">
      <span>黑名单数量:{{ total }}</span>
      <!-- <v-pagination
          v-model="page"
          :length="pageTotal"
          :total-visible="7"
          circle
      ></v-pagination> -->
      </div>
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
      sharedState: store.state,
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getUserBlockers(page) {
      Followers.getUserBlockers(page,this.size)
          .then((res) => {
            console.log(res);
            this.blockers = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            if(this.pageTotal===0) this.pageTotal = 1;
            if (res.data.items.length == 0) {
              this.blockers = null;
            }
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log((err, "getUserFollowersError"));
            this.blockers = null;
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserBlockers(1)
  },
  watch: {
			page: function(newPage, oldPage) {
				this.getUserBlockers(newPage);
			}
	},
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserBlockers(1)
  }
}
</script>
<style scoped>
.col-md-12.col-12 {
  padding: 0px;
}
</style>