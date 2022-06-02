<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingHistory"> 历史记录加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="this.loadingHistory"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <div
        v-if="items.length > 0"
        v-show="!loadingHistory"
    >
      <v-row justify="center">
        <v-subheader>
          <h3>历史记录</h3>
        </v-subheader>
        <v-expansion-panels
            v-for="(itemByDay,index) in items"
            :key="index"
            popout
        >
          <h5>{{ itemByDay[0] }}</h5>
          <v-divider></v-divider>
          <v-expansion-panel
              v-for="(item,index) in itemByDay.slice(1,itemByDay.length)"
              :key="index"
          >
            <v-expansion-panel-header>
              <v-col
                  cols="16"
                  sm="4"
                  md="4"
              >
                <v-img
                    :src="item.blog.cover"
                    class="my-auto"
                    contain
                    height="90"
                    max-width="120"
                    max-height="90"
                    :style="{'margin-right':'10px'}"
                />
              </v-col>

              <v-col
                  class="text-left"
              >
                <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                >
                  <router-link :to="{ name: 'Post',params: { id:item.blog.id} }">
                    <h4>{{ item.blog.title }}</h4>
                  </router-link>
                </v-row>
                <v-row>
                  <router-link :to="{ name: 'ShowProfile',params: { id:item.blog.author.id} }">
                    <strong v-html="item.blog.author.name||item.blog.author.username"></strong>
                  </router-link>
                </v-row>
                <v-row>
                  <v-col
                      class="grey--text text-truncate hidden-sm-and-down"
                  >
                    {{ item.hour_minute_second }}
                  </v-col>
                </v-row>
              </v-col>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                >
                  <v-col cols="3">
                    浏览 <strong v-html="item.blog.views"></strong> 次
                  </v-col>
                  <v-col cols="3">
                    点赞 <strong v-html="item.blog.thumbs_up"></strong> 次
                  </v-col>
                  <v-col cols="3">
                    收藏 <strong v-html="item.blog.collection"></strong> 次
                  </v-col>
                  <v-col cols="3">
                    评论 <strong v-html="item.blog.comments_count"></strong> 个
                  </v-col>
                </v-row>
                <v-row>
                  <v-card-text>
                    <strong>博文摘要 </strong> {{ item.blog.summary }}
                  </v-card-text>
                </v-row>
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
    <div
        v-else-if="items.length === 0 && !this.loadingHistory"
        class="text-center">
      <h3>呜呜呜，你都不看博文的吗？快去到处看看吧！</h3>
    </div>
    <div>
      {{ items }}
    </div>
  </section>
</template>

<script>
import Notifications from '@/api/notifications';
import Post from "@/api/post";
import BlogItem from '@/components/base/BlogItem.vue'

export default {
  name: 'History',
  components: {
    blog: BlogItem
  },
  data() {
    return {
      items: [],
      loadingHistory: true
    }
  },
  methods: {
    getHistoryList() {
      console.log('getHistoryList');
      Notifications.getHistoryList()
          .then((res) => {
            console.log(res);
            this.items = res.data;
            this.loadingHistory = false;
          })
          .catch((err) => {
            console.log(err.response.details);
            this.loadingHistory = false;
          })
    }
  },
  created() {
    this.getHistoryList();
  },
  beforeRouteUpdate(to, from, next) {
    next();
    this.getHistoryList();
  }
}
</script>

<style>

</style>