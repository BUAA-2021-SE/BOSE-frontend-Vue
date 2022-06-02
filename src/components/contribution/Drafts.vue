<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingProfile"> 草稿列表加载中
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
        v-if="drafts.length > 0"
        v-show="!loadingProfile"
    >
      <draft v-for="(draft,index) in drafts" :key="index"
             :draft="draft"
             @delete="getUserDrafts(1)">
      </draft>
      <div>
        <span>共有草稿{{ total }}篇</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </div>
    </div>
    <div
        v-else-if="drafts.length === 0 && !this.loadingProfile"
        class="text-center">
      <h3>呜呜呜，一篇草稿都没有。</h3>
    </div>
  </section>
</template>

<script>
import store from "@/store.js";
import Post from "@/api/post";
import DraftItem from '@/components/base/DraftItem.vue'

export default {
  name: 'Drafts',
  components: {
    draft: DraftItem
  },
  data() {
    return {
      drafts: [],
      loadingProfile: true,
      sharedState: store.state,
      total: 0, //总博文数
      page: 1, //第几页
      size: 5, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    // 获取用户的草稿列表
    getUserDrafts(page) {
      Post.getUserDrafts(this.$route.params.id, page, this.size)
          .then((res) => {
            console.log(res.data, "getUserDrafts");
            this.drafts = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            this.loadingProfile = false;
          })
          .catch((err) => {
            console.log(err, "getUserPostsError");
            this.drafts = ""
            this.loadingProfile = false;
          });
    },
  },
  created() {
    this.getUserDrafts(1);
  },
  beforeRouteUpdate(to, from, next) {
    next()
    this.getUserDrafts(1)
  },
}
</script>
