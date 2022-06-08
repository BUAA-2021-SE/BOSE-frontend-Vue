<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingLikes"> 点赞列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingLikes"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="items.length > 0"
        fluid>
      <v-row justify="center">
        <v-subheader>
          <h3>给我的点赞</h3>
        </v-subheader>

        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,index) in items"
              :key="index"
          >
            <v-expansion-panel-header
                @click="item.is_read = true, readMail(item.id)"
            >
              <v-col
                  cols="16"
                  sm="4"
                  md="4"
                  class="spacer"
              >
                <v-avatar
                    size="62px"
                >
                  <img
                      alt="Avatar"
                      :src="item.sender.headshot"
                  >
                </v-avatar>
              </v-col>
              <v-col
                  class="text-left"
              >
                <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                >
                  <v-col
                      class="hidden-xs-only"
                  >
                    来自用户
                    <router-link :to="{name:'ShowProfile',params:{id: item.sender.id}}">
                      <strong v-html="item.sender.name||item.sender.username"></strong></router-link>
                    的点赞通知
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                      class="grey--text text-truncate hidden-sm-and-down"
                  >
                    {{ $moment(item.date_time).format("YYYY年MM月DD日 HH:mm:ss") }}
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                  cols="12"
                  sm="3"
                  md="2"
                  class="text-right"
              >
                <v-chip
                    v-show="item.is_read == false"
                    :color="`${item.color} light-blue`"
                    class="ml-0 mr-2 black--text"
                    label
                    small
                >
                  new
                </v-chip>
              </v-col>

            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                用户
                <router-link :to="{name:'ShowProfile',params:{id: item.sender.id}}"><strong
                    v-html="item.sender.name||item.sender.username"></strong></router-link>
                给您的博文 《 <strong v-html="item.blog_title"></strong> 》 点了一个赞
              </v-card-text>
              <router-link
                  :to="{name: 'Post',params: {id:item.blog_id}}"
                  class="text-primary">
                <v-btn
                    color="primary"
                    class="mr-2"
                    small
                    text
                >
                  查看原文
                </v-btn>
              </router-link>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <span>共有点赞{{ total }}条</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingLikes"
        class="text-center">
      <h3>还没有点赞呢，再努努力吧！</h3>
    </div>
  </section>
</template>
<script>
import Notifications from '@/api/notifications.js'

export default {
  name: 'Likes',
  data() {
    return {
      items: [],
      loadingLikes: true,
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getLikeList(page) {
      let likeId = 2;
      console.log("getLikeList");
      Notifications.getMailList(likeId, page, this.size)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            this.loadingLikes = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingLikes = false;
          })
    },
    readMail(id) {
      console.log("readMail" + id);
      Notifications.getMail(id);
    }
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getLikeList(newPage);
    }
  },
  created() {
    this.getLikeList(1);
  },
  beforeRouteUpdate(to, from, next) {
    this.getLikeList(1);
  }
}
</script>

<style>

</style>