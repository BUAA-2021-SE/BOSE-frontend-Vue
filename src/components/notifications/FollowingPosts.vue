<template>
  <section>
    <div class="container">
      <div class="text-center">
        <h3 v-show="loadingFollowings"> 新增粉丝列表加载中
          <v-progress-circular
              class="center"
              indeterminate
              color="primary"
              :size="40"
              :width="3"
              v-show="loadingFollowings"
          ></v-progress-circular>
        </h3>
      </div>
    </div>
    <v-container
        v-if="items.length > 0"
        fluid>
      <v-row justify="center">
        <v-subheader>
          <h3>新增粉丝</h3>
        </v-subheader>
        <v-expansion-panels popout>
          <v-expansion-panel
              v-for="(item,index) in items"
              :key="index"
          >
            <v-expansion-panel-header
                @click="item.is_read = true, readMail(item.id)"
            >
              <v-row
                  align="center"
                  class="spacer"
                  no-gutters
              >
                <v-col
                    cols="4"
                    sm="3"
                    md="2"
                >
                  <router-link :to="{ name: 'ShowProfile',params: { id:item.sender.id} }">
                    <v-avatar
                        size="60px"
                    >
                      <img
                          alt="Avatar"
                          :src="item.sender.headshot"
                      >
                    </v-avatar>
                  </router-link>
                </v-col>

                <v-col
                    class="hidden-xs-only"
                    sm="4"
                    md="2"
                >
                  <router-link :to="{ name: 'ShowProfile',params: { id:item.sender.id} }">
                    <strong v-html="item.sender.name||item.sender.username"></strong>
                  </router-link>
                </v-col>
                <v-col
                    class="grey--text text-truncate hidden-sm-and-down"
                >
                  &mdash; {{ $moment(item.date_time).format("YYYY年MM月DD日 HH:mm:ss") }}
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
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-divider></v-divider>
              <v-card-text>
                用户
                <router-link :to="{name:'ShowProfile',params:{id: item.sender.id}}"><strong
                    v-html="item.sender.name||item.sender.username"></strong></router-link>
                关注了您！
              </v-card-text>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <span>共有新增粉丝{{ total }}人</span>
        <v-pagination
            v-model="page"
            :length="pageTotal"
            :total-visible="7"
            circle
        ></v-pagination>
      </v-row>
    </v-container>
    <div
        v-else-if="this.items.length === 0 && !this.loadingFollowings"
        class="text-center">
      <h3>呜呜呜，一个新粉丝都没有。</h3>
    </div>
  </section>
</template>

<script>
import Notifications from '@/api/notifications.js'

export default {
  name: 'FollowingPosts',
  data() {
    return {
      items: [],
      loadingFollowings: true,
      total: 0, //总博文数
      page: 1, //第几页
      size: 4, //每页总数
      pageTotal: 1 //总页数
    }
  },
  methods: {
    getFollowList(page) {
      let followId = 1;
      console.log("getFollowList");
      Notifications.getMailList(followId, page, this.size)
          .then((res) => {
            console.log(res);
            this.items = res.data.items;
            this.total = res.data.total;
            this.page = res.data.page;
            this.size = res.data.size;
            this.pageTotal = Math.ceil(this.total / this.size);
            this.loadingFollowings = false;
          })
          .catch((err) => {
            console.error(err);
            this.loadingFollowings = false;
          })
    },
    readMail(id) {
      console.log("readMail" + id);
      Notifications.getMail(id);
    }
  },
  watch: {
    page: function (newPage, oldPage) {
      this.getFollowList(newPage);
    }
  },
  created() {
    this.getFollowList(1);
  },
  beforeRouteUpdate(to, from, next) {
    this.getFollowList(1);
  }
}
</script>

<style>

</style>