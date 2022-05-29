<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingHistory"> 博文列表加载中
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
        <v-col
            cols="12"
            sm="12"
            md="10"
        >
          <v-card>
            <v-list
                v-for="(itemByDay, index) in items"
            >
              <v-subheader :key="index">
                <h5>{{ itemByDay[0] }}</h5>
              </v-subheader>
              <v-divider
                  :key="index"
              ></v-divider>

              <!--{{ itemByDay }}-->
              <div v-for="(item, index) in itemByDay.slice(1,itemByDay.length)"
                   :key="index"
              >
                <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                >
                  <v-col
                      class="hidden-xs-only"
                  >
                    <router-link :to="{ name: 'Post',params: { id:item.blog_id}}">
                      <strong v-html="item.blog_title"></strong>
                    </router-link>
                  </v-col>

                  <v-col
                      class="grey--text text-truncate hidden-sm-and-down"
                  >
                    &mdash; {{ item.hour_minute_second }}
                  </v-col>
                  <v-col class="d-flex justify-end" cols="12" md="3">
                    <v-img
                        :src="item.Blog_cover"
                        class="my-auto"
                        contain
                        height="75"
                        max-width="100"
                        max-height="75"
                        :style="{'margin-right':'10px'}"
                    />
                  </v-col>
                </v-row>
              </div>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div
        v-else-if="items.length === 0 && !this.loadingHistory"
        class="text-center">
      <h4>呜呜呜，你都不看博文的吗。</h4>
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
    },
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